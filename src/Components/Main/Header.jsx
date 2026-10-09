import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiMessageSquare,
  FiLogOut,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import userImage from "../../assets/user1.png";
import { dismissMessage, markAllMessagesRead, useMessages } from "../../Pages/hooks/useMessages";

const sectionSearchItems = [
  { name: "Dashboard", group: "Overview", path: "/dashboard" },
  { name: "All Students", group: "Students", path: "/dashboard/students" },
  { name: "Add Student", group: "Students", path: "/dashboard/students/add" },
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

const readLoggedInUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem("loggedInUser")) ?? null;
  } catch {
    return null;
  }
};

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
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const messagesRef = useRef(null);
  const { messages } = useMessages();
  const [loggedInUser] = useState(readLoggedInUser);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const displayName = loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "Luke J R";
  const displayEmail = loggedInUser?.email || "";
  const displayRole = loggedInUser?.role || "Admin";
  const unreadNotificationCount = messages.filter((message) => !message.read).length;
  const latestNotifications = messages;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = normalizedQuery
    ? sectionSearchItems.filter((item) =>
        `${item.name} ${item.group}`.toLowerCase().includes(normalizedQuery),
      )
    : [];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!profileRef.current?.contains(event.target)) setIsProfileOpen(false);
      if (!searchRef.current?.contains(event.target)) setIsSearchOpen(false);
      if (!messagesRef.current?.contains(event.target)) setIsMessagesOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsMessagesOpen(false);
        setIsLogoutDialogOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setIsLogoutDialogOpen(false);
    navigate("/", { replace: true });
  };

  const openSection = (path) => {
    navigate(path);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsSearchOpen(false);
      return;
    }
    if (event.key === "Enter" && searchResults.length > 0) {
      event.preventDefault();
      openSection(searchResults[0].path);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between border-r border-gray-200 px-2">
        <div ref={searchRef} className="relative w-80 max-w-[42vw]">
          <input
            type="search"
            role="combobox"
            aria-label="Search dashboard sections"
            aria-expanded={isSearchOpen && normalizedQuery.length > 0}
            aria-controls="section-search-results"
            aria-autocomplete="list"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => {
              if (normalizedQuery) setIsSearchOpen(true);
            }}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search sections..."
            className="h-9 w-full rounded-md border border-gray-200 bg-white pl-4 pr-10 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-600"
            size={18}
          />

          {isSearchOpen && normalizedQuery && (
            <div
              id="section-search-results"
              role="listbox"
              className="absolute left-0 top-full z-50 mt-2 max-h-80 w-[min(22rem,85vw)] overflow-y-auto rounded-md border border-slate-200 bg-white py-1 text-left shadow-xl"
            >
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    role="option"
                    aria-selected="false"
                    onClick={() => openSection(item.path)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                  >
                    <span className="truncate text-sm font-medium text-slate-800">{item.name}</span>
                    <span className="shrink-0 text-xs text-slate-500">{item.group}</span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-slate-500">No matching sections</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
          >
            <FiBell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button> */}

          <div ref={messagesRef} className="relative">
            <button
              type="button"
              aria-label={unreadNotificationCount > 0 ? `${unreadNotificationCount} unread notifications` : "Notifications"}
              aria-haspopup="dialog"
              aria-expanded={isMessagesOpen}
              onClick={() => {
                const willOpen = !isMessagesOpen;
                setIsMessagesOpen(willOpen);
                if (willOpen) markAllMessagesRead();
              }}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <FiBell size={18} />
              {unreadNotificationCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-[10px] font-bold leading-none text-white">
                  {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
                </span>
              )}
            </button>

            {isMessagesOpen && (
              <section
                role="dialog"
                aria-label="Notifications"
                className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,90vw)] overflow-hidden rounded-md border border-slate-200 bg-white text-left shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">Notifications</h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {messages.length} total · {unreadNotificationCount} unread
                    </p>
                  </div>
                  <FiBell aria-hidden="true" className="text-blue-600" />
                </div>
                {latestNotifications.length > 0 ? (
                  <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
                    {latestNotifications.map((message) => (
                      <article key={message.id} className="flex items-start gap-2 px-4 py-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {message.type === "activity" || message.type === "announcement"
                                ? message.title
                                : message.name || "Website visitor"}
                            </p>
                            <time className="shrink-0 text-[11px] text-slate-500">
                              {formatMessageTime(message.createdAt)}
                            </time>
                          </div>
                          {message.type === "activity" || message.type === "announcement" ? (
                            <p className="mt-0.5 text-xs font-medium text-blue-700">
                              {message.type === "activity" ? "Activity" : "Announcement"}
                            </p>
                          ) : message.email ? (
                            <p className="mt-0.5 truncate text-xs text-slate-500">{message.email}</p>
                          ) : null}
                          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{message.message}</p>
                        </div>
                        {message.type !== "announcement" && (
                          <button
                            type="button"
                            aria-label={`Dismiss ${message.title || message.name || "notification"}`}
                            onClick={() => dismissMessage(message.id)}
                            className="grid h-7 w-7 shrink-0 place-items-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <FiX aria-hidden="true" />
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="px-4 py-8 text-center text-sm text-slate-500">
                    No messages received yet.
                  </p>
                )}
                <Link
                  to="/dashboard"
                  onClick={() => setIsMessagesOpen(false)}
                  className="block border-t border-slate-100 px-4 py-3 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  View notification center
                </Link>
              </section>
            )}
          </div>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              onClick={() => setIsProfileOpen((open) => !open)}
              className="flex items-center gap-2 rounded-md px-1.5 py-1 text-left transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src={userImage}
                className="h-10 w-10 rounded-full object-cover"
                alt={`${displayName} profile`}
              />
              <span className="hidden min-w-0 sm:block">
                <span className="block max-w-36 truncate text-sm font-semibold text-slate-900">
                  {displayName}
                </span>
                <span className="block text-xs text-slate-500">{displayRole}</span>
              </span>
              <IoChevronDown
                aria-hidden="true"
                className={`text-slate-500 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isProfileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-md border border-slate-200 bg-white py-2 text-slate-900 shadow-xl"
              >
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="truncate text-sm font-semibold">{displayName}</p>
                  {displayEmail && <p className="mt-0.5 truncate text-xs text-slate-500">{displayEmail}</p>}
                </div>
                <Link
                  to="/dashboard/account"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  <FiUser aria-hidden="true" />
                  My profile
                </Link>
                <Link
                  to="/dashboard/account/security"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  <FiShield aria-hidden="true" />
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
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                >
                  <FiLogOut aria-hidden="true" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {isLogoutDialogOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsLogoutDialogOpen(false);
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
            className="w-full max-w-sm rounded-lg bg-white p-6 text-left shadow-2xl"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-rose-50 text-rose-700">
              <FiLogOut aria-hidden="true" size={20} />
            </div>
            <h2 id="logout-dialog-title" className="text-lg font-semibold text-slate-900">
              Log out of your account?
            </h2>
            <p id="logout-dialog-description" className="mt-2 text-sm text-slate-600">
              You’ll be returned to the main screen. You can sign in again at any time.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutDialogOpen(false)}
                className="h-10 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                autoFocus
                onClick={handleLogout}
                className="h-10 rounded-md bg-rose-700 px-4 text-sm font-semibold text-white transition hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2"
              >
                Log out
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Header;