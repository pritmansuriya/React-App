import { image } from "framer-motion/client";
import React, { useState } from "react";
import {
  FiMoreVertical,
  FiRefreshCw,
  FiSettings,
  FiBarChart2,
  FiDownload,
} from "react-icons/fi";

const students = [
  {
    id: 101,
    image: "src/assets/user1.png",
    name: "Evelyn Harper",
    studentId: "PRE43178",
    marks: 1185,
    percent: "98%",
  },
  {
    id: 102,
    image: "src/assets/user2.png",
    name: "Diana Plenty",
    studentId: "PRE43174",
    marks: 1165,
    percent: "91%",
  },
  {
    id: 103,
    image: "src/assets/user3.png",
    name: "John Millar",
    studentId: "PRE43187",
    marks: 1175,
    percent: "92%",
  },
];
export const StarStudent = () => {
  const [selectedId, setSelectedId] = useState(102);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-85 w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800">Star Students</h2>

        {/* Three Dot Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 rounded-full transition cursor-pointer"
          >
            <FiMoreVertical className="text-gray-400 hover:text-purple-600 text-xl" />
          </button>

          {openMenu && (
            <div className="absolute right-0 top-8 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <button
                onClick={() => {
                  // console.log("Refresh");
                  setOpenMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <FiRefreshCw className="text-blue-500" />
                <span>Refresh</span>
              </button>

              <button
                onClick={() => {
                  console.log("Download Report");
                  setOpenMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <FiDownload className="text-green-500" />
                <span>Download Report</span>
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
                  console.log("Table Settings");
                  setOpenMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <FiSettings className="text-orange-500" />
                <span>Table Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Table */}
      <table className="w-full rounded-2xl">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 text-sm">
            <th className="pb-4 w-8">
              <input type="checkbox" />
            </th>

            <th className="pb-4 w-56 text-left font-medium">Name</th>

            <th className="pb-4 w-35 text-left font-medium">ID</th>

            <th className="pb-4 w-22.5 text-left font-medium">Marks</th>

            <th className="pb-4 w-25 text-left font-medium">Percent</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => (
            <tr
              key={item.id}
              className="border-b border-white transition duration-300"
            >
              <td className="py-4 text-center">
                <input
                  type="checkbox"
                  checked={selectedId === item.id}
                  onChange={() => setSelectedId(item.id)}
                  className="accent-purple-600 w-4 h-4  border border-gray-300 cursor-pointer"
                />
              </td>

              <td className="py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800 whitespace-nowrap">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </td>

              <td className="text-gray-800 font-medium text-left py-4">
                {item.studentId}
              </td>

              <td className="font-medium text-gray-800 text-left py-4">
                {item.marks}
              </td>
              <td className="py-4 text-left">
                <span className=" text-gray-800 text-sm font-medium px-3 py-1  rounded-full">
                  {item.percent}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StarStudent;
