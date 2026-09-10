import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaPlus,
  FaBed,
  FaBook,
  FaDoorOpen,
  FaShieldAlt,
  FaEdit,
  FaTrash,
  FaTimes,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

const HostelRules = () => {
  // -----------------------------
  // Default Rules
  // -----------------------------
  const defaultRules = [
    {
      id: 1,
      title: "Room & Bed Rules",
      description:
        "Students must keep their rooms clean and organized at all times.",
      priority: "High",
      status: "Active",
      category: "Rooms",
      icon: "bed",
    },
    {
      id: 2,
      title: "Study Time",
      description:
        "Students must maintain silence during study hours from 7:00 PM to 9:00 PM.",
      priority: "Important",
      status: "Active",
      category: "Study",
      icon: "book",
    },
    {
      id: 3,
      title: "Visitors",
      description:
        "Visitors are allowed only during the approved hostel visiting hours.",
      priority: "Normal",
      status: "Active",
      category: "Visitors",
      icon: "door",
    },
    {
      id: 4,
      title: "Safety & Security",
      description:
        "Students must report any safety, maintenance, or security issue to the hostel warden.",
      priority: "High",
      status: "Active",
      category: "Safety",
      icon: "shield",
    },
  ];

  const [rules, setRules] = useState(() => {
    const savedRules = localStorage.getItem("hostelRules");

    if (savedRules) {
      return JSON.parse(savedRules);
    }

    return defaultRules;
  });

  const [showModal, setShowModal] = useState(false);

  const [editingRule, setEditingRule] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Normal",
    status: "Active",
    category: "General",
    icon: "shield",
  });

  useEffect(() => {
    localStorage.setItem("hostelRules", JSON.stringify(rules));
  }, [rules]);

  const handleAddRule = () => {
    setEditingRule(null);

    setFormData({
      title: "",
      description: "",
      priority: "Normal",
      status: "Active",
      category: "General",
      icon: "shield",
    });

    setShowModal(true);
  };

  const handleDeleteRule = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hostel rule?",
    );

    if (!confirmDelete) return;

    setRules((prevRules) => prevRules.filter((rule) => rule.id !== id));
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .required("Rule title is required")
      .min(3, "Rule title must be at least 3 characters")
      .test(
        "unique-title",
        "This rule already exists. Please use a different rule title.",
        function (value) {
          if (!value) return true;

          const currentTitle = value.trim().toLowerCase();

          const duplicateRule = rules.some((rule) => {
            // While editing, ignore the current rule itself
            if (editingRule && rule.id === editingRule.id) {
              return false;
            }

            return rule.title.trim().toLowerCase() === currentTitle;
          });

          return !duplicateRule;
        },
      ),

    description: Yup.string()
      .trim()
      .required("Rule description is required")
      .min(10, "Description must be at least 10 characters"),

    category: Yup.string().required("Please select a category"),

    priority: Yup.string().required("Please select priority"),

    status: Yup.string().required("Please select status"),

    icon: Yup.string().required("Please select an icon"),
  });

  const formik = useFormik({
    initialValues: formData,

    enableReinitialize: true,

    validationSchema,

    onSubmit: (values) => {
      if (editingRule) {
        // Update existing rule
        setRules((prevRules) =>
          prevRules.map((rule) =>
            rule.id === editingRule.id
              ? {
                  ...rule,
                  ...values,
                }
              : rule,
          ),
        );
      } else {
        // Add new rule
        const newRule = {
          id: Date.now(),
          ...values,
        };

        setRules((prevRules) => [...prevRules, newRule]);
      }

      setShowModal(false);
    },
  });

  // -----------------------------
  // Get Rule Icon
  // -----------------------------
  const getRuleIcon = (icon) => {
    switch (icon) {
      case "bed":
        return <FaBed />;

      case "book":
        return <FaBook />;

      case "door":
        return <FaDoorOpen />;

      case "shield":
        return <FaShieldAlt />;

      default:
        return <FaShieldAlt />;
    }
  };

  // -----------------------------
  // Priority Style
  // -----------------------------
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-600";

      case "Important":
        return "bg-orange-50 text-orange-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // -----------------------------
  // Status Style
  // -----------------------------
  const getStatusStyle = (status) => {
    return status === "Active"
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-500";
  };

  // -----------------------------
  // Summary Numbers
  // -----------------------------
  const totalRules = rules.length;

  const activeRules = rules.filter((rule) => rule.status === "Active").length;

  const roomRules = rules.filter((rule) => rule.category === "Rooms").length;

  const importantRules = rules.filter(
    (rule) => rule.priority === "Important" || rule.priority === "High",
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-6 ">
      <div className="max-w-7xl mx-auto">
        {/* =========================================
          Header
      ========================================== */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-7">
          <div>
            <h1 className="text-2xl text-left md:text-3xl font-semibold text-gray-900">
              Hostel Rules
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage hostel policies and student guidelines
            </p>
          </div>

          <button
            onClick={handleAddRule}
            className="flex items-center cursor-pointer justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm transition"
          >
            <FaPlus size={14} />
            Add Rule
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total */}
          <div className="bg-purple-50 rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-500">Total Rules</p>

                <h2 className="text-2xl text-left font-bold text-gray-900 mt-2">
                  {totalRules}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FaBook />
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="bg-green-50 rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-500">Active</p>

                <h2 className="text-2xl font-bold text-left text-gray-900 mt-2">
                  {activeRules}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <FaCheckCircle />
              </div>
            </div>
          </div>

          {/* Rooms */}
          <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-500">Rooms</p>

                <h2 className="text-2xl text-left font-bold text-gray-900 mt-2">
                  {roomRules}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FaBed />
              </div>
            </div>
          </div>

          {/* Important */}
          <div className="bg-red-50 rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-500">Important</p>

                <h2 className="text-2xl text-left font-bold text-gray-900 mt-2">
                  {importantRules}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <FaExclamationCircle />
              </div>
            </div>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex flex-col gap-6">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                      {getRuleIcon(rule.icon)}
                    </div>

                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        {rule.title}
                      </h3>

                      <p className="text-xs text-left text-gray-400 mt-1">
                        {rule.category}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyle(
                      rule.status,
                    )}`}
                  >
                    {rule.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 text-left  leading-6">
                  {rule.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${getPriorityStyle(
                      rule.priority,
                    )}`}
                  >
                    {rule.priority}
                  </span>

                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${getStatusStyle(
                      rule.status,
                    )}`}
                  >
                    {rule.status}
                  </span>
                </div>

                {/*  Buttons */}
                <button
                  onClick={() => handleDeleteRule(rule.id)}
                  className="w-9 h-9 rounded-lg  text-center text-red-500 cursor-pointer transition"
                  title="Delete"
                >
                  <FaTrash size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingRule ? "Edit Rule" : "Add Hostel Rule"}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    {editingRule
                      ? "Update hostel rule information"
                      : "Create a new hostel rule"}
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
              <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Rule Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter rule title"
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 ${
                      formik.touched.title && formik.errors.title
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />

                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Rule Description
                  </label>

                  <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows="4"
                    placeholder="Enter rule description"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  {formik.touched.description && formik.errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.description}
                    </p>
                  )}
                </div>

                {/* Category + Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-left text-sm font-medium  text-gray-700 mb-2">
                      Category
                    </label>

                    <select
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                    >
                      <option value="General">General</option>
                      <option value="Rooms">Rooms</option>
                      <option value="Study">Study</option>
                      <option value="Visitors">Visitors</option>
                      <option value="Safety">Safety</option>
                      <option value="Food">Food</option>
                      <option value="Discipline">Discipline</option>
                    </select>

                    {formik.touched.category && formik.errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-left  font-medium text-gray-700 mb-2">
                      Priority
                    </label>

                    <select
                      name="priority"
                      value={formik.values.priority}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Important">Important</option>
                      <option value="High">High</option>
                    </select>

                    {formik.touched.priority && formik.errors.priority && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.priority}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status + Icon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>

                    <select
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                    {formik.touched.status && formik.errors.status && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.status}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                      Icon
                    </label>

                    <select
                      name="icon"
                      value={formik.values.icon}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                    >
                      <option value="bed">Bed</option>
                      <option value="book">Book</option>
                      <option value="door">Visitor</option>
                      <option value="shield">Safety</option>
                    </select>

                    {formik.touched.icon && formik.errors.icon && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.icon}
                      </p>
                    )}
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
                    Add Rule
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

export default HostelRules;
