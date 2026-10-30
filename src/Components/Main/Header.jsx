import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiBell,
  FiLogOut,
  FiShield,
  FiUser,
  FiX,
  FiCheck,
  FiChevronRight,
} from "react-icons/fi";

import { IoChevronDown } from "react-icons/io5";

import userImage from "../../assets/user1.png";

import {
  dismissMessage,
  markAllMessagesRead,
  useMessages,
} from "../../Pages/hooks/useMessages";

// Dashboard search data
const sectionSearchItems = [
  { name: "Dashboard", group: "Overview", path: "/dashboard" },

  { name: "All Students", group: "Students", path: "/dashboard/students" },
  { name: "Add Student", group: "Students", path: "/dashboard/students/add" },
  { name: "Student Certificate", group: "Students", path: "/dashboard/students/certificate" },
  { name: "Student Profile", group: "Students", path: "/dashboard/students/profile" },

  { name: "All Teachers", group: "Teachers", path: "/dashboard/teachers" },
  { name: "Apply to Leave", group: "Teachers", path: "/dashboard/teachers/leave" },

  { name: "All Books", group: "Library", path: "/dashboard/library" },
  { name: "Add Books", group: "Library", path: "/dashboard/library/add" },

  { name: "My Profile", group: "Account", path: "/dashboard/account" },
  { name: "Security", group: "Account", path: "/dashboard/account/security" },

  { name: "Class Details", group: "Class", path: "/dashboard/class" },
  { name: "Add Class", group: "Class", path: "/dashboard/class/add" },

  { name: "Subject Details", group: "Subject", path: "/dashboard/subject" },
  { name: "Subject Allocation", group: "Subject", path: "/dashboard/subject/allocate" },

  { name: "Timetable", group: "Routine", path: "/dashboard/routine" },
  { name: "Lunch Menu", group: "Routine", path: "/dashboard/routine/lunch" },

  { name: "Attendance Details", group: "Attendance", path: "/dashboard/atte" },
  { name: "Attendance Report", group: "Attendance", path: "/dashboard/atte/report" },

  { name: "Exam Timetable", group: "Exam", path: "/dashboard/exam" },
  { name: "Exam Grade", group: "Exam", path: "/dashboard/exam/grade" },

  { name: "Notice", group: "Notice", path: "/dashboard/notice" },
  { name: "Add Notice", group: "Notice", path: "/dashboard/notice/2" },

  { name: "Transport Details", group: "Transport", path: "/dashboard/trans" },
  { name: "Add Bus", group: "Transport", path: "/dashboard/trans/add" },

  { name: "Hostel Rules", group: "Hostel", path: "/dashboard/hostel" },
  { name: "Hostel Fees", group: "Hostel", path: "/dashboard/hostel/fee" },
];

// Read logged-in user
const readLoggedInUser = () => {
  try {
    return JSON.parse(localStorage.getItem("loggedInUser")) || null;
  } catch {
    return null;
  }
};

