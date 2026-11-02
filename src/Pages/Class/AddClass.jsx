
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiGrid,
  FiPlus,
  FiBookOpen,
  FiUser,
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import { useClasses } from "./useClasses";
import { saveActivity } from "../hooks/useMessages";

const AddClass = () => {
  const navigate = useNavigate();
  const { classes, addClass } = useClasses();

  const [form, setForm] = useState({
    grade: "",
    section: "A",
    classTeacher: "",
    room: "",
    capacity: "35",
    academicYear: "2026-27",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Grade options
  const grades = Array.from({ length: 12 }, (_, index) => `Grade ${index + 1}`);

  // Academic year options
  const academicYears = [
    "2025-26",
    "2026-27",
    "2027-28",
    "2028-29",
    "2029-30",
    "2030-31",
  ];

  // Common input styles
  const fieldClassName =
    "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

  // Update form fields
  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess(false);
  };

  // Form validation
  const validateForm = () => {
    if (!form.grade) {
      return "Please select a grade.";
    }

    if (!form.classTeacher.trim()) {
      return "Please enter the class teacher's name.";
    }

    const capacity = Number(form.capacity);

    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 100) {
      return "Student capacity must be between 1 and 100.";
    }

    if (!form.academicYear) {
      return "Please select an academic year.";
    }

    return "";
  };

  // Create class
  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess(false);

    // Validate fields
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    // Check duplicate class
    const duplicate = classes.some(
      (item) =>
        item.grade.trim().toLowerCase() === form.grade.trim().toLowerCase() &&
        item.section === form.section &&
        item.academicYear === form.academicYear,
    );

    if (duplicate) {
      setError(
        `${form.grade}, Section ${form.section} already exists for ${form.academicYear}.`,
      );
      return;
    }

    // Prepare class data
    const newClass = {
      ...form,
      grade: form.grade.trim(),
      section: form.section,
      classTeacher: form.classTeacher.trim(),
      room: form.room.trim(),
      capacity: Number(form.capacity),
      academicYear: form.academicYear,
    };

    // Save class
    addClass(newClass);

    // Activity log
    saveActivity(
      "Class added",
      `${newClass.grade}, Section ${newClass.section} was added for ${newClass.academicYear}.`,
    );

    // Success feedback
    setSuccess(true);

    // Navigate to class details
    navigate("/dashboard/class");
  };

  return (
    <section className="mx-auto max-w-5xl px-1 pb-8 text-left text-slate-900 sm:px-2">

      {/* Back Navigation */}
      <Link
        to="/dashboard/class"
        className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-500 transition hover:text-teal-700"
      >
        <FiArrowLeft size={17} aria-hidden="true" />
        Back to class details
      </Link>

      {/* Page Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-teal-700 text-white shadow-sm shadow-teal-700/20">
          <FiGrid size={24} aria-hidden="true" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-700">
            Academic management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Create new class
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Add a class and configure its academic details.
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Card Header */}
        <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <FiBookOpen className="text-teal-700" size={20} />

            <div>
              <h2 className="text-base font-bold text-slate-800">
                Class information
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Enter the details below to create a new classroom.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-6 sm:px-8 sm:py-8">

          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">

            {/* Grade */}
            <label className="block text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <FiBookOpen className="text-slate-400" size={16} />
                Grade or level
                <span className="text-rose-500">*</span>
              </span>

              <select
                required
                name="grade"
                value={form.grade}
                onChange={updateField}
                className={fieldClassName}
              >
                <option value="">Select grade</option>

                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </label>

            {/* Section */}
            <label className="block text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <FiGrid className="text-slate-400" size={16} />
                Section
                <span className="text-rose-500">*</span>
              </span>

              <select
                required
                name="section"
                value={form.section}
                onChange={updateField}
                className={fieldClassName}
              >
                {["A", "B", "C", "D", "E", "F"].map((section) => (
                  <option key={section} value={section}>
                    Section {section}
                  </option>
                ))}
              </select>
            </label>

            {/* Class Teacher */}
            <label className="block text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <FiUser className="text-slate-400" size={16} />
                Class teacher
                <span className="text-rose-500">*</span>
              </span>

              <input
                required
                type="text"
                name="classTeacher"
                value={form.classTeacher}
                onChange={updateField}
                placeholder="Enter teacher's full name"
                maxLength={80}
                className={fieldClassName}
              />
            </label>

            {/* Room */}
            <label className="block text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <FiMapPin className="text-slate-400" size={16} />
                Classroom / Room number
              </span>

              <input
                type="text"
                name="room"
                value={form.room}
                onChange={updateField}
                placeholder="e.g. B-204"
                maxLength={30}
                className={fieldClassName}
              />
            </label>

            {/* Student Capacity */}
            <label className="block text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <FiUsers className="text-slate-400" size={16} />
                Student capacity
                <span className="text-rose-500">*</span>
              </span>

              <input
                required
                type="number"
                name="capacity"
                min="1"
                max="100"
                step="1"
                value={form.capacity}
                onChange={updateField}
                className={fieldClassName}
              />

              <span className="mt-1.5 block text-xs font-normal text-slate-400">
                Maximum 100 students per class.
              </span>
            </label>

            {/* Academic Year */}
            <label className="block text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <FiCalendar className="text-slate-400" size={16} />
                Academic year
                <span className="text-rose-500">*</span>
              </span>

              <select
                required
                name="academicYear"
                value={form.academicYear}
                onChange={updateField}
                className={fieldClassName}
              >
                {academicYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Class Preview */}
          {form.grade && (
            <div className="mt-7 flex items-center gap-3 rounded-xl border border-teal-100 bg-teal-50/70 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-teal-700 shadow-sm">
                <FiGrid size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-teal-700">
                  Class preview
                </p>

                <p className="mt-0.5 truncate text-sm font-bold text-slate-800">
                  {form.grade} - Section {form.section}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Academic year: {form.academicYear}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700"
            >
              <FiAlertCircle className="mt-0.5 shrink-0" size={17} />
              <p>{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div
              role="status"
              className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm font-medium text-emerald-700"
            >
              <FiCheckCircle size={17} />
              Class created successfully!
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <Link
              to="/dashboard/class"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-teal-700/20"
            >
              <FiPlus size={17} aria-hidden="true" />
              Create class
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Helper */}
      <p className="mt-4 text-center text-xs text-slate-400">
        <span className="text-rose-500">*</span> Required fields must be completed.
      </p>
    </section>
  );
};

export default AddClass;
