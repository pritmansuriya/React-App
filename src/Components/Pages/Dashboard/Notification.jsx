import React, {useState} from "react";
import {
  FiCalendar,
  FiClock,
  FiMoreVertical,
  FiBell,
  FiChevronDown,
  FiBookOpen,
  FiMessageCircle,
  FiLayers,
} from "react-icons/fi";
import { ImRadioChecked } from "react-icons/im";

const notifications = [
  {
    id: 1,
    image: "src/assets/Notification0.png",
    title: "Emergeency School Closure",
    time: "4:00 PM",
    date: "15 Aug",
  },
  {
    id: 2,
    image: "src/assets/Notification1.png",
    title: "New Extracurricular Clubs",
    time: "4:00 PM",
    date: "15 Aug",
  },
];
export const Notification = () => {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  return (
    <div className="bg-white rounded-xl h-64 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
        <div className="relative">
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-500 hover:text-purple-600 transition"
          >
            View All
            <FiChevronDown
              className={`transition-transform duration-300 ${
                showNotificationMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
              {/* Header */}
              {/* <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
                <FiBell className="text-indigo-600 text-lg" />
                <h3 className="font-semibold text-gray-800">
                  Notification Center
                </h3>
              </div> */}

              {/* Menu */}

              <button
                onClick={() => {
                  console.log("All Notifications");
                  setShowNotificationMenu(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-indigo-50 transition"
              >
                <FiBell className="text-indigo-500" />
                <span>All</span>
              </button>

              <button
                onClick={() => {
                  console.log("Academics");
                  setShowNotificationMenu(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-indigo-50 transition"
              >
                <FiBookOpen className="text-blue-500" />
                <span>Academics</span>
              </button>

              <button
                onClick={() => {
                  console.log("Events");
                  setShowNotificationMenu(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-indigo-50 transition"
              >
                <FiCalendar className="text-green-500" />
                <span>Events</span>
              </button>

              <button
                onClick={() => {
                  console.log("Messages");
                  setShowNotificationMenu(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-indigo-50 transition"
              >
                <FiMessageCircle className="text-purple-500" />
                <span>Messages</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Notification list */}
      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:shadow-sm transition"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h3>

                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <FiClock />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCalendar />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right */}
            <button>
              <FiMoreVertical className="text-gray-400 text-lg rotate-90 cursor-pointer" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
