import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import RoutineCard from "./RoutineCard";
import { FiChevronDown, FiBookOpen, FiHome, FiAward, FiCalendar, FiClock, FiRefreshCw, } from "react-icons/fi";

const routine = [
  {
    id: 1,
    month: "Octomber, 2023",
    description: "Your Octomber class routine is here.",
    buttonColor: "bg-purple-600",
    buttonText: "Download routine (pdf)",
    progressColor: "bg-sky-500",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-100",
  },
  {
    id: 2,
    month: "November, 2023",
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
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [selectedYear, setSelectedYear] = useState(2023);
  return (
    <div className="bg-white rounded-2xl h-95 p-4">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Class Routine</h2>
        {/* 
        <button className='text-gray-500 text-sm hover:text-purple-600'>
            View All
        </button> */}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-500">
            Select your day
            <IoChevronDown />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-500">
            Select your class
            <IoChevronDown />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-500">
            Section
            <IoChevronDown />
          </button>
        </div>

        {/* Right Side */}
        <div className="relative">
          <button
            onClick={() => setShowRoutineMenu(!showRoutineMenu)}
            className="flex items-center gap-1 text-sm font-medium cursor-pointer text-gray-500 hover:text-purple-600 transition"
          >
            View All
            <FiChevronDown
              className={`transition-transform duration-300 ${
                showRoutineMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showRoutineMenu && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
              {/* Header */}
              {/* <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
                <FiBookOpen className="text-indigo-600 text-lg" />
                <h3 className="font-semibold text-gray-800">Class Routine</h3>
              </div> */}

              {/* Primary Classes */}
              <button
                onClick={() => {
                  console.log("Primary Classes");
                  setShowRoutineMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition"
              >
                <FiBookOpen className="text-blue-500 text-lg" />
                <span className="text-gray-700">Primary Classes</span>
              </button>

              {/* Secondary Classes */}
              <button
                onClick={() => {
                  console.log("Secondary Classes");
                  setShowRoutineMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition"
              >
                <FiHome className="text-green-500 text-lg" />
                <span className="text-gray-700">Secondary Classes</span>
              </button>

              {/* Higher Secondary */}
              <button
                onClick={() => {
                  console.log("Higher Secondary");
                  setShowRoutineMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition"
              >
                <FiAward className="text-orange-500 text-lg" />  
                <span className="text-gray-700">Higher Secondary</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-5">
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
