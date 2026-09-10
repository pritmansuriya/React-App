import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { FaChartLine, FaUsers } from 'react-icons/fa';

// --- Box 1: Generate Exam Trend Data based on Year (Last 5 Years) ---
const generateExamTrendData = (year) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seed = parseInt(year) % 10;
  return months.map(month => ({
    name: month,
    passRate: Math.floor(Math.random() * 15) + 70 + seed, 
    avgScore: Math.floor(Math.random() * 15) + 65 + seed,
  }));
};

// --- Box 2: Generate Class Data based on Year & Month ---
const generateClassData = (year, monthIndex) => {
  const classes = ['Class 10', 'Class 11', 'Class 12'];
  const seed = parseInt(year) % 10 + monthIndex; // Combination of Year & Month
  
  return classes.map(cls => ({
    name: cls,
    Maths: Math.floor(Math.random() * 20) + 65 + seed,
    Science: Math.floor(Math.random() * 20) + 65 + seed,
    English: Math.floor(Math.random() * 20) + 65 + seed,
  }));
};

const ExamChart = () => {
  const currentYear = new Date().getFullYear();
  
  // --- Box 1 States (Last 5 Years) ---
  const [selectedYear1, setSelectedYear1] = useState(currentYear);
  const [examTrendData, setExamTrendData] = useState([]);

  // --- Box 2 States (Last 3 Years + Month) ---
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [selectedYear2, setSelectedYear2] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = Jan
  const [classData, setClassData] = useState([]);

  // --- Last 5 Years Array ---
  const last5Years = [];
  for (let i = 0; i < 5; i++) {
    last5Years.push(currentYear - i);
  }

  // --- Last 3 Years Array ---
  const last3Years = [];
  for (let i = 0; i < 3; i++) {
    last3Years.push(currentYear - i);
  }

  // --- Update Box 1 Data ---
  useEffect(() => {
    setExamTrendData(generateExamTrendData(selectedYear1));
  }, [selectedYear1]);

  // --- Update Box 2 Data ---
  useEffect(() => {
    setClassData(generateClassData(selectedYear2, selectedMonth));
  }, [selectedYear2, selectedMonth]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
      {/* Box 1: Exam Result Trend (Last 5 Years Filter) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FaChartLine size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Exam Result Trend</h2>
          </div>
          <select 
            value={selectedYear1}
            onChange={(e) => setSelectedYear1(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {last5Years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={examTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`${value}%`, '']} />
              <Legend verticalAlign="top" height={36} iconType="circle" formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>} />
              <Line type="monotone" dataKey="passRate" name="Pass Rate" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          Showing Exam Results for {selectedYear1}
        </div>
      </div>

      {/* Box 2: Class-wise Performance (Last 3 Years + Month Filter) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <FaUsers size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Class-wise Performance</h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* 👇 Year Filter (Last 3 Years) */}
            <select 
              value={selectedYear2}
              onChange={(e) => setSelectedYear2(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              {last3Years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {/* 👇 Month Filter */}
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#374151', fontSize: 14, fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`${value}%`, 'Score']} />
              <Legend verticalAlign="top" height={36} iconType="circle" formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>} />
              <Bar dataKey="Maths" name="Maths" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="Science" name="Science" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="English" name="English" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          Showing {months[selectedMonth]} {selectedYear2} Performance
        </div>
      </div>

    </div>
  );
};

export default ExamChart;