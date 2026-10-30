import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveActivity } from "../hooks/useMessages";

import {
  FaBook,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSearch,
  FaDownload,
  FaCheckCircle,
  FaExclamationCircle,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";

const defaultSubjects = [
  {
    id: 1,
    name: "Mathematics",
    code: "MAT101",
    teacher: "John Smith",
    classes: "8-A, 8-B",
    students: 62,
    status: "Active",
  },
  {
    id: 2,
    name: "Science",
    code: "SCI101",
    teacher: "Sarah Lee",
    classes: "7-A, 8-A",
    students: 58,
    status: "Active",
  },
  {
    id: 3,
    name: "English",
    code: "ENG101",
    teacher: "David Roy",
    classes: "8-A, 9-A",
    students: 55,
    status: "Active",
  },
  {
    id: 4,
    name: "History",
    code: "HIS101",
    teacher: "Emily Brown",
    classes: "7-B, 8-B",
    students: 48,
    status: "Active",
  },
];

const subjectValidation = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Subject name must be at least 2 characters")
    .required("Subject name is required"),

  code: Yup.string()
    .trim()
    .min(3, "Subject code must be at least 3 characters")
    .required("Subject code is required"),

  teacher: Yup.string()
    .trim()
    .min(2, "Teacher name must be at least 2 characters")
    .required("Teacher name is required"),

  classes: Yup.string().trim().required("Class is required"),

  students: Yup.number()
    .typeError("Students must be a number")
    .integer("Students must be a whole number")
    .min(1, "Students must be at least 1")
    .required("Number of students is required"),

  status: Yup.string()
    .oneOf(["Active", "Inactive"], "Please select a valid status")
    .required("Status is required"),
});

const readSubjects = () => {
  try {
    const savedSubjects = localStorage.getItem("schoolSubjects");

    if (savedSubjects) {
      const parsedSubjects = JSON.parse(savedSubjects);

      if (Array.isArray(parsedSubjects)) {
        return parsedSubjects;
      }
    }
  } catch (error) {
    console.error("Unable to load subjects:", error);
  }

  return defaultSubjects;
};

