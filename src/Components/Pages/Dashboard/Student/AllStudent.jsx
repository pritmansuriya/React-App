// src/components/AllStudents.jsx
import React from 'react';
import { useStudents } from '../../../../Pages/hooks/useStudent';
const AllStudents = () => {
  const { students } = useStudents();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <h2 className="text-xl font-semibold text-gray-800">All Students</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
                {students.length} Students
              </span>
             
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Info Alert */}
            

            {/* Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Index no</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                           No students found. Add from Main File.
                        </td>
                      </tr>
                    ) : (
                      students.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50 text-center transition">
                          <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{student.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <span className=" text-gray-700 px-2 py-1 rounded-lg text-xs font-medium">
                              {student.class}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{student.rollNo}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{student.mobileNo}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDate(student.birthDate)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;