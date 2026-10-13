import React, { useState, useEffect } from "react";
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
} from "recharts";
import { FaChartLine, FaUsers } from "react-icons/fa";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Exam trend data
const generateExamTrendData = (year) => {
  const seed = Number(year) % 10;

  return months.map((month, index) => ({
    name: month,
    passRate: Math.min(
      100,
      Math.floor(Math.random() * 15) + 70 + seed
    ),
    avgScore: Math.min(
      100,
      Math.floor(Math.random() * 15) + 65 + seed
    ),
  }));
};

// Class performance data
const generateClassData = (year, monthIndex) => {
  const classes = ["Class 10", "Class 11", "Class 12"];
  const seed = (Number(year) % 10) + monthIndex;

  return classes.map((cls) => ({
    name: cls,
    Maths: Math.min(100, Math.floor(Math.random() * 20) + 65 + seed),
    Science: Math.min(100, Math.floor(Math.random() * 20) + 65 + seed),
    English: Math.min(100, Math.floor(Math.random() * 20) + 65 + seed),
  }));
};

const ExamChart = () => {
  const currentYear = new Date().getFullYear();

  const [selectedYear1, setSelectedYear1] = useState(currentYear);
  const [examTrendData, setExamTrendData] = useState([]);

  const [selectedYear2, setSelectedYear2] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [classData, setClassData] = useState([]);

  const last5Years = Array.from(
    { length: 5 },
    (_, index) => currentYear - index
  );

  const last3Years = Array.from(
    { length: 3 },
    (_, index) => currentYear - index
  );

  useEffect(() => {
    setExamTrendData(generateExamTrendData(selectedYear1));
  }, [selectedYear1]);

  useEffect(() => {
    setClassData(generateClassData(selectedYear2, selectedMonth));
  }, [selectedYear2, selectedMonth]);

  const selectClass =
    "w-full min-w-0 rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 sm:px-3";

  const tooltipStyle = {
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  return (
    <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
      {/* Chart 1: Exam Result Trend */}
      <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5 lg:p-6">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0 rounded-lg bg-blue-50 p-2 text-blue-600">
              <FaChartLine size={22} />
            </div>

            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
              Exam Result Trend
            </h2>
          </div>

          <select
            value={selectedYear1}
            onChange={(e) => setSelectedYear1(Number(e.target.value))}
            className={selectClass + " sm:w-auto sm:min-w-[100px]"}
            aria-label="Select exam trend year"
          >
            {last5Years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Line Chart */}
        <div className="h-[240px] w-full min-w-0 sm:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={examTrendData}
              margin={{ top: 12, right: 8, left: -22, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                interval="preserveStartEnd"
              />

              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                width={35}
              />

              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [`${value}%`, name]}
              />

              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "12px" }}
              />

              <Line
                type="monotone"
                dataKey="passRate"
                name="Pass Rate"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 3, fill: "#22c55e", strokeWidth: 1, stroke: "#fff" }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="avgScore"
                name="Avg Score"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 3, fill: "#3b82f6", strokeWidth: 1, stroke: "#fff" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          Showing Exam Results for {selectedYear1}
        </p>
      </div>

      {/* Chart 2: Class-wise Performance */}
      <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5 lg:p-6">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="shrink-0 rounded-lg bg-purple-50 p-2 text-purple-600">
              <FaUsers size={22} />
            </div>

            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
              Class-wise Performance
            </h2>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedYear2}
              onChange={(e) => setSelectedYear2(Number(e.target.value))}
              className={selectClass}
              aria-label="Select class performance year"
            >
              {last3Years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className={selectClass}
              aria-label="Select performance month"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-[240px] w-full min-w-0 sm:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={classData}
              margin={{ top: 12, right: 4, left: -22, bottom: 0 }}
              barCategoryGap="18%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#374151", fontSize: 10, fontWeight: 600 }}
                interval={0}
              />

              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                width={35}
              />

              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [`${value}%`, name]}
              />

              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "11px" }}
              />

              <Bar
                dataKey="Maths"
                name="Maths"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />

              <Bar
                dataKey="Science"
                name="Science"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />

              <Bar
                dataKey="English"
                name="English"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          Showing {months[selectedMonth]} {selectedYear2} Performance
        </p>
      </div>
    </div>
  );
};

export default ExamChart;
