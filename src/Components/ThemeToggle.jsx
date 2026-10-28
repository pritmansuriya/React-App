import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../Context/ThemeContext";

const ThemeToggle = () => {
    const {darkMode, toggleTheme} = useTheme();

    return(
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-2 rounded-lg border border-gray-300 
            bg-white px-4 py-2 text-gray-800 transition hover:bg-gray-100 
            dark:border-gray-700 dark:bg-gray-800 dark:text-white
            dark:hover:bg-gray-700"
        >
            {
                darkMode ? (
                    <FiSun size={20} />
                ) : (
                    <FiMoon size={20} />
                )
            }
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
    );
};