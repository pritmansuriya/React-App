import React from "react";
import { IoChevronDown } from "react-icons/io5";

import user1 from "../../../assets/user1.png";
import user2 from "../../../assets/user2.png";
import user3 from "../../../assets/user3.png";

const performer = [
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
    <div className="min-w-0 w-full rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Best Performers
        </h2>

        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-500 transition hover:border-purple-500 sm:w-auto sm:justify-center"
        >
          <span>Weekly</span>
          <IoChevronDown className="text-base" />
        </button>
      </div>

      {/* Performer Rows */}
      <div className="space-y-6 sm:space-y-7">
        {performer.map((item) => (
          <div
            key={item.id}
            className="flex min-w-0 items-center gap-2 sm:gap-4"
          >
            {/* Class Name */}
            <p className="w-[68px] shrink-0 text-xs font-medium text-gray-500 sm:w-20 sm:text-sm">
              {item.className}
            </p>

            {/* Performance Bar */}
            <div className="relative h-8 min-w-0 flex-1 rounded-full bg-gray-100 sm:h-9">
              <div
                className={`flex h-full items-center justify-between rounded-full bg-gradient-to-r ${item.color} px-1.5 sm:px-2`}
                style={{ width: item.width }}
              >
                {/* Student Avatars */}
                <div className="flex -space-x-2">
                  {item.avatars.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Student ${index + 1}`}
                      className="h-5 w-5 rounded-full border-2 border-white object-cover sm:h-6 sm:w-6"
                    />
                  ))}
                </div>

                {/* Subject */}
                <span className="truncate pl-1 text-[10px] font-medium text-white sm:text-xs">
                  {item.subject}
                </span>
              </div>

              {/* Percentage */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 shadow-sm sm:px-2 sm:text-xs">
                {item.percent}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Days */}
      <div className="mt-8 grid grid-cols-4 gap-1 pl-[76px] text-center text-xs text-gray-400 sm:mt-10 sm:pl-24 sm:text-sm">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
      </div>
    </div>
  );
};

export default BestPerfomer;
