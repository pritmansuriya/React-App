const USERS_KEY = "registeredUser";
const SESSION_KEY = "loggedInUser";

const getUsers = () => {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    }
    catch {
        return [];
    }
};

export const registeredUser = ({name, email, password}) => {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if(users.some((user) => user.email === normalizedEmail)) {
        throw new Error("An account with this email already exists.")
    }

    const newUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        password,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    return {id: newUser.id, name: newUser.name, email: newUser.email };
};

export const loginUser = (email, password) => {
    const normalizeEmail = email.trim().toLowerCase();

    const user = getUsers().find(
        (item) => 
            item.email === normalizeEmail &&
            item.password === password
    );

    if(!user) {
        throw new Error("Invalid email or password.");
    }

    const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    return sessionUser;
};

export const changeUserPassword = (
    currentPassword,
    newPassword,
    confirmPassword
) => {
    const session = JSON.parse(
        localStorage.getItem(SESSION_KEY) || "null"
    );

    if(!session) {
        throw new Error("Please log in again.");
    }

    if(newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters.");
    }

    if(newPassword !== confirmPassword) {
        throw new Error("New password and confirmation do not match.");
    }

    if(newPassword === currentPassword) {
        throw new Error("Choose a different new password.");
    }

    const users = getUsers();
    const userIndex = users.findIndex(
        (user) => user.id === session.id
    );

    if(userIndex === -1) {
        throw new Error("Account not found.");
    }

    if(users[userIndex].password !== currentPassword) {
        throw new Error("Your current password is incorrect.");
    }

    users[userIndex] = {
        ...users[userIndex],
        password: newPassword,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const logoutUser = () => {
    localStorage.removeItem(SESSION_KEY);
}