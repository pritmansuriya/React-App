// StudentChart.jsx - Enhanced Version (Box 2 Dropdown Filter)
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import { FaChartLine, FaUserFriends } from 'react-icons/fa';

// --- Helper: Generate Random Attendance Data for any Year ---
const generateAttendanceData = (year) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seed = parseInt(year);
  return months.map((month) => {
    const total = 1000;
    const present = Math.floor(Math.random() * 150) + 800 + (seed % 10);
    const absent = total - present;
    return { month, present, absent, total };
  });
};

// --- Base Gender Data ---
const baseGenderData = [
  { name: 'Male', value: 680, color: '#3b82f6' },
  { name: 'Female', value: 570, color: '#ec4899' },
];

export const StudentChart = () => {
  // --- Year Filter State ---
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [attendanceData, setAttendanceData] = useState([]);

  // --- Gender Dropdown State ---
  const [genderFilter, setGenderFilter] = useState('All'); // 'All', 'Male', 'Female'
  const [genderData, setGenderData] = useState(baseGenderData);

  // --- Generate Last 5 Years Array ---
  const yearsArray = [];
  for (let i = 0; i < 5; i++) {
    yearsArray.push(currentYear - i);
  }

  // --- Update Attendance Data ---
  useEffect(() => {
    setAttendanceData(generateAttendanceData(selectedYear));
  }, [selectedYear]);

  // --- UPDATE GENDER DATA when Dropdown Changes ---
  useEffect(() => {
    if (genderFilter === 'All') {
      setGenderData(baseGenderData); // Show both
    } else if (genderFilter === 'Male') {
      // Only Male shown as 100%
      setGenderData([{ name: 'Male', value: 100, color: '#3b82f6' }]);
    } else if (genderFilter === 'Female') {
      // Only Female shown as 100%
      setGenderData([{ name: 'Female', value: 100, color: '#ec4899' }]);
    }
  }, [genderFilter]);

  // --- Pie Chart Hover State ---
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => setActiveIndex(index);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Box 1: Student Attendance Trend */}
      <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FaChartLine size={20} />
            </div>
            <div className='text-left'>
              <h2 className="text-lg font-semibold text-gray-800">
                Student Attendance Trend
              </h2>
              <p className="text-sm text-gray-500">Monthly attendance overview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {yearsArray.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tick={{ fill: '#6b7280' }} interval={0} />
              <YAxis stroke="#9ca3af" fontSize={12} tick={{ fill: '#6b7280' }} domain={[0, 1000]} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '12px' }} formatter={(value) => [`${value} Students`, '']} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area type="monotone" dataKey="present" name="Present" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
              <Line type="monotone" dataKey="absent" name="Absent" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-gray-600">Present</span>
            <span className="font-semibold text-blue-600">
              {attendanceData.length > 0 
                ? Math.round((attendanceData.reduce((acc, curr) => acc + curr.present, 0) / attendanceData.length / 1000) * 100) 
                : 0}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-gray-600">Absent</span>
            <span className="font-semibold text-red-600">
              {attendanceData.length > 0 
                ? Math.round((attendanceData.reduce((acc, curr) => acc + curr.absent, 0) / attendanceData.length / 1000) * 100) 
                : 0}%
            </span>
          </div>
        </div>
      </div>

       {/* Box 2 */}
      <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
              <FaUserFriends size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Students by Gender
              </h2>
              <p className="text-sm text-gray-500">Gender distribution overview</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        
        <div className="h-72 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={true}
              >
                {genderData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="#fff"
                    strokeWidth={2}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                }}
                formatter={(value, name) => [
                  `${value}%`,
                  name
                ]}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Footer stats based on dropdown */}
        <div className="flex justify-center gap-6 mt-3">
          {genderData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-sm text-gray-700 font-medium">
                {item.name}: {item.value}{genderFilter !== 'All' ? '%' : ''}
              </span>
              {genderFilter === 'All' && (
                <span className="text-sm text-gray-500">
                  ({((item.value / 1250) * 100).toFixed(0)}%)
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentChart;