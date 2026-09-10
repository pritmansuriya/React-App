import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const StatCard = ({
  title,
  value,
  icon,
  bgColor,
  iconColor,
  // percentage,
  // increase = true,
}) => {
  return (
    <div className={`${bgColor} rounded-2xl p-6`}>
      <div className="flex justify-between items-start">
        {/* Left */}
        <div>
          <p className="text-gray-500 text-xl text-left text-semibold">{title}</p>

          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            {value}
          </h2>

          {/* <div className="flex items-center gap-2 mt-5">
            {increase ? (
              <FaArrowUp className="text-green-500 text-xs" />
            ) : (
              <FaArrowDown className="text-red-500 text-xs" />
            )}

            <span
              className={`text-xs font-semibold ${
                increase ? "text-green-500" : "text-red-500"
              }`}
            >
              {percentage}
            </span>

            <span className="text-xs text-gray-400">
              than last month
            </span>
          </div> */}
        </div>

        {/* Right */}
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center`}
        >
          <div className={`${iconColor} text-3xl mt-2`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;