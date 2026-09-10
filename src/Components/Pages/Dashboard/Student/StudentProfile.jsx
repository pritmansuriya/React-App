// src/components/Student/StudentProfile.jsx
import React from 'react';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

const StudentProfile = ({ student, onBack }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <FaArrowLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Student Profile</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Avatar & Basic Info */}
        <div className="md:w-1/3 flex flex-col items-center bg-gray-50 p-6 rounded-2xl">
          <FaUserCircle size={100} className="text-gray-400" />
          <h3 className="text-xl font-bold text-gray-800 mt-4">{student.name}</h3>
          <p className="text-sm text-blue-600 font-medium">{student.class}</p>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Roll No: <span className="font-semibold text-gray-700">{student.rollNo || 'N/A'}</span></p>
          </div>
        </div>

        {/* Right Side - Contact Details */}
        <div className="md:w-2/3 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact Information</h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.email || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-400">Phone Number</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Address</h4>
            <div className="mt-3 bg-gray-50 p-4 rounded-xl">
              <p className="text-sm font-medium text-gray-800">{student.address || 'Address not provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;