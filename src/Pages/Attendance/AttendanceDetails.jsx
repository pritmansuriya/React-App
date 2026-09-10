import React, { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const AttendanceDetails = () => {
  // Get data from localStorage
  const [students, setStudents] = useState(() => {
    const savedData = localStorage.getItem("attendanceData");

    return savedData
      ? JSON.parse(savedData)
      : [
          {
            id: 1,
            name: "Evelyn Harper",
            studentId: "ST001",
            present: 18,
            absent: 2,
          },
          {
            id: 2,
            name: "Diana Plenty",
            studentId: "ST002",
            present: 20,
            absent: 0,
          },
          {
            id: 3,
            name: "John Millar",
            studentId: "ST003",
            present: 17,
            absent: 3,
          },
        ];
  });

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    present: "",
    absent: "",
  });

  // Save data to localStorage whenever students changes
  useEffect(() => {
    localStorage.setItem("attendanceData", JSON.stringify(students));
  }, [students]);

  // Input Change

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------
  // Open Add Modal
  // -------------------------
  const handleAdd = () => {
    // setEditId(null);

    setFormData({
      name: "",
      studentId: "",
      present: "",
      absent: "",
    });

    setShowModal(true);
  };

  // Add

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.studentId ||
      formData.present === "" ||
      formData.absent === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    // ADD NEW STUDENT

    const newStudent = {
      id: Date.now(),
      name: formData.name,
      studentId: formData.studentId,
      present: Number(formData.present),
      absent: Number(formData.absent),
    };

    setStudents((prev) => [...prev, newStudent]);

    setShowModal(false);

    setFormData({
      name: "",
      studentId: "",
      present: "",
      absent: "",
    });

    // setEditId(null);
  };

  return (
    <div className="bg-[#F7F8FC] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/*  HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-left font-bold text-gray-800">
              Attendance Details
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor and manage student attendance records.
            </p>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            <FiPlus size={18} />
            Add Attendance
          </button>
        </div>

        {/* TABLE  */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* TABLE HEAD */}
              <thead className="bg-gray-800">
                <tr className="text-center text-sm text-white">
                  <th className="px-6 py-4">No</th>

                  <th className="px-6 py-4">Student</th>

                  <th className="px-6 py-4">ID</th>

                  <th className="px-6 py-4">Present</th>

                  <th className="px-6 py-4">Attendance</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {students.map((student, index) => {
                  const total = student.present + student.absent;

                  const percentage =
                    total > 0 ? Math.round((student.present / total) * 100) : 0;

                  return (
                    <tr>
                      {/* NUMBER */}
                      <td className="px-6 py-4 text-gray-500">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      {/* STUDENT */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">
                          {student.name}
                        </p>
                      </td>

                      {/* ID */}
                      <td className="px-6 py-4 text-gray-500">
                        {student.studentId}
                      </td>

                      {/* PRESENT */}
                      <td className="px-6 py-4">
                        <span className="text-gray-500 font-medium">
                          {student.present}
                        </span>
                      </td>

                      {/* ATTENDANCE */}
                      <td className="px-6 py-4">
                        <span className="text-gray-500 font-medium">
                          {percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL  */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-left font-semibold text-gray-800">
                    Add Attendance
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Add a new student attendance
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* NAME */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-600 mb-1">
                    Student Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                  />
                </div>

                {/* STUDENT ID */}
                <div>
                  <label className="block text-sm text-left font-medium text-gray-600 mb-1">
                    Student ID
                  </label>

                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Enter student ID"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                  />
                </div>

                {/* PRESENT / ABSENT */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-left font-medium text-gray-600 mb-1">
                      Present Days
                    </label>

                    <input
                      type="number"
                      name="present"
                      min="0"
                      value={formData.present}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-left font-medium text-gray-600 mb-1">
                      Absent Days
                    </label>

                    <input
                      type="number"
                      name="absent"
                      min="0"
                      value={formData.absent}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceDetails;
