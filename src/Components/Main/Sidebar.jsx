import React, { useState, useRef } from "react";
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
import { NavLink } from "react-router-dom";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import userImage from "E:/Software/src/assets/Luxi-Saas-Logo.png";

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
      { title: "All Students", path: "/dashboard/students" },
      { title: "Add Student", path: "/dashboard/students/add" },
    ],
  },
  {
    title: "Teachers",
    icon: <FaChalkboardTeacher size={20} />,
    children: [
      { title: "All Teachers", path: "/dashboard/teachers" },
      { title: "Add Teacher", path: "/dashboard/teachers/add" },
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
      { title: "Add Subject", path: "/dashboard/subject/add" },
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
      { title: "Notice 1", path: "/dashboard/notice" },
      { title: "Notice 2", path: "/dashboard/notice/2" },
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

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [openMenu, setOpenMenu] = useState("");
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0 });
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const hoverTimer = useRef(null);

  const handleMouseEnter = (title, event) => {
    if (!collapsed) return;

    // Cancel closing timer
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const submenuHeight = 170;
    const padding = 10;

    let top = rect.top;

    if (top + submenuHeight > viewportHeight - padding) {
      top = viewportHeight - submenuHeight - padding;
    }

    if (top < padding) {
      top = padding;
    }

    setSubmenuPosition({ top });
    setHoveredMenu(title);
  };

  const handleMouseLeave = () => {
    if (collapsed) {
      setHoveredMenu(null);
    }
  };
  const handleMenuClick = (title) => {
    setSelectedMenu(title);
    if (!collapsed) {
      setOpenMenu((prev) => (prev === title ? "" : title));
      setActiveSubmenu(""); // Reset active submenu when changing menu
    }
  };

  const handleDashboardClick = () => {
    setSelectedMenu("Dashboard");
    setOpenMenu("");
    setActiveSubmenu("");
    setHoveredMenu(null);
  };

  const handleSubmenuClick = (subTitle, parentTitle) => {
    setActiveSubmenu(subTitle);
    setSelectedMenu(parentTitle); // Parent menu ko selected karo
    // Agar parent menu ka submenu open nahi hai toh open karo
    if (openMenu !== parentTitle) {
      setOpenMenu(parentTitle);
    }
  };

  return (
    <aside className="h-screen flex flex-col bg-white shadow-xl relative overflow-visible">
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
            
            .overflow-y-auto {
              scrollbar-width: none;
            }

            /* Submenu styles */
            .submenu-item {
              position: relative;
              transition: all 0.3s ease;
              padding-left: 12px;
              cursor: pointer;
            }
            
            /* Hover effect - only when hovering */
            .submenu-item:hover {
              background: linear-gradient(90deg, #eef2ff, #f5f3ff) !important;
              transform: translateX(4px);
            }
            
            .submenu-item:hover::before {
              height: 60%;
            }
            
            /* Active state - when clicked */
            .submenu-item.active {
              background: linear-gradient(90deg, #eef2ff, #f5f3ff) !important;
              color: #4f46e5 !important;
              font-weight: 600 !important;
            }
            
            .submenu-item.active::before {
              height: 60%;
            }
            
            .submenu-item::before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 3px;
              height: 0;
              background: linear-gradient(180deg, #6366f1, #8b5cf6);
              border-radius: 10px;
              transition: height 0.3s ease;
            }
            
            /* Normal state */
            .submenu-item.normal {
              background: transparent !important;
              color: #6b7280 !important;
            }
            
            .submenu-item.normal:hover {
              background: linear-gradient(90deg, #eef2ff, #f5f3ff) !important;
              color: #4b5563 !important;
            }

            /* Main menu hover effect */
            .main-menu-item {
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .main-menu-item:hover {
              transform: scale(1.02);
            }
            
            /* Active state - Blue background with white text */
            .main-menu-item.active {
              background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
              color: white !important;
              box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
            }
            
            /* Parent menu active when submenu is open - Blue background */
            .main-menu-item.parent-active {
              background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
              color: white !important;
              box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
            }
            
            /* Normal state - no background */
            .main-menu-item.normal {
              background: transparent !important;
              color: #6b7280 !important;
            }
            .main-menu-item.normal:hover {
              background: #f3f4f6 !important;
              color: #374151 !important;
            }
          `}
        </style>

        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          <img
            src={userImage}
            className="w-14 h-14 object-contain"
            alt="logo"
          />
          {!collapsed && (
            <h1 className="ml-3 text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Schoooli
            </h1>
          )}
        </div>

        {/* Toggle Button */}
        <button
          className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
            } else {
              setCollapsed(true);
              setOpenMenu("");
              setActiveSubmenu("");
              setHoveredMenu(null);
            }
          }}
        >
          {collapsed ? (
            <HiOutlineBars3 size={24} />
          ) : (
            <HiOutlineXMark size={24} />
          )}
        </button>

        {/* Menu Items */}
        <div className={collapsed ? "px-2" : "px-3"}>
          {menuItems.map((item) => {
            // Check if this menu has open submenu
            const isParentOpen = openMenu === item.title;
            // Check if any submenu is active for this parent
            const hasActiveSubmenu = item.children.some(
              (sub) => activeSubmenu === sub.title,
            );
            // Parent should be active if selected OR if any submenu is active
            const isParentActive =
              hoveredMenu === item.title ||
              (hoveredMenu === null && selectedMenu === item.title);

            return (
              <div
                key={item.title}
                className="relative mb-2"
                onMouseEnter={(e) => handleMouseEnter(item.title, e)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children && item.children.length > 0 ? (
                  <>
                    <div className="relative group">
                      <button
                        onClick={() => handleMenuClick(item.title)}
                        className={`main-menu-item w-full flex items-center transition-all duration-300 rounded-2xl
                          ${
                            collapsed
                              ? "justify-center h-14"
                              : "justify-between px-5 h-14"
                          }
                          ${
                            isParentActive
                              ? "parent-active" // Blue background when submenu open or active
                              : "normal" // Normal state
                          }
                        `}
                      >
                        <div
                          className={`flex items-center ${
                            collapsed ? "justify-center" : "gap-4"
                          }`}
                        >
                          <span
                            className={`${
                              collapsed ? "text-3xl" : "text-2xl"
                            } ${isParentActive ? "text-white" : ""}`}
                          >
                            {item.icon}
                          </span>
                          {!collapsed && (
                            <span
                              className={`font-medium text-base ${isParentActive ? "text-white" : ""}`}
                            >
                              {item.title}
                            </span>
                          )}
                        </div>
                        {!collapsed && (
                          <IoChevronDown
                            className={`transition-transform duration-200 ${
                              openMenu === item.title ? "rotate-180" : ""
                            } ${isParentActive ? "text-white" : ""}`}
                          />
                        )}
                      </button>
                    </div>

                    {/* Collapsed Submenu */}
                    {collapsed && hoveredMenu === item.title && (
                      <div
                        className="fixed w-64 bg-white shadow-2xl rounded-2xl z-[9999] border border-gray-100"
                        style={{
                          left: "88px",
                          top: `${submenuPosition.top}px`,
                          maxHeight: "calc(100vh - 20px)",
                          overflowY: "auto",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <style>
                          {`
                            .fixed::-webkit-scrollbar {
                              display: none;
                            }
                            .fixed {
                              scrollbar-width: none;
                            }
                          `}
                        </style>

                        <div className="px-5 py-4 text-sm font-semibold text-gray-900 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl sticky top-0 z-10">
                          <span className="flex items-center gap-3">
                            <span className="text-blue-500 text-xl">
                              {item.icon}
                            </span>
                            {item.title}
                          </span>
                        </div>

                        <div className="py-2">
                          {item.children.map((sub) => (
                            <NavLink
                              key={sub.title}
                              to={sub.path}
                              onMouseEnter={() => setHoveredSubmenu(sub.title)}
                              onMouseLeave={() => setHoveredSubmenu(null)}
                              onClick={() => {
                                setHoveredMenu(null);
                                handleSubmenuClick(sub.title, item.title);
                              }}
                              className={() =>
                                `submenu-item flex items-center h-11 px-4 mx-2 rounded-lg transition-all duration-200 text-sm
      ${hoveredSubmenu === sub.title ? "active" : "normal"}`
                              }
                            >
                              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-3 flex-shrink-0"></span>

                              {sub.title}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expanded Submenu */}
                    {!collapsed && openMenu === item.title && (
                      <div className="relative ml-6 pl-4 mt-1">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
                        {item.children.map((sub) => (
                          <NavLink
                            key={sub.title}
                            to={sub.path}
                            onClick={() => {
                              handleSubmenuClick(sub.title, item.title);
                            }}
                            className={({ isActive }) =>
                              `submenu-item flex items-center h-11 rounded-lg px-4 mb-0.5 transition-all duration-200 text-sm
    ${isActive ? "active" : "normal"}`
                            }
                          >
                            <span className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-l-2 border-b-2 border-gray-200 rounded-bl-lg"></span>
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-3 flex-shrink-0"></span>
                            {sub.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* Dashboard */
                  <NavLink
                    to={item.path}
                    onClick={handleDashboardClick}
                    className={({ isActive }) =>
                      `main-menu-item w-full flex items-center transition-all duration-300 rounded-2xl
                        ${collapsed ? "justify-center h-14" : "px-5 h-14"}
                        ${selectedMenu === "Dashboard" ? "active" : "normal"}
                      `
                    }
                  >
                    <div
                      className={`flex items-center ${
                        collapsed ? "justify-center" : "gap-4"
                      }`}
                    >
                      <span
                        className={`${collapsed ? "text-3xl" : "text-2xl"} ${selectedMenu === "Dashboard" ? "text-white" : ""}`}
                      >
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span
                          className={`font-medium text-base ${selectedMenu === "Dashboard" ? "text-white" : ""}`}
                        >
                          {item.title}
                        </span>
                      )}
                    </div>
                  </NavLink>
                )}
              </div>
            );
          })}
        </div>

        {/* Upgrade Card */}
        {!collapsed && (
          <div className="px-3 pb-3 mt-4">
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 text-white p-5 text-center shadow-lg hover:shadow-xl transition-all duration-200">
              <BsRocketTakeoffFill
                size={40}
                className="mx-auto mb-3 text-yellow-300"
              />
              <p className="text-sm font-medium">Free Plan</p>
              <p className="text-sm mb-4 text-purple-200">Upgrade to Pro</p>
              <button className="bg-white text-purple-700 font-semibold rounded-xl w-full py-2.5 text-sm hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg">
                Upgrade Now 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
