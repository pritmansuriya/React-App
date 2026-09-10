import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaBook, FaArrowLeft } from "react-icons/fa";

const AddBook = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      category: "",
      copies: "",
      status: "Available",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Book title is required"),

      author: Yup.string()
        .required("Author is required"),

      category: Yup.string()
        .required("Category is required"),

      copies: Yup.number()
        .required("Copies are required")
        .min(1, "Copies must be at least 1"),

      status: Yup.string()
        .required("Status is required"),
    }),

    onSubmit: (values) => {
      // Get old books
      const savedBooks = localStorage.getItem("schoolBooks");

      const books = savedBooks
        ? JSON.parse(savedBooks)
        : [];

      // Create new book
      const newBook = {
        id: Date.now(),
        title: values.title,
        author: values.author,
        category: values.category,
        copies: Number(values.copies),
        status: values.status,
      };

      // Add new book
      const updatedBooks = [...books, newBook];

      // Save to localStorage
      localStorage.setItem(
        "schoolBooks",
        JSON.stringify(updatedBooks)
      );

      // Go back to All Books
      navigate("/dashboard/library");
    },
  });

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-6">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">

          <button
            onClick={() => navigate("/dashboard/library")}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-gray-100"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-left text-gray-800">
              Add Book
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Add a new book to the school library
            </p>
          </div>

        </div>


        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <FaBook className="text-purple-600" />
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              Book Information
            </h2>

          </div>


          <form onSubmit={formik.handleSubmit}>

            {/* BOOK TITLE */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter book title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-purple-500"
              />

              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.title}
                </p>
              )}

            </div>


            {/* AUTHOR */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>

              <input
                type="text"
                name="author"
                placeholder="Enter author name"
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-purple-500"
              />

              {formik.touched.author && formik.errors.author && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.author}
                </p>
              )}

            </div>


            {/* CATEGORY */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                placeholder="Example: Academic"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-purple-500"
              />

              {formik.touched.category && formik.errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.category}
                </p>
              )}

            </div>


            {/* COPIES + STATUS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

              {/* COPIES */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Copies
                </label>

                <input
                  type="number"
                  name="copies"
                  min="1"
                  placeholder="10"
                  value={formik.values.copies}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-purple-500"
                />

                {formik.touched.copies && formik.errors.copies && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.copies}
                  </p>
                )}

              </div>


              {/* STATUS */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-purple-500"
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Issued">
                    Issued
                  </option>
                </select>

              </div>

            </div>


            {/* BUTTONS */}
            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() => navigate("/dashboard/library")}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
              >
                Add Book
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddBook;