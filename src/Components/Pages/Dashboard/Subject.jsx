import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { FaBook, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// --- Helper: Generate Subject Data based on Year & Semester (Box 1) ---
const generateSubjectData = (year, semester) => {
  const subjects = ['Mathematics', 'Science', 'English', 'Gujarati', 'Computer', 'History'];
  const seed = parseInt(year) + semester;
  return subjects.map(subject => ({
    name: subject,
    score: Math.floor(Math.random() * 38) + 60
  }));
};

// --- Helper: Generate Pass/Fail Data based on Year & Semester (Box 2) ---
const generatePassFailData = (year, semester) => {
  const seed = parseInt(year) + semester;
  const total = 1250;
  const passPercent = Math.floor(Math.random() * 15) + 80;
  const pass = Math.floor((total * passPercent) / 100);
  const fail = total - pass;
  return { pass, fail };
};

const Subject = () => {
  // --- 🔹 Box 1 Filters ---
  const currentYear = new Date().getFullYear();
  const [box1Year, setBox1Year] = useState(currentYear);
  const [box1Semester, setBox1Semester] = useState(1);

  // --- 🔹 Box 2 Filters ---
  const [box2Year, setBox2Year] = useState(currentYear);
  const [box2Semester, setBox2Semester] = useState(1);

  // --- Chart Data States ---
  const [subjectData, setSubjectData] = useState([]);
  const [passFailData, setPassFailData] = useState([
    { name: 'Pass', value: 1120 },
    { name: 'Fail', value: 130 }
  ]);

  // --- Last 5 Years Array ---
  const last5Years = [];
  for (let i = 0; i < 5; i++) {
    last5Years.push(currentYear - i);
  }

  // --- Update Box 1 Data ---
  useEffect(() => {
    setSubjectData(generateSubjectData(box1Year, box1Semester));
  }, [box1Year, box1Semester]);

  // --- Update Box 2 Data ---
  useEffect(() => {
    const { pass, fail } = generatePassFailData(box2Year, box2Semester);
    setPassFailData([
      { name: 'Pass', value: pass },
      { name: 'Fail', value: fail }
    ]);
  }, [box2Year, box2Semester]);

  // --- Donut Chart Colors ---
  const COLORS = ['#22c55e', '#ef4444'];

  // --- 🔹 FIX: activeIndex useState declare karo ---
  const [activeIndex, setActiveIndex] = useState(null);

  // --- Tooltip Position Logic (Fixed Side) ---
  const getTooltipPosition = (index) => {
    if (index === 0) return { x: 250, y: 130 }; // Pass -> Right Side
    if (index === 1) return { x: -250, y: 130 }; // Fail -> Left Side
    return { x: 0, y: 0 };
  };

  // --- Calculate Current Pass Percentage ---
  const totalStudents = passFailData.reduce((acc, curr) => acc + curr.value, 0);
  const passPercent = totalStudents > 0
    ? Math.round((passFailData[0].value / totalStudents) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

      {/* Box 1: Subject-wise Performance */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <FaBook size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Subject-wise Performance</h2>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={box1Year}
              onChange={(e) => setBox1Year(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {last5Years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              value={box1Semester}
              onChange={(e) => setBox1Semester(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value={1}>Semester 1</option>
              <option value={2}>Semester 2</option>
            </select>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={subjectData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
              <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#374151', fontSize: 16, fontWeight: 600 }} width={100} />
              <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                formatter={(value) => [`${value}%`, 'Score']}
                shared={false}
              />
              <Bar dataKey="score" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          Showing data for {box1Year} - Semester {box1Semester}
        </div>
      </div>

      {/* Box 2: Pass vs Fail Ratio (Hover FOLLOWS MOUSE EXACTLY) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg flex gap-1">
              <FaCheckCircle size={24} />
              <FaTimesCircle size={24} className="text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Pass vs Fail Ratio</h2>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={box2Year}
              onChange={(e) => setBox2Year(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
              {last5Years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              value={box2Semester}
              onChange={(e) => setBox2Semester(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
              <option value={1}>Semester 1</option>
              <option value={2}>Semester 2</option>
            </select>
          </div>
        </div>

        <div className="h-[300px] w-full relative flex justify-center items-center">
          <div className="w-[400px] h-[300px] flex items-center justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={passFailData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {passFailData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={activeIndex === index ? '#fff' : 'none'}
                    strokeWidth={activeIndex === index ? 3 : 0}
                  />
                ))}
              </Pie>
              
              {/* 👇 REMOVED position={getTooltipPosition} - NOW IT FOLLOWS MOUSE NATURALLY */}
              <Tooltip
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'white', padding: '8px 12px' }}
                formatter={(value) => [`${value} Students`, '']}
                offset={0}
                shared={false}
                wrapperStyle={{ 
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>} />
            </PieChart>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20">
            <p className="text-3xl font-bold text-gray-950 drop-shadow-md">{passPercent}%</p>
            <p className="text-xs text-gray-950 font-semibold  px-2 py-0.5 rounded-full mt-1">Pass Rate</p>
          </div>
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          Data for {box2Year} - Semester {box2Semester}
        </div>
      </div>

    </div>
  );
};

export default Subject;