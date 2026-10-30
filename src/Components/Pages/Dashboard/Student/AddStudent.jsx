import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaUsers,
  FaUserGraduate,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaDownload,
  FaTimes,
  FaBook,
  FaCheckCircle,
  FaExclamationCircle,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaSortAlphaDown,
  FaGraduationCap,
} from "react-icons/fa";

import { useStudents } from "../../../../Pages/hooks/useStudent";
import { saveActivity } from "../../../../Pages/hooks/useMessages";

const AddStudent = () => {
  const { students = [], addStudent, deleteStudent } = useStudents();

  // UI states
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [toast, setToast] = useState(null);

  // Toast notification
  const showMessage = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [toast]);

  // Unique classes
  const classes = useMemo(() => {
    return [
      ...new Set(
        students
          .map((student) => student.class)
          .filter(Boolean)
      ),
    ].sort((a, b) =>
      String(a).localeCompare(String(b), undefined, {
        numeric: true,
      })
    );
  }, [students]);

  // Form validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Student name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Name can only contain letters and spaces"
      ),

    class: Yup.string()
      .trim()
      .required("Class is required")
      .max(10, "Class cannot exceed 10 characters"),

    rollNo: Yup.string()
      .trim()
      .required("Roll number is required")
      .matches(
        /^[0-9]{1,10}$/,
        "Roll number must contain 1 to 10 digits"
      )
      .test(
        "unique-roll-number",
        "This roll number already exists",
        function (value) {
          if (!value) return true;

          const selectedClass = this.parent.class
            ?.trim()
            .toLowerCase();

          return !students.some(
            (student) =>
              String(student.rollNo).trim() === value.trim() &&
              String(student.class).trim().toLowerCase() ===
                selectedClass
          );
        }
      ),

    mobileNo: Yup.string()
      .required("Mobile number is required")
      .matches(
        /^[0-9]{10}$/,
        "Mobile number must be exactly 10 digits"
      ),

    birthDate: Yup.date()
      .typeError("Please enter a valid birth date")
      .required("Birth date is required")
      .min(
        new Date("1900-01-01"),
        "Birth date must be after 1900"
      )
      .max(new Date(), "Birth date cannot be in the future"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      class: "",
      rollNo: "",
      mobileNo: "",
      birthDate: "",
    },

    validationSchema,

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const student = {
          name: values.name.trim(),
          class: values.class.trim(),
          rollNo: values.rollNo.trim(),
          mobileNo: values.mobileNo.trim(),
          birthDate: values.birthDate,
        };

        const result = addStudent(student);

        if (result === false) {
          showMessage("Unable to add student.", "error");
          return;
        }

        saveActivity(
          "Student added",
          `${student.name} was added to class ${student.class}.`
        );

        resetForm();
        setShowForm(false);
        setCurrentPage(1);

        showMessage("Student added successfully!");
      } catch (error) {
        console.error("Error adding student:", error);
        showMessage("Something went wrong while adding student.", "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Date formatting
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(
      `${String(dateString).slice(0, 10)}T00:00:00`
    );

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Search, filter and sort
  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return students
      .filter((student) => {
        const matchesSearch = [
          student.name,
          student.class,
          student.rollNo,
          student.mobileNo,
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(query)
        );

        const matchesClass =
          classFilter === "All" ||
          String(student.class) === String(classFilter);

        return matchesSearch && matchesClass;
      })
      .sort((a, b) => {
        const comparison = String(a.name ?? "").localeCompare(
          String(b.name ?? "")
        );

        return sortOrder === "az" ? comparison : -comparison;
      });
  }, [students, searchTerm, classFilter, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  useEffect(() => {
    setCurrentPage((page) => {
      if (totalPages === 0) return 1;
      return Math.min(page, totalPages);
    });
  }, [totalPages]);

  const startIndex = (currentPage - 1) * studentsPerPage;

  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const endIndex = Math.min(
    startIndex + studentsPerPage,
    filteredStudents.length
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsChange = (event) => {
    setStudentsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setClassFilter("All");
    setSortOrder("az");
    setCurrentPage(1);
  };

  // Delete student
  const handleDelete = (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) return;

    try {
      const result = deleteStudent(student.id);

      if (result === false) {
        showMessage("Unable to delete student.", "error");
        return;
      }

      saveActivity(
        "Student deleted",
        `${student.name} was removed from class ${student.class}.`
      );

      showMessage("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      showMessage("Unable to delete student.", "error");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (filteredStudents.length === 0) {
      showMessage("No student records available to export.", "error");
      return;
    }

    const headers = [
      "Index No",
      "Student Name",
      "Class",
      "Roll Number",
      "Mobile Number",
      "Birth Date",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filteredStudents.map((student, index) => [
      index + 1,
      student.name,
      student.class,
      student.rollNo,
      student.mobileNo,
      formatDate(student.birthDate),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "school-students.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showMessage("Student records exported successfully!");
  };

  // Input styles
  const fieldClass = (field) =>
    `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
    }`;

  // Summary cards
  const totalStudents = students.length;
  const totalClasses = classes.length;

  return (
    <div className="min-h-screen bg-[#EAF1FF] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Toast */}
        {toast && (
          <div
            role={toast.type === "error" ? "alert" : "status"}
            className={`fixed right-4 top-4 z-[70] flex max-w-sm items-center gap-3 rounded-xl px-4 py-3 text-white shadow-lg ${
              toast.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {toast.type === "error" ? (
              <FaExclamationCircle />
            ) : (
              <FaCheckCircle />
            )}

            <span className="text-sm font-medium">
              {toast.message}
            </span>

            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Close notification"
              className="ml-2"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <FaGraduationCap />
              Student Management
            </p>

            <h1 className="text-2xl text-left font-bold text-gray-800 sm:text-3xl">
              Add Student
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and organize your school student records.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              disabled={filteredStudents.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaDownload />
              Export CSV
            </button>

            <button
              type="button"
              onClick={() => {
                if (showForm) {
                  setShowForm(false);
                  formik.resetForm();
                } else {
                  formik.resetForm();
                  setShowForm(true);
                }
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              {showForm ? <FaTimes /> : <FaPlus />}
              {showForm ? "Close Form" : "Add New Student"}
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SummaryCard
            icon={<FaUsers />}
            value={totalStudents}
            label="Total Students"
            description="Registered students"
            iconClass="bg-blue-100 text-blue-600"
          />

          <SummaryCard
            icon={<FaBook />}
            value={totalClasses}
            label="Total Classes"
            description="Classes with students"
            iconClass="bg-purple-100 text-purple-600"
          />
        </div>

        {/* Add Student Form */}
        {showForm && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Student Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter the student's details below.
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
                New Student
              </span>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              noValidate
              className="p-5 sm:p-6"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {/* Name */}
                <FormField
                  label="Student Name"
                  name="name"
                  required
                  error={formik.touched.name && formik.errors.name}
                >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter student name"
                    className={fieldClass("name")}
                  />
                </FormField>

                {/* Class */}
                <FormField
                  label="Class"
                  name="class"
                  required
                  error={formik.touched.class && formik.errors.class}
                >
                  <input
                    id="class"
                    name="class"
                    type="text"
                    value={formik.values.class}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g. 10-A"
                    className={fieldClass("class")}
                  />
                </FormField>

                {/* Roll No */}
                <FormField
                  label="Roll Number"
                  name="rollNo"
                  required
                  error={formik.touched.rollNo && formik.errors.rollNo}
                >
                  <input
                    id="rollNo"
                    name="rollNo"
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={formik.values.rollNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter roll number"
                    className={fieldClass("rollNo")}
                  />
                </FormField>

                {/* Mobile */}
                <FormField
                  label="Mobile Number"
                  name="mobileNo"
                  required
                  error={
                    formik.touched.mobileNo && formik.errors.mobileNo
                  }
                >
                  <input
                    id="mobileNo"
                    name="mobileNo"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={formik.values.mobileNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="10-digit mobile number"
                    className={fieldClass("mobileNo")}
                  />
                </FormField>

                {/* Birth Date */}
                <FormField
                  label="Birth Date"
                  name="birthDate"
                  required
                  error={
                    formik.touched.birthDate && formik.errors.birthDate
                  }
                >
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    min="1900-01-01"
                    max={new Date().toISOString().slice(0, 10)}
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={fieldClass("birthDate")}
                  />
                </FormField>
              </div>

              {/* Form Buttons */}
              <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setShowForm(false);
                  }}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaCheckCircle />
                  {formik.isSubmitting ? "Saving..." : "Save Student"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Student Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaUserGraduate size={20} />
              </div>

              <div>
                <h2 className="text-lg text-left font-bold text-gray-800">
                  Student Records
                </h2>

                <p className="text-sm text-gray-500">
                  Showing {filteredStudents.length} of {totalStudents} students
                </p>
              </div>
            </div>

            <span className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              {totalStudents} Students
            </span>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search students..."
                aria-label="Search students"
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                value={classFilter}
                onChange={(event) => {
                  setClassFilter(event.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by class"
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="All">All Classes</option>

                {classes.map((className) => (
                  <option key={className} value={className}>
                    Class {className}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <FaSortAlphaDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                aria-label="Sort students"
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="az">Name: A to Z</option>
                <option value="za">Name: Z to A</option>
              </select>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              disabled={
                !searchTerm &&
                classFilter === "All" &&
                sortOrder === "az"
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaTimes />
              Reset Filters
            </button>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr>
                  {[
                    "Index No",
                    "Student Name",
                    "Class",
                    "Roll No",
                    "Mobile No",
                    "Birth Date",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <tr
                      key={student.id ?? student.rollNo ?? index}
                      className="transition hover:bg-blue-50/50"
                    >
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {startIndex + index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold uppercase text-blue-700">
                            {String(student.name || "S")
                              .trim()
                              .charAt(0)}
                          </div>

                          <span className="text-sm font-semibold text-gray-800">
                            {student.name || "-"}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
                          Class {student.class || "-"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {student.rollNo || "-"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {student.mobileNo || "-"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {formatDate(student.birthDate)}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleDelete(student)}
                          aria-label={`Delete ${student.name}`}
                          title="Delete student"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-400">
                        <FaSearch size={22} />
                      </div>

                      <h3 className="mt-4 font-semibold text-gray-800">
                        No students found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Try another search or change your filters.
                      </p>

                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 sm:justify-start">
                <span>
                  Showing{" "}
                  <strong className="text-gray-800">
                    {startIndex + 1}-{endIndex}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-gray-800">
                    {filteredStudents.length}
                  </strong>
                </span>

                <div className="flex items-center gap-2">
                  <label htmlFor="studentsPerPage">Rows:</label>

                  <select
                    id="studentsPerPage"
                    value={studentsPerPage}
                    onChange={handleRowsChange}
                    className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1">

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronLeft size={11} />
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
                    aria-current={
                      currentPage === page ? "page" : undefined
                    }
                    className={`h-9 min-w-9 rounded-lg border px-3 text-sm font-semibold transition ${
                      currentPage === page
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-200 text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <FaChevronRight size={11} />
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Student Management Dashboard · {totalStudents} registered students
        </p>
      </div>
    </div>
  );
};

// Reusable Form Field
const FormField = ({ label, name, required, error, children }) => (
  <div className="min-w-0">
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    {children}

    {error && (
      <p className="mt-1.5 text-xs text-red-500">
        {error}
      </p>
    )}
  </div>
);

// Reusable Summary Card
const SummaryCard = ({
  icon,
  value,
  label,
  description,
  iconClass,
}) => (
  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${iconClass}`}
    >
      {icon}
    </div>

    <div className="min-w-0 text-left">
      <p className="text-2xl font-bold text-gray-800">
        {value}
      </p>

      <p className="text-sm font-semibold text-gray-700">
        {label}
      </p>

      <p className="mt-0.5 text-xs text-gray-400">
        {description}
      </p>
    </div>
  </div>
);

export default AddStudent;