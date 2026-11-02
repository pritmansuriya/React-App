
import React, { useMemo, useState } from "react";
import {
  FaBookOpen,
  FaBullhorn,
  FaClock,
  FaExclamationCircle,
  FaFutbol,
  FaPlus,
  FaUsers,
  FaSearch,
  FaTrash,
  FaCalendarAlt,
  FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Default Notice Data
const defaultNotice = [
  {
    id: 1,
    category: "IMPORTANT",
    title: "Parent-Teacher Meeting",
    description: "The PTM will be held on Saturday at 10:00 AM.",
    date: "Aug 13, 2026",
    audience: "Parents",
    time: "10:00 AM",
  },
  {
    id: 2,
    category: "ACADEMIC",
    title: "Final Exam Timetable Released",
    description:
      "The examination timetable for Classes 5-9 is available.",
    date: "Aug 12, 2026",
    audience: "Students",
    time: "09:00 AM",
  },
  {
    id: 3,
    category: "EVENT",
    title: "Annual Sports Day",
    description:
      "Students are requested to register before Friday.",
    date: "Aug 10, 2026",
    audience: "All Students",
    time: "08:30 AM",
  },
];

// Category Configuration
const categoryConfig = {
  IMPORTANT: {
    icon: FaExclamationCircle,
    color: "text-red-600",
    badge: "bg-red-50 text-red-600",
    border: "border-l-red-500",
  },
  ACADEMIC: {
    icon: FaBookOpen,
    color: "text-purple-600",
    badge: "bg-purple-50 text-purple-600",
    border: "border-l-purple-500",
  },
  EVENT: {
    icon: FaFutbol,
    color: "text-green-600",
    badge: "bg-green-50 text-green-600",
    border: "border-l-green-500",
  },
};

const Notice1 = () => {
  const navigate = useNavigate();

  // Load notices from localStorage
  const [notices, setNotices] = useState(() => {
    try {
      const savedNotices = localStorage.getItem("schoolNotices");
      return savedNotices
        ? JSON.parse(savedNotices)
        : defaultNotice;
    } catch (error) {
      console.error("Unable to load notices:", error);
      return defaultNotice;
    }
  });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Save notices to localStorage
  const updateNotices = (updatedNotices) => {
    setNotices(updatedNotices);
    localStorage.setItem(
      "schoolNotices",
      JSON.stringify(updatedNotices)
    );
  };

  // Search and category filter
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch = [
        notice.title,
        notice.description,
        notice.audience,
        notice.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchText);

      const matchesCategory =
        activeCategory === "ALL" ||
        notice.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [notices, search, activeCategory]);

  // Statistics
  const importantCount = notices.filter(
    (notice) => notice.category === "IMPORTANT"
  ).length;

  const academicCount = notices.filter(
    (notice) => notice.category === "ACADEMIC"
  ).length;

  const eventCount = notices.filter(
    (notice) => notice.category === "EVENT"
  ).length;

  // Delete Notice
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    const updatedNotices = notices.filter(
      (notice) => notice.id !== id
    );

    updateNotices(updatedNotices);
  };

  // Statistics Card Data
  const stats = [
    {
      label: "Total Notices",
      value: notices.length,
      icon: FaBullhorn,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Important",
      value: importantCount,
      icon: FaExclamationCircle,
      color: "bg-red-50 text-red-600",
    },
    {
      label: "Academic",
      value: academicCount,
      icon: FaBookOpen,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Events",
      value: eventCount,
      icon: FaFutbol,
      color: "bg-green-50 text-green-600",
    },
  ];

  const categories = [
    "ALL",
    "IMPORTANT",
    "ACADEMIC",
    "EVENT",
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">

      {/* Main Notice Board */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <FaBullhorn className="text-xl text-purple-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Notice Board
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage school announcements and notices
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/notice/2")}
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md"
          >
            <FaPlus />
            Add Notice
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 px-5 py-5 sm:grid-cols-4 sm:px-6">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-gray-100 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon className="text-lg" />
                </div>

                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                  {item.label}
                </p>

                <h3 className="mt-1 text-2xl font-bold text-gray-800">
                  {item.value}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="px-5 pb-5 sm:px-6">

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notices by title, description or audience..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
            />
          </div>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  activeCategory === category
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                {category === "ALL"
                  ? "All Notices"
                  : category}
              </button>
            ))}
          </div>

          {/* Result Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              Latest Announcements
            </p>

            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
              {filteredNotices.length} Notices
            </span>
          </div>
        </div>

        {/* Notice List */}
        <div className="border-t border-gray-100 px-1 py-5 sm:px-2">

          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => {
              const config =
                categoryConfig[notice.category] || {
                  icon: FaBullhorn,
                  color: "text-blue-600",
                  badge: "bg-blue-50 text-blue-600",
                  border: "border-l-blue-500",
                };

              const CategoryIcon = config.icon;

              return (
                <div
                  key={notice.id}
                  className={`mx-4 mb-4 rounded-xl border border-gray-100 border-l-4 ${config.border} bg-white px-5 py-5 transition duration-200 hover:border-gray-200 hover:shadow-md sm:mx-4 sm:px-6`}
                >

                  {/* Notice Top Section */}
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                    <span
                      className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold tracking-wide ${config.badge}`}
                    >
                      <CategoryIcon />
                      {notice.category}
                    </span>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <FaCalendarAlt />
                        <span>{notice.date}</span>
                      </div>

                      <button
                        onClick={() => handleDelete(notice.id)}
                        title="Delete notice"
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-bold text-gray-800">
                    {notice.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {notice.description}
                  </p>

                  {/* Bottom Information */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gray-100 pt-4">

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaUsers className="text-purple-500" />
                      <span>{notice.audience}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaClock className="text-purple-500" />
                      <span>{notice.time}</span>
                    </div>

                    <div className="ml-auto flex items-center gap-1 text-xs font-medium text-green-600">
                      <FaBell />
                      Published
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div className="px-5 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
                <FaBullhorn className="text-2xl text-purple-400" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-700">
                No notices found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another search or select a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("ALL");
                }}
                className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-between gap-2 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <p className="text-xs text-gray-500">
            Showing {filteredNotices.length} of {notices.length} notices
          </p>

          <p className="text-xs text-gray-400">
            School Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notice1;
