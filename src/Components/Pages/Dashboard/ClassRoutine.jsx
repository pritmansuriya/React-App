import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import {
  FiChevronDown,
  FiBookOpen,
  FiHome,
  FiAward,
} from "react-icons/fi";

import RoutineCard from "./RoutineCard";

const routine = [
  {
    id: 1,
    month: "October, 2026",
    description: "Your October class routine is here.",
    buttonColor: "bg-purple-600",
    buttonText: "Download routine (pdf)",
    progressColor: "bg-sky-500",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-100",
  },
  {
    id: 2,
    month: "November, 2026",
    description: "Your November class routine is here.",
    buttonColor: "bg-gray-900",
    buttonText: "Download routine (pdf)",
    progressColor: "bg-orange-400",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100",
  },
];

const ClassRoutine = () => {
  const [showRoutineMenu, setShowRoutineMenu] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <div className="relative w-full min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      {/* Heading */}
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
        <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
          Class Routine
        </h2>
      </div>

      {/* Filters and View All */}
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Filters */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:w-auto">
          {/* Day Filter */}
          <div className="relative">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-gray-600 outline-none transition focus:border-purple-500 xl:min-w-[145px]"
            >
              <option value="">Select your day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
            <IoChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Class Filter */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-gray-600 outline-none transition focus:border-purple-500 xl:min-w-[145px]"
            >
              <option value="">Select your class</option>
              <option value="Class 03">Class 03</option>
              <option value="Class 04">Class 04</option>
              <option value="Class 06">Class 06</option>
              <option value="Class 08">Class 08</option>
            </select>
            <IoChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Section Filter */}
          <div className="relative">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-gray-600 outline-none transition focus:border-purple-500 xl:min-w-[120px]"
            >
              <option value="">Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
            <IoChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* View All Dropdown */}
        <div className="relative self-start xl:self-auto">
          <button
            type="button"
            onClick={() => setShowRoutineMenu((prev) => !prev)}
            aria-expanded={showRoutineMenu}
            className="flex items-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-500 transition hover:text-purple-600"
          >
            View All
            <FiChevronDown
              className={`transition-transform duration-300 ${
                showRoutineMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showRoutineMenu && (
            <div className="absolute right-0 z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl sm:w-72">
              <button
                type="button"
                onClick={() => setShowRoutineMenu(false)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-indigo-50"
              >
                <FiBookOpen className="text-lg text-blue-500" />
                <span className="text-sm text-gray-700">
                  Primary Classes
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowRoutineMenu(false)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-indigo-50"
              >
                <FiHome className="text-lg text-green-500" />
                <span className="text-sm text-gray-700">
                  Secondary Classes
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowRoutineMenu(false)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-indigo-50"
              >
                <FiAward className="text-lg text-orange-500" />
                <span className="text-sm text-gray-700">
                  Higher Secondary
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Routine Cards */}
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {routine.map((item) => (
          <RoutineCard
            key={item.id}
            month={item.month}
            description={item.description}
            buttonColor={item.buttonColor}
            buttonText={item.buttonText}
            progressColor={item.progressColor}
            iconColor={item.iconColor}
            iconBg={item.iconBg}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassRoutine;
