import React, { useState } from "react";
import {
  FiMoreVertical,
  FiEye,
  FiBarChart2,
  FiDownload,
  FiPrinter,
} from "react-icons/fi";
import { PieChart, Pie, Cell } from "recharts";
const data = [
  { name: "Math", value: 30, fill: "#FFA726" },
  { name: "English", value: 50, fill: "#6C3EF4" },
  { name: "Chemistry", value: 20, fill: "#52E316" },
];

const CourseStatistics = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm h-full w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Course Statistics 
        </h2>

        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-2 rounded-full cursor-pointer  transition"
          >
            <FiMoreVertical className="text-gray-500 hover:text-purple-600 text-lg" />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
              <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100"
                      onClick={() => {
                          console.log("View details");
                          setOpenMenu(false);
                      }}>
                <FiEye className="text-blue-500" />
                <span>View Details</span>
              </button>

              <button
                onClick={() => {
                  console.log("View Statistics");
                  setOpenMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <FiBarChart2 className="text-purple-500" />
                <span>View Statistics</span>
              </button>

              <button
                onClick={() => {
                  console.log("Download Report");
                  setOpenMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <FiDownload className="text-green-500" />
                <span>Export Data</span>
              </button>

              <button
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100"
                onClick={() => {
                  window.print();
                  setOpenMenu(false);
                }}
              >
                <FiPrinter className="text-orange-500" />
                <span>Print</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex items-center justify-center">
        <PieChart width={220} height={220}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={88}
            startAngle={140}
            endAngle={-220}
            paddingAngle={8}
            cornerRadius={20}
            stroke="transparent"
          />
        </PieChart>

        {/* Center circle */}
        <div className="absolute w-28 h-28 rounded-full bg-white shadow-[0_0_0_10px_#F7F7FB] flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm">Total</p>
          <h3 className="text-3xl font-bold text-gray-800 leading-none">
            15000
          </h3>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFA726]"></span>
          Math
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6C3CF5]"></span>
          English
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#52E51A]"></span>
          Chemistry
        </div>
      </div>
    </div>
  );
};

export default CourseStatistics;
