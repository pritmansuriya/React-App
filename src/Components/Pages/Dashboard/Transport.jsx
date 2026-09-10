import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { FaBus, FaMoneyBillWave } from 'react-icons/fa';

// --- Month List ---
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// --- Box 1: Generate Transport Data based on Month ---
const generateTransportData = (monthIndex) => {
  const seed = monthIndex + 1;
  return [
    { name: 'School Bus', value: Math.floor(Math.random() * 100) + 400 + seed },
    { name: 'Private Van', value: Math.floor(Math.random() * 80) + 150 + seed },
    { name: 'Walking', value: Math.floor(Math.random() * 80) + 200 + seed },
    { name: 'Bicycle', value: Math.floor(Math.random() * 60) + 100 + seed },
    { name: 'Car Drop', value: Math.floor(Math.random() * 80) + 180 + seed },
  ];
};

// --- Box 2: Generate Finance Data based on Year ---
const generateFinanceData = (year) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const seed = parseInt(year) % 100;
  return months.map(month => ({
    name: month,
    income: Math.floor(Math.random() * 15000) + 40000 + seed,
    expense: Math.floor(Math.random() * 10000) + 30000 + seed,
  }));
};

// Colors for Pie Chart
const TRANSPORT_COLORS = ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'];

const Transport = () => {
  // --- Box 1 State ---
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [transportData, setTransportData] = useState([]);

  // --- Box 2 State ---
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [financeData, setFinanceData] = useState([]);

  // --- Last 5 Years ---
  const last5Years = [];
  for (let i = 0; i < 5; i++) {
    last5Years.push(currentYear - i);
  }

  // --- Independent Effects ---
  useEffect(() => {
    setTransportData(generateTransportData(selectedMonth));
  }, [selectedMonth]);

  useEffect(() => {
    setFinanceData(generateFinanceData(selectedYear));
  }, [selectedYear]);

  // --- Custom Tooltip for Pie Chart ---
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-blue-600 font-medium">
            {payload[0].value} Students
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
       {/* Box 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <FaBus size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Transport Usage</h2>
          </div>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
        </div>
        
        <div className="h-[380px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%" minWidth={350} minHeight={350}>
            <PieChart>
              <Pie
                data={transportData}
                cx="50%" 
                cy="48%" 
                innerRadius={0}
                outerRadius={130} 
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={{ stroke: '#9ca3af', strokeWidth: 1.5 }}
              >
                {transportData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={TRANSPORT_COLORS[index % TRANSPORT_COLORS.length]} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-sm font-medium text-gray-700 ml-1">{value}</span>
                )}
                wrapperStyle={{
                  paddingTop: '20px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center text-xs text-gray-500">
          Showing Transport Data for {months[selectedMonth]}
        </div>
      </div>

      {/* Box 2: Income vs Expense (Height same 380px for balance) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <FaMoneyBillWave size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Income vs Expense</h2>
          </div>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            {last5Years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={financeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Legend verticalAlign="top" height={36} iconType="circle" formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>} />
              <Area type="monotone" dataKey="income" name="Income" stroke="#22c55e" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
              <Area type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center text-xs text-gray-500">
          Showing data for year {selectedYear}
        </div>
      </div>

    </div>
  );
};

export default Transport;