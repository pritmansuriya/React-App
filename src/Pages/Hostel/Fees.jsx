import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTimes,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaUsers,
} from "react-icons/fa";

const Fee = () => {
  // --------------------------------
  // Default Fee Data
  // --------------------------------
  const defaultFees = [
    {
      id: 1,
      student: "Evelyn Harper",
      studentId: "ST001",
      className: "8-A",
      room: "A102",
      fee: 5000,
      paid: 5000,
      dueDate: "2026-08-30",
    },
    {
      id: 2,
      student: "Diana Plenty",
      studentId: "ST002",
      className: "8-A",
      room: "A103",
      fee: 5000,
      paid: 3000,
      dueDate: "2026-08-30",
    },
    {
      id: 3,
      student: "John Millar",
      studentId: "ST003",
      className: "8-B",
      room: "B201",
      fee: 5000,
      paid: 0,
      dueDate: "2026-08-30",
    },
  ];

  // --------------------------------
  // Load data from localStorage
  // --------------------------------
  const [fees, setFees] = useState(() => {
    const savedFees = localStorage.getItem("hostelFees");

    return savedFees 
    ? JSON.parse(savedFees) 
    : defaultFees;
  });

  const [showModal, setShowModal] = useState(false);

  // null = Add
  // object = Edit
  const [editingFee, setEditingFee] = useState(null);

  // --------------------------------
  // Form Data
  // --------------------------------
  const [formData, setFormData] = useState({
    student: "",
    studentId: "",
    className: "",
    room: "",
    fee: "",
    paid: "",
    dueDate: "",
  });

  
  useEffect(() => {
    localStorage.setItem("hostelFees", JSON.stringify(fees));
  }, [fees]);

  // --------------------------------
  // Add Fee
  // --------------------------------
  const handleAddFee = () => {
    setEditingFee(null);

    setFormData({
      student: "",
      studentId: "",
      className: "",
      room: "",
      fee: "",
      paid: "",
      dueDate: "",
    });

    setShowModal(true);
  };

  // --------------------------------
  // Edit Fee
  // --------------------------------
  const handleEditFee = (fee) => {
    setEditingFee(fee);

    setFormData({
      student: fee.student,
      studentId: fee.studentId,
      className: fee.className,
      room: fee.room,
      fee: fee.fee,
      paid: fee.paid,
      dueDate: fee.dueDate,
    });

    setShowModal(true);
  };

  // --------------------------------
  // Input Change
  // --------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------
  // Submit Add / Edit
  // --------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.student ||
      !formData.className ||
      !formData.room ||
      !formData.fee
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const feeData = {
      student: formData.student,
      studentId: formData.studentId,
      className: formData.className,
      room: formData.room,
      fee: Number(formData.fee),
      paid: Number(formData.paid) || 0,
      dueDate: formData.dueDate,
    };

    // Edit existing fee
    if (editingFee) {
      setFees((prevFees) =>
        prevFees.map((fee) =>
          fee.id === editingFee.id
            ? {
                ...fee,
                ...feeData,
              }
            : fee
        )
      );
    }

    // Add new fee
    else {
      const newFee = {
        id: Date.now(),
        ...feeData,
      };

      setFees((prevFees) => [...prevFees, newFee]);
    }

    setShowModal(false);
    setEditingFee(null);
  };

  // --------------------------------
  // Get Status
  // --------------------------------
  const getStatus = (fee, paid) => {
    if (paid >= fee) {
      return "Paid";
    }

    if (paid > 0) {
      return "Partial";
    }

    return "Pending";
  };

  // --------------------------------
  // Status Style
  // --------------------------------
  const getStatusStyle = (status) => {
    if (status === "Paid") {
      return "bg-green-50 text-green-600";
    }

    if (status === "Partial") {
      return "bg-orange-50 text-orange-600";
    }

    return "bg-red-50 text-red-600";
  };

  // --------------------------------
  // Summary Calculations
  // --------------------------------

  // Total fee amount
  const totalFees = fees.reduce(
    (total, item) => total + Number(item.fee),
    0
  );

  // Total paid amount
  const paidAmount = fees.reduce(
    (total, item) => total + Number(item.paid),
    0
  );

  // Total pending amount
  const pendingAmount = totalFees - paidAmount;

  // Total students
  const totalStudents = fees.length;

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-6 md:p-8">

      <div className="max-w-7xl mx-auto">
      {/* =====================================
          Header
      ====================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

        <div>
          <h1 className="text-3xl text-left  font-semibold text-gray-900">
            Hostel Fee
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage hostel fees and student payments
          </p>
        </div>

        <button
          onClick={handleAddFee}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <FaPlus size={13} />
          Add Fee
        </button>

      </div>

      {/* =====================================
          Summary Cards
      ====================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Total Fees */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-lg text-left text-gray-500">
                Total Fees
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                ₹{totalFees.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FaMoneyBillWave />
            </div>

          </div>
        </div>

        {/* Paid */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-lg text-left text-gray-500">
                Paid
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                ₹{paidAmount.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <FaCheckCircle />
            </div>

          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-lg text-left text-gray-500">
                Pending
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                ₹{pendingAmount.toLocaleString("en-IN")}  
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <FaClock />
            </div>

          </div>
        </div>

        {/* Students */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-lg text-gray-500">
                Students
              </p>

              <h2 className="text-2xl text-left font-bold text-gray-900 mt-2">
                {totalStudents}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FaUsers />
            </div>

          </div>
        </div>

      </div>

      {/* =====================================
          Fee Records
      ====================================== */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl text-left font-semibold text-gray-900">
            Hostel Fee Records
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>
              <tr className="bg-gray-50 text-left">

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  No
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Student
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Class
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Room
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Fee
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>

                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Due date
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {fees.map((item, index) => {

                const status = getStatus(
                  item.fee,
                  item.paid
                );

                return (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* Number */}
                    <td className="px-6 text-left py-4 text-sm text-gray-500">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    {/* Student */}
                    <td className="px-6 text-left py-4">

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.student}
                        </p>
{/* 
                        <p className="text-xs text-gray-400 mt-1">
                          {item.studentId}
                        </p> */}
                      </div>

                    </td>

                    {/* Class */}
                    <td className="px-6 text-left py-4 text-sm text-gray-600">
                      {item.className}
                    </td>

                    {/* Room */}
                    <td className="px-6 py-4 text-left text-sm text-gray-600">
                      {item.room}
                    </td>

                    {/* Fee */}
                    <td className="px-6 text-left py-4">

                      <p className="text-sm font-medium text-gray-900">
                        ₹{Number(item.fee).toLocaleString("en-IN")}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Paid: ₹{Number(item.paid).toLocaleString("en-IN")}
                      </p>

                    </td>

                    {/* Status */}
                    <td className="px-6 text-left py-4">

                      <span
                        className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(
                          status
                        )}`}
                      >
                        {status}
                      </span>

                    </td>

                    {/* Due date */}
                     <td className="px-6 py-4 text-left text-sm text-gray-600">
                      {item.dueDate}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">

                      <div className="flex justify-center">

                        <button
                          onClick={() => handleEditFee(item)}
                          className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"
                          title="Edit Fee"
                        >
                          <FaEdit size={13} />
                        </button>

                      </div>    

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        

      </div>

      {/* =====================================
          Add / Edit Modal
      ====================================== */}
      {showModal && (

        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

              <div>
                <h2 className="text-xl text-left font-semibold text-gray-900">
                  {editingFee ? "Edit Hostel Fee" : "Add Hostel Fee"}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  {editingFee
                    ? "Update student fee information"  
                    : "Add a new hostel fee record"}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center"
              >
                <FaTimes />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* Student */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name
                </label>

                <input
                  type="text"
                  name="student"
                  value={formData.student}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID
                </label>

                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Example: ST004"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Class + Room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>

                  <input
                    type="text"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    placeholder="Example: 8-A"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room
                  </label>

                  <input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    placeholder="Example: A104"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              {/* Fee + Paid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Fee
                  </label>

                  <input
                    type="text"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    placeholder="Example: 5000"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paid Amount
                  </label>

                  <input
                    type="text"
                    name="paid"
                    value={formData.paid}
                    onChange={handleChange}
                    placeholder="Example: 3000"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Remaining */}
              <div className="bg-gray-50 rounded-xl px-4 py-3">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Remaining Amount
                  </span>

                  <span className="text-lg font-semibold text-gray-900">
                    ₹
                    {Math.max(
                      0,
                      Number(formData.fee || 0) -
                        Number(formData.paid || 0)
                    ).toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>

                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  {editingFee ? "Update Fee" : "Add Fee"}
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

export default Fee;