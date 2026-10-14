// src/components/AllStudents.jsx
import React, { useState } from "react";
import { useStudents } from "../../../../Pages/hooks/useStudent";

const AllStudents = () => {
  const { students } = useStudents();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);

  // Total pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Get students for the current page
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = students.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Change page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Change records per page
  const handleStudentsPerPageChange = (event) => {
    setStudentsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#EAF1FF] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <h2 className="text-xl font-semibold text-gray-800">
                All Students
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
                {students.length} Students
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="max-h-125 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Index no
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mobile No
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Birth Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {students.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-4 py-8 text-center text-gray-400"
                        >
                          No students found. Add from Main File.
                        </td>
                      </tr>
                    ) : (
                      currentStudents.map((student, index) => (
                        <tr
                          key={student.id}
                          className="hover:bg-gray-50 text-center transition"
                        >
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {startIndex + index + 1}
                          </td>

                          <td className="px-4 py-3 text-sm font-medium text-gray-800">
                            {student.name}
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600">
                            <span className="text-gray-700 px-2 py-1 rounded-lg text-xs font-medium">
                              {student.class}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600">
                            {student.rollNo}
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600">
                            {student.mobileNo}
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600">
                            {formatDate(student.birthDate)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {students.length > 0 && (
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Records information and page size */}
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                  <span>
                    Showing {startIndex + 1}–
                    {Math.min(startIndex + studentsPerPage, students.length)} of{" "}
                    {students.length} students
                  </span>

                  <div className="flex items-center gap-2">
                    <label htmlFor="studentsPerPage">Rows:</label>

                    <select
                      id="studentsPerPage"
                      value={studentsPerPage}
                      onChange={handleStudentsPerPageChange}
                      className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>

                {/* Page navigation */}
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`min-w-9 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        currentPage === page
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 text-gray-600 hover:bg-blue-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
