import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { saveActivity } from "../hooks/useMessages";

import {
  FaBook,
  FaArrowLeft,
  FaImage,
  FaUpload,
  FaTimes,
  FaCheckCircle,
  FaBarcode,
  FaLayerGroup,
  FaBookOpen,
} from "react-icons/fa";

const AddBook = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [coverPreview, setCoverPreview] = useState("");
  const [toast, setToast] = useState("");

  // Get saved books safely
  const getSavedBooks = () => {
    try {
      const savedBooks = localStorage.getItem("schoolBooks");
      return savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
      console.error("Unable to read saved books:", error);
      return [];
    }
  };

  // Categories
  const categories = [
    "Academic",
    "Science",
    "Mathematics",
    "Computer",
    "History",
    "Geography",
    "English",
    "Literature",
    "Fiction",
    "Non-Fiction",
    "General Knowledge",
    "Other",
  ];

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      isbn: "",
      category: "",
      totalCopies: "",
      availableCopies: "",
      issuedCopies: "0",
      status: "Available",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .required("Book title is required"),

      author: Yup.string()
        .trim()
        .required("Author is required"),

      isbn: Yup.string()
        .trim()
        .required("ISBN number is required")
        .matches(
          /^(?:\d{9}[\dXx]|\d{13})$/,
          "Enter a valid 10 or 13 digit ISBN"
        )
        .test(
          "unique-isbn",
          "This ISBN already exists",
          function (value) {
            if (!value) return true;

            const books = getSavedBooks();

            return !books.some(
              (book) =>
                String(book.isbn || "").replace(/[-\s]/g, "").toUpperCase() ===
                value.replace(/[-\s]/g, "").toUpperCase()
            );
          }
        ),

      category: Yup.string()
        .required("Please select a category"),

      totalCopies: Yup.number()
        .typeError("Enter total copies")
        .integer("Copies must be a whole number")
        .required("Total copies are required")
        .min(1, "At least 1 copy is required"),

      availableCopies: Yup.number()
        .typeError("Enter available copies")
        .integer("Copies must be a whole number")
        .required("Available copies are required")
        .min(0, "Available copies cannot be negative")
        .test(
          "valid-available",
          "Available copies cannot exceed total copies",
          function (value) {
            return Number(value) <= Number(this.parent.totalCopies);
          }
        ),

      issuedCopies: Yup.number()
        .typeError("Enter issued copies")
        .integer("Copies must be a whole number")
        .required("Issued copies are required")
        .min(0, "Issued copies cannot be negative")
        .test(
          "valid-issued",
          "Issued copies cannot exceed total copies",
          function (value) {
            return Number(value) + Number(this.parent.availableCopies) ===
              Number(this.parent.totalCopies);
          }
        ),
    }),

    onSubmit: (values, { resetForm }) => {
      try {
        const books = getSavedBooks();

        // Final duplicate ISBN check
        const normalizedISBN = values.isbn.replace(/[-\s]/g, "").toUpperCase();

        const duplicate = books.some(
          (book) =>
            String(book.isbn || "").replace(/[-\s]/g, "").toUpperCase() ===
            normalizedISBN
        );

        if (duplicate) {
          formik.setFieldError("isbn", "This ISBN already exists");
          return;
        }

        const newBook = {
          id: Date.now(),
          title: values.title.trim(),
          author: values.author.trim(),
          isbn: normalizedISBN,
          category: values.category,
          totalCopies: Number(values.totalCopies),
          availableCopies: Number(values.availableCopies),
          issuedCopies: Number(values.issuedCopies),
          copies: Number(values.totalCopies),
          status:
            Number(values.availableCopies) > 0
              ? "Available"
              : "Issued",
          coverImage: coverPreview,
          createdAt: new Date().toISOString(),
        };

        // Save to localStorage
        localStorage.setItem(
          "schoolBooks",
          JSON.stringify([...books, newBook])
        );

        // Save activity
        saveActivity(
          "Book added",
          `${newBook.title} by ${newBook.author} was added to the library.`
        );

        // Reset form
        resetForm();
        setCoverPreview("");

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Success toast
        setToast("Book added successfully!");

        setTimeout(() => {
          navigate("/dashboard/library");
        }, 1500);
      } catch (error) {
        console.error("Error adding book:", error);
        setToast("Unable to add book. Please try again.");
      }
    },
  });

  // Image upload
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToast("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      setToast("Image size must be less than 1 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Remove image
  const removeImage = () => {
    setCoverPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Automatically calculate copies
  const handleTotalCopiesChange = (event) => {
    const total = event.target.value;

    formik.setFieldValue("totalCopies", total);

    if (total !== "" && Number(total) >= 0) {
      const issued = Number(formik.values.issuedCopies || 0);

      formik.setFieldValue(
        "availableCopies",
        Math.max(0, Number(total) - issued).toString()
      );
    }
  };

  const handleIssuedCopiesChange = (event) => {
    const issued = event.target.value;

    formik.setFieldValue("issuedCopies", issued);

    if (
      issued !== "" &&
      formik.values.totalCopies !== "" &&
      Number(issued) >= 0
    ) {
      formik.setFieldValue(
        "availableCopies",
        Math.max(
          0,
          Number(formik.values.totalCopies) - Number(issued)
        ).toString()
      );
    }
  };

  const showError = (field) =>
    formik.touched[field] && formik.errors[field] ? (
      <p className="text-red-500 text-xs mt-1">
        {formik.errors[field]}
      </p>
    ) : null;

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition";

  return (
    <div className="min-h-screen bg-[#EAF1FF] p-4 sm:p-6">

      <div className="max-w-4xl mx-auto">

        {/* TOAST NOTIFICATION */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 bg-white shadow-lg border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl" />
            <p className="text-sm font-medium text-gray-700">
              {toast}
            </p>
            <button
              type="button"
              onClick={() => setToast("")}
              className="text-gray-400 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">

          <button
            type="button"
            onClick={() => navigate("/dashboard/library")}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-gray-100"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-2xl text-left font-semibold text-gray-800">
              Add Book
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Add a new book to the school library
            </p>
          </div>

        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-7">

          <form onSubmit={formik.handleSubmit}>

            {/* BASIC INFORMATION */}
            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <FaBook className="text-purple-600" />
              </div>

              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-800">
                  Basic Information
                </h2>
                <p className="text-xs text-gray-400">
                  Enter the book details
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* BOOK TITLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter book title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />

                {showError("title")}
              </div>

              {/* AUTHOR */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>

                <input
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />

                {showError("author")}
              </div>

              {/* ISBN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISBN Number *
                </label>

                <div className="relative">
                  <FaBarcode className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    name="isbn"
                    placeholder="Enter 10 or 13 digit ISBN"
                    value={formik.values.isbn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputClass} pl-11`}
                  />
                </div>

                {showError("isbn")}
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>

                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {showError("category")}
              </div>

            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-100 my-8" />

            {/* INVENTORY DETAILS */}
            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <FaLayerGroup className="text-blue-600" />
              </div>

              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-800">
                  Inventory Details
                </h2>
                <p className="text-xs text-gray-400">
                  Manage book stock and availability
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              {/* TOTAL COPIES */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Copies *
                </label>

                <input
                  type="number"
                  name="totalCopies"
                  min="1"
                  placeholder="10"
                  value={formik.values.totalCopies}
                  onChange={handleTotalCopiesChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />

                {showError("totalCopies")}
              </div>

              {/* AVAILABLE COPIES */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Copies *
                </label>

                <input
                  type="number"
                  name="availableCopies"
                  min="0"
                  placeholder="10"
                  value={formik.values.availableCopies}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />

                {showError("availableCopies")}
              </div>

              {/* ISSUED COPIES */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issued Copies *
                </label>

                <input
                  type="number"
                  name="issuedCopies"
                  min="0"
                  placeholder="0"
                  value={formik.values.issuedCopies}
                  onChange={handleIssuedCopiesChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />

                {showError("issuedCopies")}
              </div>

            </div>

            {/* STOCK SUMMARY */}
            <div className="grid grid-cols-3 gap-3 mt-5">

              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Total</p>
                <h3 className="text-xl font-semibold text-blue-600">
                  {formik.values.totalCopies || 0}
                </h3>
              </div>

              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Available</p>
                <h3 className="text-xl font-semibold text-green-600">
                  {formik.values.availableCopies || 0}
                </h3>
              </div>

              <div className="bg-orange-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Issued</p>
                <h3 className="text-xl font-semibold text-orange-600">
                  {formik.values.issuedCopies || 0}
                </h3>
              </div>

            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-100 my-8" />

            {/* BOOK COVER */}
            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
                <FaImage className="text-pink-600" />
              </div>

              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-800">
                  Book Cover
                </h2>
                <p className="text-xs text-gray-400">
                  Upload a cover image (maximum 1 MB)
                </p>
              </div>

            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5">

              {coverPreview ? (
                <div className="flex flex-col sm:flex-row items-center gap-5">

                  <img
                    src={coverPreview}
                    alt="Book cover preview"
                    className="w-32 h-40 object-cover rounded-lg shadow-sm"
                  />

                  <div>
                    <p className="font-medium text-gray-700 mb-2">
                      Cover image uploaded
                    </p>

                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-sm text-red-500 hover:text-red-700 flex items-center gap-2"
                    >
                      <FaTimes />
                      Remove Image
                    </button>
                  </div>

                </div>
              ) : (
                <div className="text-center">

                  <FaUpload className="text-3xl text-purple-400 mx-auto mb-3" />

                  <p className="text-sm font-medium text-gray-700">
                    Upload book cover image
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG or WEBP
                  </p>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 px-5 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100"
                  >
                    Choose Image
                  </button>

                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">

              <button
                type="button"
                onClick={() => navigate("/dashboard/library")}
                className="px-5 py-3 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setCoverPreview("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="px-5 py-3 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Reset Form
              </button>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaBookOpen />
                  Add Book
                </span>
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddBook;
