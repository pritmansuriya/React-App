import React, { useState } from "react";
import {
  FaCheckCircle,
  FaPlus,
  FaTimesCircle,
  FaUserGraduate,
  FaTrash,
} from "react-icons/fa";

const ExamGrade = () => {
  const [classFilter, setClassFilter] = useState("All Classes");
  const [showModal, setShowModal] = useState(false);

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

    if(savedStudents) {
      return JSON.parse(savedStudents);
    }

    localStorage.setItem
    ("examStudents", JSON.stringify(defaultStudents));

    return defaultStudents;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = (e) => {
  e.preventDefault();

  if (
    !studentForm.name ||
    !studentForm.className ||
    !studentForm.marks ||
    !studentForm.grade
  ) {
    alert("Please fill all fields");
    return;
  }

  const newStudent = {
    name: studentForm.name,
    className: studentForm.className,
    marks: Number(studentForm.marks),
    grade: studentForm.grade,
    status: studentForm.status,
  };

  const updatedStudents = [...students, newStudent];

  // Update React state
  setStudents(updatedStudents);

  // Save to localStorage
  localStorage.setItem(
    "examStudents",
    JSON.stringify(updatedStudents)
  );

  // Clear form
  setStudentForm({
    name: "",
    className: "",
    marks: "",
    grade: "",
    status: "Pass",
  });

  // Close modal
  setShowModal(false);
};
 const handleDelete = (index) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) {
    return;
  }

  const updatedStudents = students.filter(
    (_, studentIndex) => studentIndex !== index
  );

  // Update React state
  setStudents(updatedStudents);

  // Update localStorage
  localStorage.setItem(
    "examStudents",
    JSON.stringify(updatedStudents)
  );
};
  // Filter
  const filterStudents =
    classFilter == "All Classes"
      ? students
      : students.filter((student) => student.className === classFilter);

  // Grade Color
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600"
            >
              <option value="All Classes">All Classes</option>
              <option value="8-A">8-A</option>
              <option value="8-B">8-B</option>
              <option value="9-A">9-A</option>
              <option value="9-B">9-B</option>
            </select>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition"
            >
              <FaPlus size={13} />
              Add Student
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 mb-6">
          {/* Total students */}
          <div className="bg-gray-100 text-left rounded-2xl p-5">
            <p className="text-xl text-gray-500">Total students</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-2">120</h2>
          </div>

          {/* Average Grade  */}
          <div className="bg-purple-100 text-left rounded-xl p-5">
            <p className="text-xl text-gray-500">Average Grade</p>

            <h2 className="text-2xl font-semibold text-purple-600 mt-2">A</h2>
          </div>

          {/* Passed */}
          <div className="bg-green-100 text-left rounded-xl p-5">
            <p className="text-xl text-gray-500">Passed</p>

            <h2 className="text-2xl font-semibold text-green-600 mt-2">112</h2>
          </div>

          {/* Failed */}
          <div className="bg-red-100 text-left rounded-xl p-5">
            <p className="text-xl text-gray-500">Failed</p>

            <h2 className="text-2xl font-semibold text-red-500 mt-2">2</h2>
          </div>
        </div>

        {/* Student table */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {/* Theader */}
          <div className="p-5 text-left border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">
              Student Grades
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className=" w-7xl text-sm">
              {/* Thead */}
              <thead className="bg-gray-50 text-xl">
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

              {/* Table body */}
              <tbody>
                {filterStudents.map((student, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                          <FaUserGraduate
                            className="text-purple-600"
                            size={15}
                          />
                        </div>

                        <span className="font-medium text-center text-gray-800">
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
                        className={`px-3 py-1 rounded-full text-xs  font-semibold ${getGradeStyle(
                          student.grade,
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

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(index)}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
                onClick={() => setShowModal(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
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
