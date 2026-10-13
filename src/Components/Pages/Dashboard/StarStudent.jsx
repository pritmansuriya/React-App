import React, { useState } from "react";
import {
  FiMoreVertical,
  FiRefreshCw,
  FiSettings,
  FiBarChart2,
  FiDownload,
} from "react-icons/fi";

import user1 from "../../../assets/user1.png";
import user2 from "../../../assets/user2.png";
import user3 from "../../../assets/user3.png";

const students = [
  {
    id: 101,
    image: user1,
    name: "Evelyn Harper",
    studentId: "PRE43178",
    marks: 1185,
    percent: "98%",
  },
  {
    id: 102,
    image: user2,
    name: "Diana Plenty",
    studentId: "PRE43174",
    marks: 1165,
    percent: "91%",
  },
  {
    id: 103,
    image: user3,
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
    <div className="h-auto w-full rounded-2xl bg-white p-4 shadow-sm sm:h-85 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between sm:mb-6">
        <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
          Star Students
        </h2>

        {/* Three Dot Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 rounded-full transition cursor-pointer"
            aria-label="Open student menu"
          >
            <FiMoreVertical className="text-gray-400 hover:text-purple-600 text-xl" />
          </button>

          {openMenu && (
            <div className="absolute right-0 top-8 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <button
                onClick={() => {
                  setSelectedId(102);
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

      {/* Mobile list */}
      <div className="divide-y divide-gray-100 sm:hidden">
        {students.map((item) => (
          <div key={item.id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-center gap-3">
              <input
                type="checkbox"
                checked={selectedId === item.id}
                onChange={() =>
                  setSelectedId(selectedId === item.id ? null : item.id)
                }
                aria-label={`Select ${item.name}`}
                className="h-4 w-4 shrink-0 cursor-pointer border border-gray-300 accent-purple-600"
              />
              <img
                src={item.image}
                alt=""
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">ID: {item.studentId}</p>
              </div>
            </div>
            <dl className="ml-17 mt-3 grid grid-cols-2 gap-3">
              <div>
                <dt className="text-xs text-gray-500">Marks</dt>
                <dd className="text-sm font-semibold text-gray-800">{item.marks}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Percent</dt>
                <dd className="text-sm font-semibold text-gray-800">{item.percent}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full rounded-2xl">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-sm">
              <th className="pb-4 w-8">
                <input type="checkbox" aria-label="Select all students" />
              </th>

              <th className="pb-4 w-56 text-left font-medium">
                Name
              </th>

              <th className="pb-4 w-35 text-left font-medium">
                ID
              </th>

              <th className="pb-4 w-22.5 text-left font-medium">
                Marks
              </th>

              <th className="pb-4 w-25 text-left font-medium">
                Percent
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 transition duration-300"
              >
                <td className="py-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedId === item.id}
                    onChange={() =>
                      setSelectedId(
                        selectedId === item.id ? null : item.id
                      )
                    }
                    aria-label={`Select ${item.name}`}
                    className="accent-purple-600 w-4 h-4 border border-gray-300 cursor-pointer"
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
                  <span className="text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    {item.percent}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StarStudent;
