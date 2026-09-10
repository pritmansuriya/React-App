import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { MdAttachMoney, MdTrendingUp } from 'react-icons/md';

// --- Helper Function to generate random Fee data (Box 1) ---
const generateYearlyFeeData = (year) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    name: month,
    amount: Math.floor(Math.random() * 4000) + 2000 
  }));
};

// --- Box 2: Generate Admissions Data based on Year AND Level ---
const generateAdmissionData = (selectedAcadYear, selectedLevel) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Return 12 months data for the selected year and level
  return months.map(month => ({
    name: month,
    // Using Year in random generator so data changes when year changes
    students: Math.floor(Math.random() * 40) + 10 + (parseInt(selectedAcadYear) % 10), 
  }));
};

// --- Generate Academic Years (Last 5 Years) ---
const getAcademicYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 5; i++) {
    const start = currentYear - i;
    const end = (currentYear - i) + 1;
    years.push(`${start}-${end}`);
  }
  return years;
};

const Admission = () => {
  // --- State for Box 1 (Fee) ---
  const [selectedFeeYear, setSelectedFeeYear] = useState(new Date().getFullYear());
  const [feeData, setFeeData] = useState([]);

  // --- State for Box 2 (Admissions) ---
  const [selectedAcadYear, setSelectedAcadYear] = useState(getAcademicYears()[0]); 
  const [selectedLevel, setSelectedLevel] = useState('All'); 
  const [admissionData, setAdmissionData] = useState([]);

  // --- useEffect for Box 1 ---
  useEffect(() => {
    setFeeData(generateYearlyFeeData(selectedFeeYear));
  }, [selectedFeeYear]);

  // --- ✅ FIXED useEffect for Box 2 (Changes on Both Year & Level) ---
  useEffect(() => {
    setAdmissionData(generateAdmissionData(selectedAcadYear, selectedLevel));
  }, [selectedAcadYear, selectedLevel]); 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
       {/* Box 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <MdAttachMoney size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Fee Collection</h2>
          </div>
          <select 
            value={selectedFeeYear}
            onChange={(e) => setSelectedFeeYear(Number(e.target.value))}
            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer shadow-sm"
          >
            {[2026, 2025, 2024, 2023, 2022].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feeData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} interval={0} tickMargin={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center text-sm text-gray-500">
          Showing data for year <span className="font-semibold text-blue-600">{selectedFeeYear}</span>
        </div>
      </div>

       {/* Box 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <MdTrendingUp size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Monthly Admissions</h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* 1. Year Filter (Academic Format) */}
            <select 
              value={selectedAcadYear}
              onChange={(e) => setSelectedAcadYear(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer shadow-sm"
            >
              {getAcademicYears().map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {/* 2. School Level Filter (Dropdown) */}
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer shadow-sm"
            >
              <option value="All">All Levels</option>
              <option value="Nursery">Nursery</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Higher Secondary">Higher Secondary</option>
            </select>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={admissionData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} 
                interval={0}
                tickMargin={5} 
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="students" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorStudents)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 text-center text-[10px] text-gray-400">
          Showing <span className="font-semibold">{selectedLevel === 'All' ? 'Overall School' : selectedLevel}</span> admissions for <span className="font-semibold">{selectedAcadYear}</span>
        </div>
      </div>

    </div>
  );
};

export default Admission;