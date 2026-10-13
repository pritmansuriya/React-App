import React, { useState } from "react";
import {
  FiMoreVertical,
  FiEye,
  FiBarChart2,
  FiDownload,
  FiPrinter,
} from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Math", value: 30, fill: "#FFA726" },
  { name: "English", value: 50, fill: "#6C3EF4" },
  { name: "Chemistry", value: 20, fill: "#52E316" },
];

const CourseStatistics = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="relative flex h-full w-full min-w-0 flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-800 sm:text-xl lg:text-2xl">
          Course Statistics
        </h2>

        <div className="relative shrink-0">
          <button
            type="button"
            aria-label="Course statistics menu"
            aria-expanded={openMenu}
            onClick={() => setOpenMenu((prev) => !prev)}
            className="rounded-full p-2 transition hover:bg-purple-50"
          >
            <FiMoreVertical className="text-lg text-gray-500 hover:text-purple-600" />
          </button>

          {openMenu && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              <button
                type="button"
                onClick={() => setOpenMenu(false)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
              >
                <FiEye className="text-blue-500" />
                <span>View Details</span>
              </button>

              <button
                type="button"
                onClick={() => setOpenMenu(false)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
              >
                <FiBarChart2 className="text-purple-500" />
                <span>View Statistics</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log("Export Data");
                  setOpenMenu(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
              >
                <FiDownload className="text-green-500" />
                <span>Export Data</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(false);
                  window.print();
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
              >
                <FiPrinter className="text-orange-500" />
                <span>Print</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Responsive Pie Chart */}
      <div className="relative mx-auto w-full max-w-[260px] flex-1">
        <div className="h-[190px] w-full sm:h-[220px] lg:h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="78%"
                startAngle={140}
                endAngle={-220}
                paddingAngle={4}
                cornerRadius={8}
                stroke="transparent"
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.fill} />
                ))}
              </Pie>

              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Center Circle */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white shadow-[0_0_0_8px_#F7F7FB] sm:h-28 sm:w-28">
          <p className="text-xs text-gray-400 sm:text-sm">Total</p>
          <h3 className="text-2xl font-bold leading-tight text-gray-800 sm:text-3xl">
            15000
          </h3>
        </div>
      </div>

      {/* Responsive Legend */}
      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 text-sm text-gray-500 sm:grid-cols-3 sm:gap-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-center gap-2 sm:justify-center"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseStatistics;