// Format notification date
const formatMessageTime = (dateString) => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "Just now";

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const Header = () => {
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  const messagesRef = useRef(null);

  const { messages = [] } = useMessages();

  const [loggedInUser] = useState(readLoggedInUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const displayName =
    loggedInUser?.name ||
    loggedInUser?.email?.split("@")[0] ||
    "Admin";

  const displayEmail = loggedInUser?.email || "";
  const displayRole = loggedInUser?.role || "Admin";

  const unreadNotificationCount = messages.filter(
    (message) => !message.read
  ).length;

  // Search results
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];

    return sectionSearchItems.filter((item) =>
      `${item.name} ${item.group}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  // Latest notifications
  const latestNotifications = useMemo(() => {
    return [...messages]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      )
      .slice(0, 8);
  }, [messages]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setIsSearchOpen(false);
      }

      if (!profileRef.current?.contains(event.target)) {
        setIsProfileOpen(false);
      }

      if (!messagesRef.current?.contains(event.target)) {
        setIsMessagesOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsProfileOpen(false);
        setIsMessagesOpen(false);
        setIsLogoutDialogOpen(false);
      }
    };

    // Ctrl + K or Cmd + K focuses search
    const handleSearchShortcut = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleSearchShortcut);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleSearchShortcut);
    };
  }, []);

  // Open dashboard section
  const openSection = (path) => {
    navigate(path);

    setSearchQuery("");
    setIsSearchOpen(false);
    setActiveSearchIndex(0);
  };

  // Search keyboard navigation
  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsSearchOpen(false);
      return;
    }

    if (event.key === "ArrowDown" && searchResults.length > 0) {
      event.preventDefault();

      setActiveSearchIndex((prev) =>
        prev >= searchResults.length - 1 ? 0 : prev + 1
      );
    }

    if (event.key === "ArrowUp" && searchResults.length > 0) {
      event.preventDefault();

      setActiveSearchIndex((prev) =>
        prev <= 0 ? searchResults.length - 1 : prev - 1
      );
    }

    if (event.key === "Enter" && searchResults.length > 0) {
      event.preventDefault();

      openSection(
        searchResults[activeSearchIndex]?.path ||
        searchResults[0].path
      );
    }
  };

  // Toggle notifications
  const toggleMessages = () => {
    const willOpen = !isMessagesOpen;

    setIsMessagesOpen(willOpen);
    setIsProfileOpen(false);

    if (willOpen && unreadNotificationCount > 0) {
      markAllMessagesRead();
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    setIsLogoutDialogOpen(false);

    navigate("/", { replace: true });
  };

  return (
    <>
      <header className="relative z-40 flex min-w-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 py-2 sm:px-5">

        {/* Search */}
        <div
          ref={searchRef}
          className="relative min-w-0 flex-1"
        >
          <div className="relative max-w-2xl">
            <FiSearch
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              ref={searchInputRef}
              type="search"
              role="combobox"
              aria-label="Search dashboard sections"
              aria-expanded={isSearchOpen && normalizedQuery.length > 0}
              aria-controls="section-search-results"
              aria-autocomplete="list"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setActiveSearchIndex(0);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search sections..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-20 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveSearchIndex(0);
                  setIsSearchOpen(true);
                  searchInputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              >
                <FiX size={16} />
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-400 sm:block">
                Ctrl K
              </span>
            )}
          </div>

          {/* Search Results */}
          {isSearchOpen && normalizedQuery && (
            <div
              id="section-search-results"
              role="listbox"
              className="absolute left-0 top-full z-50 mt-2 max-h-80 w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 text-left shadow-xl"
            >
              <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Search Results ({searchResults.length})
              </p>

              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <button
                    key={item.path}
                    type="button"
                    role="option"
                    aria-selected={activeSearchIndex === index}
                    onMouseEnter={() => setActiveSearchIndex(index)}
                    onClick={() => openSection(item.path)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition ${
                      activeSearchIndex === index
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                        <FiSearch size={16} />
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {item.group}
                        </p>
                      </div>
                    </div>

                    <FiChevronRight
                      size={16}
                      className="shrink-0 text-slate-400"
                    />
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <FiSearch className="mx-auto mb-2 text-2xl text-slate-300" />

                  <p className="text-sm font-semibold text-slate-700">
                    No matching sections
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try searching with another keyword.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">

          {/* Notifications */}
          <div ref={messagesRef} className="relative">
            <button
              type="button"
              aria-label={
                unreadNotificationCount > 0
                  ? `${unreadNotificationCount} unread notifications`
                  : "Notifications"
              }
              aria-haspopup="dialog"
              aria-expanded={isMessagesOpen}
              onClick={toggleMessages}
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <FiBell size={19} />

              {unreadNotificationCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                  {unreadNotificationCount > 9
                    ? "9+"
                    : unreadNotificationCount}
                </span>
              )}
            </button>

            {isMessagesOpen && (
              <section
                role="dialog"
                aria-label="Notifications"
                className="absolute right-0 top-full z-50 mt-3 w-[min(22rem,90vw)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                  <div>
                    <h2 className="text-sm text-left font-bold text-slate-900">
                      Notifications
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {messages.length} total notifications
                    </p>
                  </div>

                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
                    <FiBell size={18} />
                  </span>
                </div>

                {latestNotifications.length > 0 ? (
                  <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
                    {latestNotifications.map((message) => (
                      <article
                        key={message.id}
                        className="flex items-start gap-3 px-4 py-3 transition hover:bg-slate-50"
                      >
                        <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                          {message.type === "activity" ? (
                            <FiCheck size={16} />
                          ) : (
                            <FiBell size={16} />
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-slate-800">
                              {message.type === "activity" ||
                              message.type === "announcement"
                                ? message.title
                                : message.name || "Website visitor"}
                            </p>

                            <time className="shrink-0 text-[10px] text-slate-400">
                              {formatMessageTime(message.createdAt)}
                            </time>
                          </div>

                          {(message.type === "activity" ||
                            message.type === "announcement") && (
                            <p className="mt-0.5 text-left text-[11px] font-semibold text-blue-600">
                              {message.type === "activity"
                                ? "Activity"
                                : "Announcement"}
                            </p>
                          )}

                          {message.email && (
                            <p className="mt-1 text-left truncate text-xs text-slate-400">
                              {message.email}
                            </p>
                          )}

                          <p className="mt-1 line-clamp-2 text-left text-xs leading-5 text-slate-600">
                            {message.message}
                          </p>
                        </div>

                        {message.type !== "announcement" && (
                          <button
                            type="button"
                            aria-label={`Dismiss ${
                              message.title || message.name || "notification"
                            }`}
                            onClick={() => dismissMessage(message.id)}
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                          >
                            <FiX size={16} />
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-10 text-center">
                    <FiBell className="mx-auto mb-3 text-3xl text-slate-300" />

                    <p className="text-sm font-semibold text-slate-700">
                      You're all caught up!
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      No notifications available.
                    </p>
                  </div>
                )}

                <Link
                  to="/dashboard"
                  onClick={() => setIsMessagesOpen(false)}
                  className="block border-t border-slate-100 px-4 py-3 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  View notification center
                </Link>
              </section>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              onClick={() => {
                setIsProfileOpen((open) => !open);
                setIsMessagesOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 text-left transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src={userImage}
                alt={`${displayName} profile`}
                className="h-9 w-9 rounded-full border border-slate-200 object-cover"
              />

              <span className="hidden min-w-0 sm:block">
                <span className="block max-w-36 text-left truncate text-sm font-semibold text-slate-800">
                  {displayName}
                </span>

                <span className="block text-xs capitalize text-slate-500">
                  {displayRole}
                </span>
              </span>

              <IoChevronDown
                aria-hidden="true"
                className={`text-slate-500 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 text-slate-900 shadow-xl"
              >
                <div className="border-b border-slate-100 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={userImage}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-left text-sm font-bold">
                        {displayName}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {displayEmail || displayRole}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/dashboard/account"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  <FiUser size={17} />
                  My Profile
                </Link>

                <Link
                  to="/dashboard/account/security"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  <FiShield size={17} />
                  Security
                </Link>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsLogoutDialogOpen(true);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                >
                  <FiLogOut size={17} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      {isLogoutDialogOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsLogoutDialogOpen(false);
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
            className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-600">
              <FiLogOut size={22} />
            </div>

            <h2
              id="logout-dialog-title"
              className="text-lg font-bold text-slate-900"
            >
              Log out of your account?
            </h2>

            <p
              id="logout-dialog-description"
              className="mt-2 text-sm leading-6 text-slate-500"
            >
              Are you sure you want to log out? You will be returned to the
              main screen.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsLogoutDialogOpen(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                autoFocus
                onClick={handleLogout}
                className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-200"
              >
                Yes, Log Out
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Header;
