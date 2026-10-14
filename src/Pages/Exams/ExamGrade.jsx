import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaPlus,
  FaTimesCircle,
  FaUserGraduate,
  FaTrash,
} from "react-icons/fa";
import { saveActivity } from "../hooks/useMessages";

const ExamGrade = () => {
  const [classFilter, setClassFilter] = useState("All Classes");
  const [showModal, setShowModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);

  const [studentForm, setStudentForm] = useState({
    name: "",
    className: "",
    marks: "",
    grade: "",
    status: "Pass",
  });

  const defaultStudents = [
    {
      name: "Nen Patel",
      className: "8-A",
      marks: 92,
      grade: "A+",
      status: "Pass",
    },
    {
      name: "Aryan Shihora",
      className: "8-A",
      marks: 85,
      grade: "A",
      status: "Pass",
    },
    {
      name: "Pal Kaila",
      className: "8-B",
      marks: 22,
      grade: "F",
      status: "Fail",
    },
    {
      name: "Rano Mer",
      className: "8-B",
      marks: 48,
      grade: "C",
      status: "Pass",
    },
    {
      name: "Roshan Patel",
      className: "9-A",
      marks: 32,
      grade: "F",
      status: "Fail",
    },
    {
      name: "Prit Mansuriya",
      className: "9-A",
      marks: 89,
      grade: "A",
      status: "Pass",
    },
    {
      name: "Jeel Jasani",
      className: "9-B",
      marks: 95,
      grade: "A+",
      status: "Pass",
    },
    {
      name: "Prince Patel",
      className: "9-B",
      marks: 73,
      grade: "B",
      status: "Pass",
    },
  ];

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("examStudents");

    if (savedStudents) {
      try {
        return JSON.parse(savedStudents);
      } catch {
        localStorage.removeItem("examStudents");
      }
    }

    localStorage.setItem(
      "examStudents",
      JSON.stringify(defaultStudents)
    );

    return defaultStudents;
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add student
  const handleAddStudent = (e) => {
    e.preventDefault();

    if (
      !studentForm.name.trim() ||
      !studentForm.className ||
      studentForm.marks === "" ||
      !studentForm.grade
    ) {
      alert("Please fill all fields");
      return;
    }

    const marks = Number(studentForm.marks);

    if (marks < 0 || marks > 100) {
      alert("Marks must be between 0 and 100");
      return;
    }

    const newStudent = {
      name: studentForm.name.trim(),
      className: studentForm.className,
      marks,
      grade: studentForm.grade,
      status: studentForm.status,
    };

    const updatedStudents = [...students, newStudent];

    setStudents(updatedStudents);

    localStorage.setItem(
      "examStudents",
      JSON.stringify(updatedStudents)
    );

    saveActivity(
      "Exam grade added",
      `${newStudent.name} received grade ${newStudent.grade} for class ${newStudent.className}.`
    );

    setStudentForm({
      name: "",
      className: "",
      marks: "",
      grade: "",
      status: "Pass",
    });

    setShowModal(false);

    // Go to the last page if the new student belongs to the filter
    const matchesFilter =
      classFilter === "All Classes" ||
      newStudent.className === classFilter;

    if (matchesFilter) {
      setCurrentPage(
        Math.ceil(
          (students.filter(
            (student) =>
              classFilter === "All Classes" ||
              student.className === classFilter
          ).length + 1) / studentsPerPage
        )
      );
    }
  };

  // Delete student
  const handleDelete = (studentToDelete) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    const updatedStudents = students.filter(
      (student) => student !== studentToDelete
    );

    setStudents(updatedStudents);

    localStorage.setItem(
      "examStudents",
      JSON.stringify(updatedStudents)
    );
  };

  // Filter students by class
  const filterStudents =
    classFilter === "All Classes"
      ? students
      : students.filter(
          (student) => student.className === classFilter
        );

  // Pagination calculations
  const totalPages = Math.ceil(
    filterStudents.length / studentsPerPage
  );

  const startIndex = (currentPage - 1) * studentsPerPage;

  const currentStudents = filterStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  // Reset page if the current page exceeds the available pages
  useEffect(() => {
    setCurrentPage((page) =>
      Math.min(page, Math.max(1, totalPages))
    );
  }, [totalPages]);

  // Grade colors
  const getGradeStyle = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-600";
      case "A":
        return "bg-purple-100 text-green-600";
      case "B":
        return "bg-blue-100 text-blue-600";
      case "C":
        return "bg-yellow-100 text-yellow-600";
      case "D":
        return "bg-orange-100 text-orange-600";
      case "F":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF1FF] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-left text-gray-800">
              Exam Grade
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage and view student grades
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={classFilter}
              onChange={(e) => {
                setClassFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600"
            >
              <option value="All Classes">All Classes</option>
              <option value="8-A">8-A</option>
              <option value="8-B">8-B</option>
              <option value="9-A">9-A</option>
              <option value="9-B">9-B</option>
            </select>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition"
            >
              <FaPlus size={13} />
              Add Student
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 text-left rounded-2xl p-5">
            <p className="text-xl text-gray-500">Total students</p>
            <h2 className="text-2xl font-semibold text-gray-800 mt-2">
              120
            </h2>
          </div>

          <div className="bg-purple-100 text-left rounded-xl p-5">
            <p className="text-xl text-gray-500">Average Grade</p>
            <h2 className="text-2xl font-semibold text-purple-600 mt-2">
              A
            </h2>
          </div>

          <div className="bg-green-100 text-left rounded-xl p-5">
            <p className="text-xl text-gray-500">Passed</p>
            <h2 className="text-2xl font-semibold text-green-600 mt-2">
              112
            </h2>
          </div>

          <div className="bg-red-100 text-left rounded-xl p-5">
            <p className="text-xl text-gray-500">Failed</p>
            <h2 className="text-2xl font-semibold text-red-500 mt-2">
              2
            </h2>
          </div>
        </div>

        {/* Student table card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 text-left border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">
              Student Grades
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead className="bg-gray-50 text-base">
                <tr>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    Student
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    Class
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    Marks
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    Grade
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-center px-6 py-4 font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-gray-400"
                    >
                      No students found for this class.
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((student, index) => (
                    <tr
                      key={`${student.name}-${student.className}-${startIndex + index}`}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      {/* Student */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 shrink-0 rounded-full bg-purple-100 flex items-center justify-center">
                            <FaUserGraduate
                              className="text-purple-600"
                              size={15}
                            />
                          </div>

                          <span className="font-medium text-gray-800">
                            {student.name}
                          </span>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="px-6 py-4 text-left text-gray-600">
                        {student.className}
                      </td>

                      {/* Marks */}
                      <td className="px-6 py-4 text-left font-medium text-gray-700">
                        {student.marks}
                      </td>

                      {/* Grade */}
                      <td className="px-6 py-4 text-left">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeStyle(
                            student.grade
                          )}`}
                        >
                          {student.grade}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {student.status === "Pass" ? (
                          <span className="flex items-center gap-2 text-left text-green-600">
                            <FaCheckCircle size={14} />
                            Pass
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-left text-red-500">
                            <FaTimesCircle size={14} />
                            Fail
                          </span>
                        )}
                      </td>

                      {/* Delete */}
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleDelete(student)}
                          className="w-9 h-9 inline-flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                          title="Delete"
                          aria-label={`Delete ${student.name}`}
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filterStudents.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 px-5 py-4">
              {/* Records information */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
                <span>
                  Showing {startIndex + 1}–
                  {Math.min(
                    startIndex + studentsPerPage,
                    filterStudents.length
                  )}{" "}
                  of {filterStudents.length} students
                </span>

                <div className="flex items-center gap-2">
                  <label htmlFor="gradeRowsPerPage">Rows:</label>

                  <select
                    id="gradeRowsPerPage"
                    value={studentsPerPage}
                    onChange={(e) => {
                      setStudentsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 outline-none focus:border-purple-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>

              {/* Page navigation */}
              <div className="flex flex-wrap items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`min-w-9 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-gray-200 text-gray-600 hover:bg-purple-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Add Student
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add student grade information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Close modal"
              >
                <FaTimesCircle size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddStudent}>
              {/* Student Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={studentForm.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                />
              </div>

              {/* Class */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class
                </label>

                <select
                  name="className"
                  value={studentForm.className}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                >
                  <option value="">Select Class</option>
                  <option value="8-A">8-A</option>
                  <option value="8-B">8-B</option>
                  <option value="9-A">9-A</option>
                  <option value="9-B">9-B</option>
                </select>
              </div>

              {/* Marks */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marks
                </label>

                <input
                  type="number"
                  name="marks"
                  value={studentForm.marks}
                  onChange={handleChange}
                  placeholder="Enter marks"
                  min="0"
                  max="100"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                />
              </div>

              {/* Grade */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade
                </label>

                <select
                  name="grade"
                  value={studentForm.grade}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={studentForm.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                >
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
                >
                  <FaPlus size={13} />
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamGrade;
