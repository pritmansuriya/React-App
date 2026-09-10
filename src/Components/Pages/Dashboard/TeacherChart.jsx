import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { FaChalkboardTeacher, FaBookReader } from 'react-icons/fa';

// --- Helper: Get number of weeks in a selected month ---
const getWeeksInMonth = (monthIndex) => {
  const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
  const weeks = Math.ceil(daysInMonth / 7);
  return weeks; 
};

// --- Box 1: Generate Monday-Saturday Data ---
const generateWeekData = (monthIndex, weekIndex) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
  const seed = parseInt(`${monthIndex}${weekIndex}`); 
  return days.map(day => ({
    name: day,
    present: Math.floor(Math.random() * 20) + 40 + (seed % 10),
    absent: Math.floor(Math.random() * 10) + 5,
  }));
};

// --- Box 2: Generate Library Data based on Class ONLY (All 12 Months Show) ---
const generateLibraryData = (className) => {
  // Fixed 12 Months for X-Axis
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Use Class character to generate random seed for data
  const seed = className.charCodeAt(0);
  
  return months.map(month => ({
    name: month,
    students: Math.floor(Math.random() * 40) + 20 + (seed % 10),
    staff: Math.floor(Math.random() * 15) + 5,
  }));
};

const TeacherChart = () => {
  // --- Box 1 States ---
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [selectedMonth1, setSelectedMonth1] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weeksArray, setWeeksArray] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  // --- Box 2 States (Only Class) ---
  const classes = ['All', 'A', 'B', 'C', 'D', 'E', 'F'];
  const [selectedClass, setSelectedClass] = useState('All');
  const [libraryData, setLibraryData] = useState([]);

  // --- Box 1 Effects ---
  useEffect(() => {
    const weekCount = getWeeksInMonth(selectedMonth1);
    const weeks = [];
    for (let i = 1; i <= weekCount; i++) weeks.push(i);
    setWeeksArray(weeks);
    setSelectedWeek(1);
  }, [selectedMonth1]);

  useEffect(() => {
    setTeacherData(generateWeekData(selectedMonth1, selectedWeek));
  }, [selectedMonth1, selectedWeek]);

  // --- Box 2 Effect (Only Class changes data) ---
  useEffect(() => {
    setLibraryData(generateLibraryData(selectedClass));
  }, [selectedClass]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
      {/* Box 1: Teacher Attendance */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FaChalkboardTeacher size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Teacher Attendance</h2>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={selectedMonth1}
              onChange={(e) => setSelectedMonth1(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <select 
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {weeksArray.map((weekNum) => (
                <option key={weekNum} value={weekNum}>Week {weekNum}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teacherData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>} />
              <Bar dataKey="present" name="Present" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={25} />
              <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          Showing {months[selectedMonth1]} - Week {selectedWeek} (Mon-Sat)
        </div>
      </div>

       {/* Box 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <FaBookReader size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Library Usage</h2>
          </div>
          
          <div className="flex items-center">
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>Class {cls}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={libraryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                interval={0}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>} />
              <Line 
                type="monotone" 
                dataKey="students" 
                name="Students" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="staff" 
                name="Staff" 
                stroke="#f59e0b" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 text-center text-xs text-gray-500">
          Showing data for {selectedClass === 'All' ? 'All Classes' : `Class ${selectedClass}`} (Jan-Dec)
        </div>
      </div>

    </div>
  );
};

export default TeacherChart;