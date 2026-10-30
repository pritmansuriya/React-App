import React, { useState, useEffect, useRef } from "react";
import {
  MdDashboard,
  MdPeople,
  MdLibraryBooks,
  MdOutlineClass,
  MdOutlineSubject,
  MdOutlineNotifications,
  MdOutlineDirectionsBus,
  MdOutlineHomeWork,
} from "react-icons/md";

import {
  FaChalkboardTeacher,
  FaUserCircle,
  FaClipboardList,
  FaRegCalendarAlt,
  FaUserGraduate,
} from "react-icons/fa";

import { IoChevronDown } from "react-icons/io5";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import userImage from "../../assets/SchoolLogo.png";
import { useTheme } from "../../Context/ThemeContext";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard size={22} />,
    children: [],
  },
  {
    title: "Students",
    icon: <MdPeople size={22} />,
    children: [
      { title: "Add Student", path: "/dashboard/students/add" },
      { title: "Student Certificate", path: "/dashboard/students/certificate" },
    ],
  },
  {
    title: "Teachers",
    icon: <FaChalkboardTeacher size={20} />,
    children: [
      { title: "All Teachers", path: "/dashboard/teachers" },
      { title: "Apply to Leave", path: "/dashboard/teachers/leave" },
    ],
  },
  {
    title: "Library",
    icon: <MdLibraryBooks size={22} />,
    children: [
      { title: "All Books", path: "/dashboard/library" },
      { title: "Add Books", path: "/dashboard/library/add" },
    ],
  },
  {
    title: "Account",
    icon: <FaUserCircle size={20} />,
    children: [
      { title: "My Profile", path: "/dashboard/account" },
      { title: "Security", path: "/dashboard/account/security" },
    ],
  },
  {
    title: "Class",
    icon: <MdOutlineClass size={22} />,
    children: [
      { title: "Class Details", path: "/dashboard/class" },
      { title: "Add Class", path: "/dashboard/class/add" },
    ],
  },
  {
    title: "Subject",
    icon: <MdOutlineSubject size={22} />,
    children: [
      { title: "Subject Details", path: "/dashboard/subject" },
      { title: "Subject Allocation", path: "/dashboard/subject/allocate" },
    ],
  },
  {
    title: "Routine",
    icon: <FaRegCalendarAlt size={20} />,
    children: [
      { title: "TimeTable", path: "/dashboard/routine" },
      { title: "Lunch Menu", path: "/dashboard/routine/lunch" },
    ],
  },
  {
    title: "Attendance",
    icon: <FaUserGraduate size={20} />,
    children: [
      { title: "Attendance Details", path: "/dashboard/atte" },
      { title: "Attendance Report", path: "/dashboard/atte/report" },
    ],
  },
  {
    title: "Exam",
    icon: <FaClipboardList size={20} />,
    children: [
      { title: "Exam TimeTable", path: "/dashboard/exam" },
      { title: "Exam Grade", path: "/dashboard/exam/grade" },
    ],
  },
  {
    title: "Notice",
    icon: <MdOutlineNotifications size={22} />,
    children: [
      { title: "Notice", path: "/dashboard/notice" },
      { title: "Add Notice", path: "/dashboard/notice/2" },
    ],
  },
  {
    title: "Transport",
    icon: <MdOutlineDirectionsBus size={22} />,
    children: [
      { title: "Details", path: "/dashboard/trans" },
      { title: "Add Bus", path: "/dashboard/trans/add" },
    ],
  },
  {
    title: "Hostel",
    icon: <MdOutlineHomeWork size={22} />,
    children: [
      { title: "Rules", path: "/dashboard/hostel" },
      { title: "Fees", path: "/dashboard/hostel/fee" },
    ],
  },
];

const Sidebar = ({
  collapsed = false,
  setCollapsed = () => {},
  mobileOpen = false,
  onClose = () => {},
}) => {
  const [openMenu, setOpenMenu] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null);
  const sidebarRef = useRef(null);
  const submenuCloseTimeout = useRef(null);
  const location = useLocation();
  const {darkMode} = useTheme();

  // Check whether the current route belongs to a menu item.
  const isMenuActive = (item) => {
    if (item.path) {
      return (
        location.pathname === item.path ||
        (item.path !== "/dashboard" &&
          location.pathname.startsWith(`${item.path}/`))
      );
    }

    return item.children?.some(
      (child) =>
        location.pathname === child.path ||
        location.pathname.startsWith(`${child.path}/`)
    );
  };

  // Automatically open the submenu for the current route.
  useEffect(() => {
    const activeParent = menuItems.find(
      (item) => item.children?.length && isMenuActive(item)
    );

    if (activeParent) {
      setOpenMenu(activeParent.title);
    } else if (location.pathname === "/dashboard") {
      setOpenMenu("");
    }
  }, [location.pathname]);

  // Detect desktop and mobile screens.
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Close the mobile drawer when clicking outside it.
  useEffect(() => {
    if (!isMobile || !mobileOpen) return;

    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobile, mobileOpen, onClose]);

  // On mobile, always show menu labels and inline submenus.
  const isCollapsed = isMobile ? false : collapsed;

  const handleMenuClick = (item) => {
    if (!item.children?.length) {
      setOpenMenu("");
      onClose();
      return;
    }

    // Expand or collapse the selected submenu.
    setOpenMenu((previous) =>
      previous === item.title ? "" : item.title
    );
  };

  const handleNavigation = () => {
    setHoveredSubmenu(null);
    if (isMobile) {
      onClose();
    }
  };

  const openCollapsedSubmenu = (event, item) => {
    if (submenuCloseTimeout.current) {
      window.clearTimeout(submenuCloseTimeout.current);
      submenuCloseTimeout.current = null;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    setHoveredSubmenu({
      item,
      left: bounds.right + 8,
      top: Math.max(8, Math.min(bounds.top, window.innerHeight - 170)),
    });
  };

  const scheduleSubmenuClose = () => {
    if (submenuCloseTimeout.current) {
      window.clearTimeout(submenuCloseTimeout.current);
    }

    submenuCloseTimeout.current = window.setTimeout(() => {
      setHoveredSubmenu(null);
      submenuCloseTimeout.current = null;
    }, 120);
  };

  const keepSubmenuOpen = () => {
    if (submenuCloseTimeout.current) {
      window.clearTimeout(submenuCloseTimeout.current);
      submenuCloseTimeout.current = null;
    }
  };

  useEffect(
    () => () => {
      if (submenuCloseTimeout.current) {
        window.clearTimeout(submenuCloseTimeout.current);
      }
    },
    []
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed left-0 top-0 z-50 flex h-dvh flex-col
          overflow-hidden border-r border-[#0A4271]
          bg-[#084B83] text-white shadow-xl
          transition-[width,transform] duration-300 ease-in-out
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
          ${
            isMobile
              ? `w-72 max-w-[85vw] ${
                  mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : isCollapsed
                ? "w-20"
                : "w-64"
          }
        `}
      >
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3"
          style={{ scrollbarWidth: "none" }}
          onScroll={() => setHoveredSubmenu(null)}
        >
          {/* Logo */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-center"
            } gap-3 px-2 py-6`}
          >
            <img
              src={userImage}
              alt="School logo"
              className="h-14 w-14 shrink-0 object-contain"
            />

            {!isCollapsed && (
              <h1 className="text-2xl font-bold tracking-wide text-white">
                Schoooli
              </h1>
            )}
          </div>

          {/* Sidebar toggle */}
          <div className="mb-5 flex justify-center">
            <button
              type="button"
              aria-label={
                isMobile
                  ? "Close sidebar"
                  : isCollapsed
                    ? "Expand sidebar"
                    : "Collapse sidebar"
              }
              onClick={() => {
                if (isMobile) {
                  onClose();
                } else {
                  setCollapsed(!collapsed);
                  setOpenMenu("");
                }
              }}
              className="flex h-12 w-12 items-center justify-center rounded-xl
                bg-[#2563EB] text-white shadow-md transition
                hover:bg-blue-700 hover:shadow-lg"
            >
              {isMobile || !isCollapsed ? (
                <HiOutlineXMark size={25} />
              ) : (
                <HiOutlineBars3 size={25} />
              )}
            </button>
          </div>

          {/* Menu items */}
          <nav className="space-y-2 px-1">
            {menuItems.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const active = isMenuActive(item);
              const expanded = openMenu === item.title;

              return (
                <div
                  key={item.title}
                  className={
                    isCollapsed && !isMobile && hasChildren
                      ? "relative"
                      : ""
                  }
                  onMouseEnter={
                    isCollapsed && !isMobile && hasChildren
                      ? (event) => openCollapsedSubmenu(event, item)
                      : undefined
                  }
                  onMouseLeave={
                    isCollapsed && !isMobile && hasChildren
                      ? scheduleSubmenuClose
                      : undefined
                  }
                  onFocusCapture={
                    isCollapsed && !isMobile && hasChildren
                      ? (event) => openCollapsedSubmenu(event, item)
                      : undefined
                  }
                  onBlurCapture={
                    isCollapsed && !isMobile && hasChildren
                      ? scheduleSubmenuClose
                      : undefined
                  }
                >
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => handleMenuClick(item)}
                        title={isCollapsed ? item.title : undefined}
                        className={`
                          flex h-14 w-full items-center rounded-2xl
                          transition-all duration-200
                          ${
                            isCollapsed
                              ? "justify-center px-2"
                              : "justify-between px-4"
                          }
                          ${
                            active
                              ? "bg-[#2563EB] text-white shadow-lg shadow-blue-950/20"
                              : expanded
                                ? "bg-white/10 text-white"
                                : "text-slate-200 hover:bg-white/10 hover:text-white"
                          }
                        `}
                      >
                        <span
                          className={`flex min-w-0 items-center ${
                            isCollapsed ? "justify-center" : "gap-4"
                          }`}
                        >
                          <span className="shrink-0">{item.icon}</span>

                          {!isCollapsed && (
                            <span className="truncate text-left text-sm font-medium">
                              {item.title}
                            </span>
                          )}
                        </span>

                        {!isCollapsed && (
                          <IoChevronDown
                            className={`shrink-0 transition-transform duration-200 ${
                              expanded ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {/* Inline submenu: visible on expanded sidebar and mobile */}
                      {!isCollapsed && (
                        <div
                          className={`
                            grid transition-[grid-template-rows] duration-300
                            ${
                              expanded
                                ? "grid-rows-[1fr]"
                                : "grid-rows-[0fr]"
                            }
                          `}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="relative ml-6 mt-2 space-y-1 border-l-2 border-blue-400/50 py-1 pl-3">
                              {item.children.map((sub) => (
                                <NavLink
                                  key={sub.path}
                                  to={sub.path}
                                  end
                                  onClick={handleNavigation}
                                  className={({ isActive }) => `
                                    flex min-h-10 items-center rounded-lg
                                    px-3 py-2 text-sm transition-all duration-200
                                    ${
                                      isActive
                                        ? "translate-x-1 bg-gradient-to-r from-blue-400/40 via-blue-500/25 to-blue-500/10 font-semibold text-white shadow-md shadow-blue-950/20 ring-1 ring-inset ring-blue-200/30"
                                        : "text-blue-100 hover:translate-x-1 hover:bg-white/10 hover:text-white"
                                    }
                                  `}
                                >
                                  {({ isActive }) => (
                                    <>
                                      <span
                                        className={`mr-3 h-2 w-2 shrink-0 rounded-full transition-all ${
                                          isActive
                                            ? "bg-white shadow-[0_0_0_3px_rgba(147,197,253,0.3)]"
                                            : "bg-blue-300"
                                        }`}
                                      />
                                      <span>{sub.title}</span>
                                    </>
                                  )}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      end
                      onClick={() => {
                        setOpenMenu("");
                        handleNavigation();
                      }}
                      title={isCollapsed ? item.title : undefined}
                      className={({ isActive }) => `
                        flex h-14 items-center rounded-2xl
                        transition-all duration-200
                        ${
                          isCollapsed
                            ? "justify-center px-2"
                            : "gap-4 px-4"
                        }
                        ${
                          isActive
                            ? "bg-[#2563EB] text-white shadow-lg shadow-blue-950/20"
                            : "text-slate-200 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      <span className="shrink-0">{item.icon}</span>

                      {!isCollapsed && (
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Upgrade card */}
          {!isCollapsed && (
            <div className="mt-6 px-1 pb-4">
              <div className="rounded-2xl bg-[#2563EB] p-5 text-center text-white shadow-lg">
                <BsRocketTakeoffFill
                  size={36}
                  className="mx-auto mb-3 text-yellow-300"
                />

                <p className="text-sm font-semibold">Free Plan</p>
                <p className="mb-4 mt-1 text-sm text-blue-100">
                  Upgrade to Pro
                </p>

                <button
                  type="button"
                  className="w-full rounded-xl bg-white py-2.5 text-sm
                    font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Upgrade Now 🚀
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
      {hoveredSubmenu &&
        !isMobile &&
        isCollapsed &&
        createPortal(
          <div
            className="fixed z-[60] w-60 rounded-xl border border-[#0A4271]
              bg-[#084B83] p-3 text-white shadow-2xl"
            style={{
              left: hoveredSubmenu.left,
              top: hoveredSubmenu.top,
              maxHeight: "calc(100vh - 16px)",
              overflowY: "auto",
            }}
            onMouseEnter={keepSubmenuOpen}
            onMouseLeave={scheduleSubmenuClose}
            onFocusCapture={keepSubmenuOpen}
            onBlurCapture={scheduleSubmenuClose}
          >
            <p className="mb-2 border-b border-white/10 px-2 pb-3 text-sm font-semibold">
              {hoveredSubmenu.item.title}
            </p>

            <div className="space-y-1">
              {hoveredSubmenu.item.children.map((sub) => (
                <NavLink
                  key={sub.path}
                  to={sub.path}
                  end
                  onClick={handleNavigation}
                  className={({ isActive }) => `
                    flex min-h-10 items-center rounded-lg px-3 py-2.5 text-sm
                    transition-all duration-200
                    ${
                      isActive
                        ? "translate-x-1 bg-gradient-to-r from-blue-400/40 via-blue-500/25 to-blue-500/10 font-semibold text-white shadow-md shadow-blue-950/20 ring-1 ring-inset ring-blue-200/30"
                        : "text-blue-100 hover:translate-x-1 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`mr-3 h-2 w-2 shrink-0 rounded-full transition-all ${
                          isActive
                            ? "bg-white shadow-[0_0_0_3px_rgba(147,197,253,0.3)]"
                            : "bg-blue-300"
                        }`}
                      />
                      {sub.title}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Sidebar;
