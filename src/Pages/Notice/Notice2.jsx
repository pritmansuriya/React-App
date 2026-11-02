
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaBookOpen,
  FaExclamationCircle,
  FaFutbol,
  FaEye,
  FaArrowLeft,
  FaCheckCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { saveActivity } from "../hooks/useMessages";

const Notice2 = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      category: "",
      title: "",
      description: "",
      audience: "All Students",
      time: "",
      date: "",
    },

    validationSchema: Yup.object({
      category: Yup.string()
        .oneOf(["IMPORTANT", "ACADEMIC", "EVENT", "GENERAL"])
        .required("Please select a category"),

      title: Yup.string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(80, "Title cannot exceed 80 characters")
        .required("Notice title is required"),

      description: Yup.string()
        .trim()
        .min(5, "Description must be at least 5 characters")
        .max(500, "Description cannot exceed 500 characters")
        .required("Description is required"),

      audience: Yup.string()
        .required("Please select an audience"),

      time: Yup.string()
        .required("Please select a time"),

      date: Yup.string()
        .required("Please select a date"),
    }),

    onSubmit: (values, { resetForm }) => {
      try {
        const existingNotices = JSON.parse(
          localStorage.getItem("schoolNotices") || "[]"
        );

        const newNotice = {
          id: Date.now(),
          category: values.category,
          title: values.title.trim(),
          description: values.description.trim(),
          audience: values.audience,
          time: values.time,
          date: new Date(`${values.date}T00:00:00`).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          ),
          createdAt: new Date().toISOString(),
        };

        const updatedNotices = [
          ...existingNotices,
          newNotice,
        ];

        localStorage.setItem(
          "schoolNotices",
          JSON.stringify(updatedNotices)
        );

        saveActivity(
          "Notice published",
          `${values.title} was published for ${values.audience}.`
        );

        resetForm();

        navigate("/dashboard/notice");
      } catch (error) {
        console.error("Notice publishing failed:", error);
        alert("Unable to publish notice. Please try again.");
      }
    },
  });

  const categoryOptions = [
    {
      value: "IMPORTANT",
      label: "Important",
      icon: FaExclamationCircle,
    },
    {
      value: "ACADEMIC",
      label: "Academic",
      icon: FaBookOpen,
    },
    {
      value: "EVENT",
      label: "Event",
      icon: FaFutbol,
    },
    {
      value: "GENERAL",
      label: "General",
      icon: FaBullhorn,
    },
  ];

  const selectedCategory = categoryOptions.find(
    (item) => item.value === formik.values.category
  );

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-4 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-gray-200 focus:border-purple-500 focus:ring-purple-100"
    }`;

  const errorMessage = (field) =>
    formik.touched[field] && formik.errors[field] ? (
      <p className="mt-1.5 text-xs font-medium text-red-500">
        {formik.errors[field]}
      </p>
    ) : null;

  const getCategoryStyle = () => {
    switch (formik.values.category) {
      case "IMPORTANT":
        return "bg-red-50 text-red-600";
      case "ACADEMIC":
        return "bg-purple-50 text-purple-600";
      case "EVENT":
        return "bg-green-50 text-green-600";
      default:
        return "bg-blue-50 text-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FC] px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/notice")}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-purple-600"
        >
          <FaArrowLeft />
          Back to Notice Board
        </button>

        {/* Page Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <FaBullhorn className="text-xl text-purple-600" />
              </div>

              <div>
                <h1 className="text-2xl text-left font-bold text-gray-800 sm:text-3xl">
                  Create New Notice
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Create and publish school announcements.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <FaCheckCircle />
            School Notice Board
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          {/* Notice Form */}
          <div className="lg:col-span-2">

            <form
              onSubmit={formik.handleSubmit}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7"
            >

              {/* Form Header */}
              <div className="mb-7 flex items-center gap-3 border-b border-gray-100 pb-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                  <FaBullhorn className="text-lg text-purple-600" />
                </div>

                <div className="text-left">
                  <h2 className="font-bold text-gray-800">
                    Notice Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Fill in the details below
                  </p>
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Notice Category <span className="text-red-500">*</span>
                </label>

                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass("category")}
                >
                  <option value="">Select notice category</option>

                  {categoryOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                {errorMessage("category")}
              </div>

              {/* Title */}
              <div className="mb-6">

                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">
                    Notice Title <span className="text-red-500">*</span>
                  </label>

                  <span className="text-xs text-gray-400">
                    {formik.values.title.length}/80
                  </span>
                </div>

                <input
                  type="text"
                  name="title"
                  maxLength={80}
                  placeholder="e.g. Parent-Teacher Meeting"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass("title")}
                />

                {errorMessage("title")}
              </div>

              {/* Description */}
              <div className="mb-6">

                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>

                  <span className="text-xs text-gray-400">
                    {formik.values.description.length}/500
                  </span>
                </div>

                <textarea
                  name="description"
                  rows={5}
                  maxLength={500}
                  placeholder="Write complete notice details here..."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputClass("description")} resize-none`}
                />

                {errorMessage("description")}
              </div>

              {/* Audience */}
              <div className="mb-6">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Target Audience <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    name="audience"
                    value={formik.values.audience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputClass("audience")} pl-11`}
                  >
                    <option value="All Students">All Students</option>
                    <option value="Students">Students</option>
                    <option value="Parents">Parents</option>
                    <option value="Teachers">Teachers</option>
                    <option value="All Staff">All Staff</option>
                    <option value="Everyone">Everyone</option>
                  </select>
                </div>

                {errorMessage("audience")}
              </div>

              {/* Date and Time */}
              <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Notice Date <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="date"
                      name="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass("date")} pl-11`}
                    />
                  </div>

                  {errorMessage("date")}
                </div>

                {/* Time */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Notice Time <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="time"
                      name="time"
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass("time")} pl-11`}
                    />
                  </div>

                  {errorMessage("time")}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">

                <button
                  type="button"
                  onClick={() => navigate("/dashboard/notice")}
                  className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaPaperPlane />
                  Publish Notice
                </button>

              </div>
            </form>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-6">

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <FaEye className="text-blue-600" />
                </div>

                <div className="text-left">
                  <h3 className="font-bold text-gray-800">
                    Live Preview
                  </h3>

                  <p className="text-xs text-gray-500">
                    Preview your notice
                  </p>
                </div>
              </div>

              <div className="p-5">

                <div className="mb-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${getCategoryStyle()}`}
                  >
                    {formik.values.category || "NOTICE CATEGORY"}
                  </span>
                </div>

                <h3 className="break-words text-lg font-bold text-gray-800">
                  {formik.values.title || "Your notice title will appear here"}
                </h3>

                <p className="mt-3 break-words text-sm leading-6 text-gray-500">
                  {formik.values.description ||
                    "Your notice description will appear here when you start typing."}
                </p>

                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaUsers className="text-purple-500" />
                    {formik.values.audience}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaCalendarAlt className="text-purple-500" />
                    {formik.values.date || "Notice date"}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaClock className="text-purple-500" />
                    {formik.values.time || "Notice time"}
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-purple-50 p-3 text-xs leading-5 text-purple-700">
                  This is a preview of how your notice information will appear on the Notice Board.
                </div>
              </div>
            </div>

            {/* Helpful Tips */}
            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="mb-3 text-left text-sm font-bold text-blue-800">
                Notice Writing Tips
              </h3>

              <ul className="space-y-2 text-left text-xs leading-5 text-blue-700">
                <li>• Use a clear and meaningful title.</li>
                <li>• Keep your description short and informative.</li>
                <li>• Select the correct audience.</li>
                <li>• Double-check the date and time before publishing.</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice2;