const SubjectDetails = () => {
  const [subjects, setSubjects] = useState(readSubjects);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("az");

  const [toast, setToast] = useState(null);

  const showMessage = (message, type = "success") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3000);
  };

  const persistSubjects = (updatedSubjects) => {
    try {
      localStorage.setItem("schoolSubjects", JSON.stringify(updatedSubjects));
      
      setSubjects(updatedSubjects);
      return true;
    } catch (error) {
      console.error("Unable to save subjects:", error);
      showMessage("Unable to save subjects. Please try again.", "error");
      return false;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      teacher: "",
      classes: "",
      students: "",
      status: "Active",
    },

    validationSchema: subjectValidation,

    onSubmit: (values) => {
      const normalizedCode = values.code.trim().toLowerCase();

      const duplicateCode = subjects.some(
        (subject) =>
          String(subject.code).trim().toLowerCase() === normalizedCode &&
          subject.id !== selectedSubject?.id,
      );

      if (duplicateCode) {
        formik.setFieldError("code", "This subject code already exists");
        showMessage("Please use a unique subject code.", "error");
        return;
      }

      const cleanedValues = {
        name: values.name.trim(),
        code: values.code.trim().toUpperCase(),
        teacher: values.teacher.trim(),
        classes: values.classes.trim(),
        students: Number(values.students),
        status: values.status,
      };

      if (showEditModal && selectedSubject) {
        const updatedSubjects = subjects.map((subject) =>
          subject.id === selectedSubject.id
            ? { ...subject, ...cleanedValues }
            : subject,
        );

        if (!persistSubjects(updatedSubjects)) return;

        try {
          saveActivity(
            "Subject updated",
            `${cleanedValues.name} was updated in the subject directory.`,
          );
        } catch (error) {
          console.error("Unable to record activity:", error);
        }

        setShowEditModal(false);
        setSelectedSubject(null);
        formik.resetForm();

        showMessage("Subject updated successfully.");
        return;
      }

      const newSubject = {
        id: Date.now(),
        ...cleanedValues,
      };

      const updatedSubjects = [...subjects, newSubject];

      if (!persistSubjects(updatedSubjects)) return;

      try {
        saveActivity(
          "Subject added",
          `${newSubject.name} (${newSubject.code}) was added to the subject directory.`,
        );
      } catch (error) {
        console.error("Unable to record activity:", error);
      }

      setShowAddModal(false);
      formik.resetForm();

      showMessage("Subject added successfully.");
    },
  });

  const handleOpenAdd = () => {
    formik.resetForm();
    setSelectedSubject(null);
    setShowAddModal(true);
    setShowEditModal(false);
  };

  const handleCloseAdd = () => {
    formik.resetForm();
    setShowAddModal(false);
  };

  const handleEdit = (subject) => {
    setSelectedSubject(subject);

    formik.resetForm({
      values: {
        name: subject.name ?? "",
        code: subject.code ?? "",
        teacher: subject.teacher ?? "",
        classes: subject.classes ?? "",
        students: subject.students ?? "",
        status: subject.status ?? "Active",
      },
    });

    setShowEditModal(true);
    setShowAddModal(false);
  };

  const handleCloseEdit = () => {
    formik.resetForm();
    setSelectedSubject(null);
    setShowEditModal(false);
  };

  const handleDelete = (subject) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${subject.name}"?`,
    );

    if (!confirmed) return;

    const updatedSubjects = subjects.filter((item) => item.id !== subject.id);

    if (!persistSubjects(updatedSubjects)) return;

    try {
      saveActivity(
        "Subject deleted",
        `${subject.name} (${subject.code}) was deleted from the subject directory.`,
      );
    } catch (error) {
      console.error("Unable to record activity:", error);
    }

    showMessage("Subject deleted successfully.");
  };

  const filteredSubjects = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return subjects
      .filter((subject) => {
        const matchesSearch = [
          subject.name,
          subject.code,
          subject.teacher,
          subject.classes,
        ].some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(search),
        );

        const matchesStatus =
          statusFilter === "All" || subject.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const comparison = String(a.name ?? "").localeCompare(
          String(b.name ?? ""),
        );

        return sortOrder === "az" ? comparison : -comparison;
      });
  }, [subjects, searchTerm, statusFilter, sortOrder]);

  const totalSubjects = subjects.length;

  const activeSubjects = subjects.filter(
    (subject) => subject.status === "Active",
  ).length;

  const totalTeachers = new Set(
    subjects
      .map((subject) => String(subject.teacher ?? "").trim())
      .filter(Boolean)
      .map((teacher) => teacher.toLowerCase()),
  ).size;

  const totalClasses = new Set(
    subjects.flatMap((subject) =>
      String(subject.classes ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((className) => className.toLowerCase()),
    ),
  ).size;

  const exportCSV = () => {
    if (filteredSubjects.length === 0) {
      showMessage("There are no subjects to export.", "error");
      return;
    }

    const headers = [
      "Subject Name",
      "Subject Code",
      "Teacher",
      "Classes",
      "Students",
      "Status",
    ];

    const escapeCSV = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filteredSubjects.map((subject) => [
      subject.name,
      subject.code,
      subject.teacher,
      subject.classes,
      subject.students,
      subject.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "school-subjects.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showMessage("CSV exported successfully.");
  };

  const InputError = ({ name }) => {
    if (!formik.touched[name] || !formik.errors[name]) {
      return null;
    }

    return (
      <p className="mt-1 text-left text-xs text-red-500">
        {formik.errors[name]}
      </p>
    );
  };

  const renderSubjectForm = (isEdit = false) => (
    <form
      onSubmit={formik.handleSubmit}
      className="max-h-[75vh] overflow-y-auto px-6 py-5"
    >
      <div className="mb-4">
        <label
          htmlFor={`${isEdit ? "edit" : "add"}-subject-name`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Subject Name
        </label>

        <input
          id={`${isEdit ? "edit" : "add"}-subject-name`}
          type="text"
          name="name"
          value={formik.values.name}  
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter subject name"
          className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-100 ${
            formik.touched.name && formik.errors.name
              ? "border-red-500"
              : "border-gray-200 focus:border-purple-500"
          }`}
        />

        <InputError name="name" />
      </div>

      <div className="mb-4">
        <label
          htmlFor={`${isEdit ? "edit" : "add"}-subject-code`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Subject Code
        </label>

        <input
          id={`${isEdit ? "edit" : "add"}-subject-code`}
          type="text"
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Example: MAT101"
          className={`w-full rounded-lg border px-4 py-2.5 uppercase outline-none focus:ring-2 focus:ring-purple-100 ${
            formik.touched.code && formik.errors.code
              ? "border-red-500"
              : "border-gray-200 focus:border-purple-500"
          }`}
        />

        <InputError name="code" />
      </div>

      <div className="mb-4">
        <label
          htmlFor={`${isEdit ? "edit" : "add"}-subject-teacher`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Teacher
        </label>

        <input
          id={`${isEdit ? "edit" : "add"}-subject-teacher`}
          type="text"
          name="teacher"
          value={formik.values.teacher}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter teacher name"
          className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-100 ${
            formik.touched.teacher && formik.errors.teacher
              ? "border-red-500"
              : "border-gray-200 focus:border-purple-500"
          }`}
        />

        <InputError name="teacher" />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${isEdit ? "edit" : "add"}-subject-classes`}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Classes
          </label>

          <input
            id={`${isEdit ? "edit" : "add"}-subject-classes`}
            type="text"
            name="classes"
            value={formik.values.classes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="8-A, 8-B"
            className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-100 ${
              formik.touched.classes && formik.errors.classes
                ? "border-red-500"
                : "border-gray-200 focus:border-purple-500"
            }`}
          />

          <InputError name="classes" />
        </div>

        <div>
          <label
            htmlFor={`${isEdit ? "edit" : "add"}-subject-students`}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Students
          </label>

          <input
            id={`${isEdit ? "edit" : "add"}-subject-students`}
            type="number"
            min="1"
            step="1"
            name="students"
            value={formik.values.students}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="62"
            className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-100 ${
              formik.touched.students && formik.errors.students
                ? "border-red-500"
                : "border-gray-200 focus:border-purple-500"
            }`}
          />

          <InputError name="students" />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor={`${isEdit ? "edit" : "add"}-subject-status`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Status
        </label>

        <select
          id={`${isEdit ? "edit" : "add"}-subject-status`}
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <InputError name="status" />
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={isEdit ? handleCloseEdit : handleCloseAdd}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isEdit ? "Update Subject" : "Add Subject"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-[#EAF1FF] p-4 text-left sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Toast Notification */}
        {toast && (
          <div
            role="status"
            className={`fixed right-4 top-4 z-[70] flex max-w-sm items-center gap-3 rounded-xl px-4 py-3 shadow-lg ${
              toast.type === "error"
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {toast.type === "error" ? (
              <FaExclamationCircle />
            ) : (
              <FaCheckCircle />
            )}

            <span className="text-sm font-medium">{toast.message}</span>

            <button
              type="button"
              aria-label="Close notification"
              onClick={() => setToast(null)}
              className="ml-2"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Subject Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage subjects, teachers and classes
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FaDownload />
              Export CSV
            </button>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
            >
              <FaPlus />
              Add Subject
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50">
              <FaBook className="text-xl text-purple-600" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">
                {totalSubjects}
              </p>
              <p className="text-sm text-gray-500">Total Subjects</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
              <FaCheckCircle className="text-xl text-green-600" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">
                {activeSubjects}
              </p>
              <p className="text-sm text-gray-500">Active Subjects</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <FaChalkboardTeacher className="text-xl text-blue-600" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">
                {totalTeachers}
              </p>
              <p className="text-sm text-gray-500">Teachers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <FaGraduationCap className="text-xl text-orange-600" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">{totalClasses}</p>
              <p className="text-sm text-gray-500">Classes</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search subject, code, teacher..."
                aria-label="Search subjects"
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
              className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-500"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              aria-label="Sort subjects"
              className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-500"
            >
              <option value="az">Name: A to Z</option>
              <option value="za">Name: Z to A</option>
            </select>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-gray-500">
              Showing {filteredSubjects.length} of {subjects.length} subjects
            </p>

            {(searchTerm || statusFilter !== "All" || sortOrder !== "az") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                  setSortOrder("az");
                }}
                className="text-xs font-medium text-purple-600 hover:text-purple-700"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Subject Cards */}
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
              >
                {/* Subject Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                      <FaBook className="text-purple-600" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="break-words text-lg font-semibold text-gray-800">
                        {subject.name}
                      </h2>

                      <p className="text-sm text-gray-400">{subject.code}</p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      subject.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {subject.status}
                  </span>
                </div>

                {/* Subject Information */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <FaChalkboardTeacher className="mt-1 shrink-0 text-gray-400" />

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">Teacher</p>
                      <p className="break-words text-sm font-medium text-gray-700">
                        {subject.teacher}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaGraduationCap className="mt-1 shrink-0 text-gray-400" />

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">Classes</p>
                      <p className="break-words text-sm font-medium text-gray-700">
                        {subject.classes}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaUsers className="mt-1 shrink-0 text-gray-400" />

                    <div>
                      <p className="text-xs text-gray-400">Students</p>
                      <p className="text-sm font-medium text-gray-700">
                        {subject.students} Students
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(subject)}
                    className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm font-medium text-purple-600 transition hover:bg-purple-100"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(subject)}
                    aria-label={`Delete ${subject.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <FaBook className="mx-auto mb-3 text-3xl text-gray-300" />

            <h3 className="font-semibold text-gray-800">No subjects found</h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or status filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
                setSortOrder("az");
              }}
              className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Add Subject Modal */}
        {showAddModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                handleCloseAdd();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-subject-title"
              className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div>
                  <h2
                    id="add-subject-title"
                    className="text-lg font-semibold text-gray-800"
                  >
                    Add Subject
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Add a new school subject
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseAdd}
                  aria-label="Close add subject form"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>

              {renderSubjectForm(false)}
            </div>
          </div>
        )}

        {/* Edit Subject Modal */}
        {showEditModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                handleCloseEdit();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-subject-title"
              className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div>
                  <h2
                    id="edit-subject-title"
                    className="text-lg font-semibold text-gray-800"
                  >
                    Edit Subject
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update subject information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseEdit}
                  aria-label="Close edit subject form"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>

              {renderSubjectForm(true)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetails;
