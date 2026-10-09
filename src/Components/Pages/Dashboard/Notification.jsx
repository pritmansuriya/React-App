import React, { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiMoreVertical,
  FiBell,
  FiChevronDown,
  FiBookOpen,
  FiMessageCircle,
  FiX,
} from "react-icons/fi";
import { dismissMessage, useMessages } from "../../../Pages/hooks/useMessages";
import notification0Image from "../../../assets/Notification0.png";
import notification1Image from "../../../assets/Notification1.png";

const formatMessageDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Just now";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const Notification = () => {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const { messages } = useMessages();
  const notificationItems = messages.map((message) => ({
    ...message,
    image:
      message.id === "announcement-closure"
        ? notification0Image
        : message.id === "announcement-clubs"
          ? notification1Image
          : message.image,
    category: message.category ?? "messages",
    kind:
      message.type === "announcement"
        ? "notice"
        : message.type === "activity"
          ? "activity"
          : "message",
  }));
  const unreadCount = notificationItems.filter((item) => !item.read).length;
  const visibleNotifications = notificationItems.filter(
    (item) => filter === "all" || item.category === filter,
  );

  const selectFilter = (nextFilter) => {
    setFilter(nextFilter);
    setShowNotificationMenu(false);
  };

  return (
    <div className="bg-white rounded-xl min-h-64 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-500 hover:text-blue-600 transition"
          >
            {filter === "all" ? "View All" : filter[0].toUpperCase() + filter.slice(1)}
            <FiChevronDown
              className={`transition-transform duration-300 ${
                showNotificationMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <button
                onClick={() => selectFilter("all")}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-blue-50 transition"
              >
                <FiBell className="text-blue-600" />
                <span>All</span>
              </button>

              <button
                onClick={() => selectFilter("academics")}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-blue-50 transition"
              >
                <FiBookOpen className="text-blue-500" />
                <span>Academics</span>
              </button>

              <button
                onClick={() => selectFilter("events")}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-blue-50 transition"
              >
                <FiCalendar className="text-green-500" />
                <span>Events</span>
              </button>

              <button
                onClick={() => selectFilter("messages")}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-blue-50 transition"
              >
                <FiMessageCircle className="text-blue-600" />
                <span>Messages</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Notification list */}
      <div className="max-h-80 space-y-3 overflow-y-auto">
        {visibleNotifications.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">
            {filter === "messages" ? "No messages received yet." : "No notifications in this category."}
          </p>
        )}
        {visibleNotifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 border border-gray-100 rounded-xl p-3 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              {item.kind === "message" || item.kind === "activity" ? (
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-700">
                  {item.kind === "activity" ? <FiBell aria-hidden="true" /> : <FiMessageCircle aria-hidden="true" />}
                </span>
              ) : (
                <img
                  src={item.image}
                  alt=""
                  className="w-12 h-12 rounded-md object-cover"
                />
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {item.kind === "activity"
                    ? item.title
                    : item.kind === "message"
                      ? `Message from ${item.name || "Website visitor"}`
                      : item.title}
                </h3>
                {(item.kind === "message" || item.kind === "activity") && (
                  <>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">{item.message}</p>
                    {item.kind === "message" && item.email && (
                      <p className="mt-1 truncate text-xs text-gray-400">{item.email}</p>
                    )}
                  </>
                )}
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                  {item.createdAt ? <FiClock /> : <FiCalendar />}
                  <span>{item.createdAt ? formatMessageDate(item.createdAt) : `${item.date} · ${item.time}`}</span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {!item.read && (
                <span className="h-2 w-2 rounded-full bg-blue-600" aria-label="Unread notification" />
              )}
              {item.kind !== "notice" && (
                <button
                  type="button"
                  aria-label={`Dismiss ${item.title || item.name || "notification"}`}
                  onClick={() => dismissMessage(item.id)}
                  className="grid h-7 w-7 place-items-center rounded text-gray-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <FiX aria-hidden="true" />
                </button>
              )}
            </div>
            {!item.createdAt && (
              <FiMoreVertical aria-hidden="true" className="shrink-0 rotate-90 cursor-pointer text-lg text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
