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
import userImage from "../../assets/Luxi-Saas-Logo.png";

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

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [openMenu, setOpenMenu] = useState("");
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0 });
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
    }
  };

  const handleDashboardClick = () => {
    setSelectedMenu("Dashboard");
    setOpenMenu("");
    setHoveredMenu(null);
  };

  const handleSubmenuClick = (parentTitle) => {
    setSelectedMenu(parentTitle); // Parent menu ko selected karo
    // Agar parent menu ka submenu open nahi hai toh open karo
    if (openMenu !== parentTitle) {
      setOpenMenu(parentTitle);
    }
  };

  return (
    <aside className="h-screen flex flex-col bg-[#084B83] border-r border-[#0A4271] shadow-xl relative overflow-visible">
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
            .submenu-item::before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 3px;
              height: 0;
              background: #2563eb;
              border-radius: 10px;
              transition: height 0.3s ease;
            }
            
            /* Normal state */
            .submenu-item.normal {
              background: transparent !important;
              color: #cbd5e1 !important;
            }
            
            .submenu-item.normal:hover {
              background: rgba(255, 255, 255, 0.08) !important;
              color: #ffffff !important;
            }

            .submenu-item:hover {
              background: rgba(37, 99, 235, 0.28) !important;
              color: #ffffff !important;
              transform: translateX(4px);
            }

            .submenu-item.active {
              background: rgba(37, 99, 235, 0.36) !important;
              color: #dbeafe !important;
              font-weight: 600 !important;
            }

            .submenu-item.active::before,
            .submenu-item:hover::before {
              height: 60%;
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
              background: #2563eb !important;
              color: white !important;
              box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35) !important;
            }
            
            /* Parent menu active when submenu is open - Blue background */
            .main-menu-item.parent-active {
              background: #2563eb !important;
              color: white !important;
              box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35) !important;
            }
            
            /* Normal state - no background */
            .main-menu-item.normal {
              background: transparent !important;
              color: #cbd5e1 !important;
            }
            .main-menu-item.normal:hover {
              background: rgba(255, 255, 255, 0.08) !important;
              color: #ffffff !important;
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
            <h1 className="ml-3 text-3xl font-bold text-white">
              Schoooli
            </h1>
          )}
        </div>

        {/* Toggle Button */}
        <button
          className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB] text-white hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
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
                        className="fixed w-64 bg-[#084B83] shadow-2xl rounded-2xl z-9999 border border-[#0A4271]"
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

                        <div className="px-5 py-4 text-sm font-semibold text-slate-100 border-b border-[#0A4271] bg-[#084B83] rounded-t-2xl sticky top-0 z-10">
                          <span className="flex items-center gap-3">
                            <span className="text-blue-400 text-xl">
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
                              end
                              onClick={() => {
                                setHoveredMenu(null);
                                handleSubmenuClick(item.title);
                              }}
                              className={({ isActive }) =>
                                `submenu-item flex items-center h-11 px-4 mx-2 rounded-lg transition-all duration-200 text-sm
      ${isActive ? "active" : "normal"}`
                              }
                            >
                              <span className="w-2 h-2 rounded-full bg-blue-400 mr-3 shrink-0"></span>

                              {sub.title}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expanded Submenu */}
                    {!collapsed && openMenu === item.title && (
                      <div className="relative ml-6 pl-4 mt-1">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 rounded-full"></div>
                        {item.children.map((sub) => (
                          <NavLink
                            key={sub.title}
                            to={sub.path}
                            end
                            onClick={() => {
                              handleSubmenuClick(item.title);
                            }}
                            className={({ isActive }) =>
                              `submenu-item flex items-center h-11 rounded-lg px-4 mb-0.5 transition-all duration-200 text-sm
    ${isActive ? "active" : "normal"}`
                            }
                          >
                            <span className="absolute -left-4.25 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-l-2 border-b-2 border-slate-600 rounded-bl-lg"></span>
                            <span className="w-2 h-2 rounded-full bg-blue-400 mr-3 shrink-0"></span>
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
                    className={() =>
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
            <div className="rounded-2xl bg-[#2563EB] text-white p-5 text-center shadow-lg hover:shadow-xl transition-all duration-200">
              <BsRocketTakeoffFill
                size={40}
                className="mx-auto mb-3 text-yellow-300"
              />
              <p className="text-sm font-medium">Free Plan</p>
              <p className="text-sm mb-4 text-blue-100">Upgrade to Pro</p>
              <button className="bg-white text-blue-700 font-semibold rounded-xl w-full py-2.5 text-sm hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg">
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
