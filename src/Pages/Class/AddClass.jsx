import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiGrid, FiPlus } from "react-icons/fi";
import { useClasses } from "./useClasses";

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

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicate = classes.some(
      (item) =>
        item.grade.trim().toLowerCase() === form.grade.trim().toLowerCase() &&
        item.section === form.section &&
        item.academicYear === form.academicYear,
    );
    if (duplicate) {
      setError("This class and section already exists for the selected academic year.");
      return;
    }

    addClass({ ...form, grade: form.grade.trim(), classTeacher: form.classTeacher.trim(), capacity: Number(form.capacity) });
    navigate("/dashboard/class");
  };

  const fieldClassName =
    "mt-1.5 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";

  return (
    <section className="mx-auto max-w-5xl text-left text-slate-900">
      <Link
        to="/dashboard/class"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-teal-800"
      >
        <FiArrowLeft aria-hidden="true" />
        Class details
      </Link>

      <div className="mb-7 flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-teal-700 text-white">
          <FiGrid size={21} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
            Academic management
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-900">Add class</h1>
        </div>
      </div>

      <div className="border-y border-slate-200 bg-white px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-6 border-b border-slate-200 pb-5">
          <h2 className="text-lg font-semibold text-slate-900">Class information</h2>
          <p className="mt-1 text-sm text-slate-500">Set up a class, section, and homeroom details.</p>
        </div>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Grade or level <span className="text-rose-600">*</span>
              <input
                required
                name="grade"
                value={form.grade}
                onChange={updateField}
                placeholder="e.g. Grade 8"
                className={fieldClassName}
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Section <span className="text-rose-600">*</span>
              <select
                required
                name="section"
                value={form.section}
                onChange={updateField}
                className={fieldClassName}
              >
                {["A", "B", "C", "D", "E", "F"].map((section) => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Class teacher <span className="text-rose-600">*</span>
              <input
                required
                name="classTeacher"
                value={form.classTeacher}
                onChange={updateField}
                placeholder="Enter teacher name"
                className={fieldClassName}
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Room
              <input
                name="room"
                value={form.room}
                onChange={updateField}
                placeholder="e.g. B-204"
                className={fieldClassName}
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Student capacity <span className="text-rose-600">*</span>
              <input
                required
                min="1"
                max="100"
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={updateField}
                className={fieldClassName}
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Academic year <span className="text-rose-600">*</span>
              <input
                required
                name="academicYear"
                value={form.academicYear}
                onChange={updateField}
                placeholder="e.g. 2026-27"
                className={fieldClassName}
              />
            </label>
          </div>

          {error && <p role="alert" className="mt-4 text-sm font-medium text-rose-700">{error}</p>}

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <Link
              to="/dashboard/class"
              className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
            >
              <FiPlus aria-hidden="true" />
              Create class
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddClass;
