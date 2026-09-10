import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { FaUserGraduate, FaTrophy } from 'react-icons/fa';

// --- Generate Section-wise Growth Data (Box 1) ---
const generateGrowthData = (section) => {
  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  const seed = section.charCodeAt(0) + (section.length > 1 ? section.charCodeAt(1) : 0);
  
  let base = 100;
  if (section === 'Primary') base = 80;
  else if (section === 'Secondary') base = 120;
  else if (section === 'High-Secondary') base = 100;
  else base = 100; // 'All'

  return years.map(year => ({
    name: year,
    students: Math.floor(Math.random() * 50) + base + (seed % 10),
  }));
};

// --- Generate Top 10 Students Data based on Year (Box 2) ---
const generateTopStudentsData = (year) => {
  // List of 20 random Indian names to pick from
  const namePool = [
    'Aarav Sharma', 'Vihaan Patel', 'Vivaan Singh', 'Ananya Reddy', 'Diya Iyer',
    'Advik Mehta', 'Sahil Desai', 'Reyansh Joshi', 'Aaradhya Nair', 'Sai Krishna',
    'Rudra Shah', 'Ishaan Rao', 'Anvi Kumar', 'Shaurya Menon', 'Aadhya Gupta',
    'Ayush Singh', 'Kavya Nair', 'Rohan Bhat', 'Sara Khan', 'Arjun Raj'
  ];

  // Shuffle function to pick random 10 unique names
  const shuffled = [...namePool].sort(() => 0.5 - Math.random());
  const selectedNames = shuffled.slice(0, 10);

  // Generate scores (95 to 75 range) based on year seed
  const seed = parseInt(year) % 10;
  
  return selectedNames.map((name, index) => ({
    name: name,
    score: Math.floor(Math.random() * 15) + 75 + (seed % 5) - index, // Different scores descending-ish
  })).sort((a, b) => b.score - a.score); // Sort descending so highest score appears at top
};

const Growth = () => {
  // --- Box 1 State ---
  const [selectedSection, setSelectedSection] = useState('All');
  const [growthData, setGrowthData] = useState([]);

  // --- Box 2 State ---
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [topStudentsData, setTopStudentsData] = useState([]);

  // --- Last 3 Years Array ---
  const last3Years = [];
  for (let i = 0; i < 3; i++) {
    last3Years.push(currentYear - i);
  }

  // --- Update Box 1 Data ---
  useEffect(() => {
    setGrowthData(generateGrowthData(selectedSection));
  }, [selectedSection]);

  // --- Update Box 2 Data ---
  useEffect(() => {
    setTopStudentsData(generateTopStudentsData(selectedYear));
  }, [selectedYear]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
      {/* Box 1: Student Growth (Section Filter) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FaUserGraduate size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Student Growth</h2>
          </div>
          <select 
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All">All Sections</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="High-Secondary">High-Secondary</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`${value} Students`, 'Total']} />
              <Area type="monotone" dataKey="students" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          Showing growth data for {selectedSection === 'All' ? 'All Sections' : selectedSection}
        </div>
      </div>

      {/* Box 2: Top 10 Students (Last 3 Years Filter + Dynamic Names) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <FaTrophy size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Top 10 Students</h2>
          </div>
          
          {/* 👇 Box 2 Year Filter */}
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {last3Years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={topStudentsData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
              <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#374151', fontSize: 14, fontWeight: 600 }} width={130} interval={0} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`${value}%`, 'Score']} />
              <Bar dataKey="score" fill="#f59e0b" radius={[0, 8, 8, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          Showing Top 10 Students for year {selectedYear}
        </div>
      </div>

    </div>
  );
};

export default Growth;