import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
const RoutineCard = ({
  month,
  description,
  buttonColor,
  buttonText,
  progressColor,
  iconColor,
  iconBg,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      {/* Top */}
      <div className="flex justify-between items-center">
        <div
          className={`w-10 h-10 rounded-l-lg flex items-center justify-center ${iconBg}`}
        >
          <FaRegCalendarAlt className={`text-lg ${iconColor}`} />
        </div>
        <FiMoreVertical className="text-gray-400 cursor-pointer" />
      </div>

      {/* Month */}
      <h3 className="mt-4 text-lg text-left font-semibold text-gray-800">
        {month}
      </h3>

      {/* Progress */}
      <div className="w-full h-1.5 bg-gray-200 rounded-full mt-3">
        <div className={`h-full w-3/5 rounded-full ${progressColor}`}></div>
      </div>

      {/* Description */}
      <p className="text-xs text-left text-gray-400 mt-3">{description}</p>

      {/* Button */}
      <button
        className={`w-full mt-4 py-2 rounded-lg h-9 text-white text-sm font-medium ${buttonColor}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default RoutineCard;
