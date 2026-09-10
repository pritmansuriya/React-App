import React from 'react';
import {
  MdPeople,
  MdAttachMoney,
  MdTrendingUp,
} from 'react-icons/md';
import { FaChalkboardTeacher } from 'react-icons/fa';

const Summary = () => {
  return (
    <div className="p-5 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-left text-gray-800">Summary Cards</h1>
      </div>

      {/* Row 1: Summary Cards - Full scrollable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students Card */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <MdPeople size={28} />
              </div>
              <span className="text-sm font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                ↑ 12%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">1,250</p>
            <div className="mt-3 h-1 w-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Total Teachers Card */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <FaChalkboardTeacher size={28} />
              </div>
              <span className="text-sm font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                ↑ 8%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Teachers</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">85</p>
            <div className="mt-3 h-1 w-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <MdAttachMoney size={28} />
              </div>
              <span className="text-sm font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                ↑ 23%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">$84,250</p>
            <div className="mt-3 h-1 w-full bg-linear-to-r from-green-500 to-green-600 rounded-full"></div>
          </div>
        </div>

        {/* Attendance Rate Card */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <MdTrendingUp size={28} />
              </div>
              <span className="text-sm font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                ↑ 5%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Attendance Rate</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">92.5%</p>
            <div className="mt-3 h-1 w-full bg-linear-to-r from-orange-500 to-orange-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;