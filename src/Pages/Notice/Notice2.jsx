import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaBullhorn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
        .required("Category is required"),

      title: Yup.string()
        .required("Notice title is required")
        .min(3, "Title must be at least 3 characters"),

      description: Yup.string()
        .required("Description is required")
        .min(5, "Description must be at least 5 characters"),

      audience: Yup.string()
        .required("Audience is required"),

      time: Yup.string()
        .required("Time is required"),

      date: Yup.string()
        .required("Date is required"),
    }),

    onSubmit: (values, { resetForm }) => {

      // Get existing notices
      const existingNotices =
        JSON.parse(localStorage.getItem("schoolNotices")) || [];

      // Create new notice
      const newNotice = {
        id: Date.now(),
        category: values.category,
        title: values.title,
        description: values.description,
        audience: values.audience,
        time: values.time,
        date: values.date,
      };

      // Add new notice AFTER existing notices
      const updatedNotices = [
        ...existingNotices,
        newNotice,
      ];

      // Save to localStorage
      localStorage.setItem(
        "schoolNotices",
        JSON.stringify(updatedNotices)
      );

      resetForm();

      // Go back to Notice Board
      navigate("/dashboard/notice");
    },
  });

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-6">

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-6 text-left">

          <h1 className="text-3xl font-semibold text-gray-800">
            Add Notice
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Create a new school announcement
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >

          {/* Form Header */}
          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <FaBullhorn className="text-purple-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Notice Information
              </h2>

              <p className="text-sm text-gray-500">
                Enter the notice details
              </p>
            </div>

          </div>

          {/* Category */}
          <div className="mb-5">

            <label className="block text-left text-lg font-medium text-gray-700 mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              placeholder="Enter Category Name"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
            />

            {formik.touched.title &&
              formik.errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.title}
                </p>
              )}

          </div>

          {/* Title */}
          <div className="mb-5">

            <label className="block text-left text-lg font-medium text-gray-700 mb-2">
              Notice Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter notice title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
            />

            {formik.touched.title &&
              formik.errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.title}
                </p>
              )}

          </div>

          {/* Description */}
          <div className="mb-5">

            <label className="block text-left text-lg font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              placeholder="Enter notice description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:border-purple-500"
            />

            {formik.touched.description &&
              formik.errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.description}
                </p>
              )}

          </div>

          {/* Audience + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Audience */}
            <div>

              <label className="block text-left text-lg font-medium text-gray-700 mb-2">
                Audience
              </label>

              <select
                name="audience"
                value={formik.values.audience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
              >
                <option value="All Students">
                  All Students
                </option>

                <option value="Students">
                  Students
                </option>

                <option value="Parents">
                  Parents
                </option>

                <option value="Teachers">
                  Teachers
                </option>
              </select>

            </div>

            {/* Time */}
            <div>

              <label className="block text-left text-lg font-medium text-gray-700 mb-2">
                Time
              </label>

              <input
                type="text"
                name="time"
                placeholder="09:00 AM"
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
              />

              {formik.touched.time &&
                formik.errors.time && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.time}
                  </p>
                )}

            </div>

          </div>

          {/* Date */}
          <div className="mt-5">

            <label className="block text-left text-lg font-medium text-gray-700 mb-2">
              Date
            </label>

            <input
              type="text"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
            />

            {formik.touched.date &&
              formik.errors.date && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.date}
                </p>
              )}

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-gray-100">

            <button
              type="button"
              onClick={() => navigate("/dashboard/notice")}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium"
            >
              Publish Notice
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Notice2;