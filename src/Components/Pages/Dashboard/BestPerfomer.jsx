
import React from "react";
import { IoChevronDown } from "react-icons/io5";

import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";

const perfomer = [
  {
    id: 1,
    className: "Class 06",
    subject: "Math",
    color: "from-violet-600 to-purple-500",
    width: "60%",
    percent: "60%",
    avatars: [user1, user2, user3],
  },
  {
    id: 2,
    className: "Class 04",
    subject: "GK",
    color: "from-orange-500 to-yellow-400",
    width: "70%",
    percent: "70%",
    avatars: [user3, user2, user1],
  },
  {
    id: 3,
    className: "Class 03",
    subject: "Science",
    color: "from-indigo-500 to-cyan-400",
    width: "72%",
    percent: "72%",
    avatars: [user1, user3, user2],
  },
  {
    id: 4,
    className: "Class 08",
    subject: "English",
    color: "from-red-500 to-orange-500",
    width: "47%",
    percent: "47%",
    avatars: [user2, user3, user1],
  },
];

const BestPerfomer = () => {
  return (
    <div className="min-h-[360px] rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Best Performers
        </h2>

        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-500 transition hover:border-purple-500">
          <span>Weekly</span>
          <IoChevronDown className="text-base" />
        </button>
      </div>

      {/* Rows */}
      <div className="space-y-7">
        {perfomer.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5"
          >
            <p className="w-20 shrink-0 font-medium text-gray-500">
              {item.className}
            </p>

            <div className="relative h-8 flex-1 rounded-full bg-gray-100">
              <div
                className={`flex h-full items-center justify-between rounded-full bg-gradient-to-r ${item.color} px-2`}
                style={{ width: item.width }}
              >
                <div className="flex -space-x-2">
                  {item.avatars.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Student ${index + 1}`}
                      className="h-6 w-6 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>

                <span className="text-xs font-medium text-white">
                  {item.subject}
                </span>
              </div>

              <div className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-500">
                {item.percent}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="ml-24 mt-10 flex justify-around text-sm text-gray-400">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
      </div>
    </div>
  );
};

export default BestPerfomer;