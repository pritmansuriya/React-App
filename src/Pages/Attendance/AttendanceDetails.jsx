import { useEffect, useState } from "react";
import {
  FiActivity,
  FiPlus,
  FiSearch,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiX,
} from "react-icons/fi";
import { useAttendance } from "./useAttendance";

const emptyForm = { name: "", studentId: "", present: "", absent: "" };

const AttendanceDetails = () => {
  const { students, addAttendance } = useAttendance();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!showModal) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const records = students.map((student) => {
    const present = Number(student.present) || 0;
    const absent = Number(student.absent) || 0;
    const total = present + absent;
    return {
      ...student,
      present,
      absent,
      percentage: total ? Math.round((present / total) * 100) : 0,
    };
  });
  const totalPresent = records.reduce((total, student) => total + student.present, 0);
  const totalAbsent = records.reduce((total, student) => total + student.absent, 0);
  const attendanceRate = totalPresent + totalAbsent
    ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)
    : 0;
  const query = search.trim().toLowerCase();
  const visibleRecords = records.filter((student) =>
    `${student.name} ${student.studentId}`.toLowerCase().includes(query),
  );

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Number(formData.present) + Number(formData.absent) === 0) {
      setError("Enter at least one present or absent day.");
      return;
    }
    if (students.some((student) => student.studentId.toLowerCase() === formData.studentId.trim().toLowerCase())) {
      setError("A student with this ID is already in the attendance register.");
      return;
    }

    addAttendance({
      id: globalThis.crypto?.randomUUID?.() ?? `attendance-${Date.now()}`,
      name: formData.name.trim(),
      studentId: formData.studentId.trim(),
      present: Number(formData.present),
      absent: Number(formData.absent),
    });
    setFormData(emptyForm);
    setError("");
    setShowModal(false);
  };

  const fieldClassName =
    "mt-1.5 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";

  return (
    <section className="mx-auto max-w-7xl text-left text-slate-900">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
            Student monitoring
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Attendance details</h1>
          <p className="mt-2 text-sm text-slate-500">
            Review student attendance records for the current reporting period.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormData(emptyForm);
            setError("");
            setShowModal(true);
          }}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
        >
          <FiPlus aria-hidden="true" size={17} />
          Add attendance
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        <div className="flex items-center gap-3 py-4 sm:pr-5">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-sky-50 text-sky-700">
            <FiUsers aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Students tracked</p>
            <p className="text-xl font-semibold text-slate-900">{students.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:px-5">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-50 text-emerald-700">
            <FiUserCheck aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Present days</p>
            <p className="text-xl font-semibold text-slate-900">{totalPresent}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:px-5">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-rose-50 text-rose-700">
            <FiUserX aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Absent days</p>
            <p className="text-xl font-semibold text-slate-900">{totalAbsent}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:pl-5">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-teal-50 text-teal-700">
            <FiActivity aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Overall attendance</p>
            <p className="text-xl font-semibold text-slate-900">{attendanceRate}%</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Student register</h2>
          <p className="mt-1 text-sm text-slate-500">{visibleRecords.length} student records</p>
        </div>
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search students</span>
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or student ID"
            className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                <th scope="col" className="px-5 py-3.5">Student</th>
                <th scope="col" className="px-5 py-3.5">Student ID</th>
                <th scope="col" className="px-5 py-3.5">Present</th>
                <th scope="col" className="px-5 py-3.5">Absent</th>
                <th scope="col" className="px-5 py-3.5">Attendance rate</th>
                <th scope="col" className="px-5 py-3.5">Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleRecords.map((student) => {
                const standing = student.percentage >= 90
                  ? { label: "Excellent", color: "bg-emerald-50 text-emerald-700" }
                  : student.percentage >= 75
                    ? { label: "On track", color: "bg-sky-50 text-sky-700" }
                    : { label: "Needs attention", color: "bg-rose-50 text-rose-700" };

                return (
                  <tr key={student.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">{student.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{student.studentId}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-700">{student.present}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-700">{student.absent}</td>
                    <td className="px-5 py-4">
                      <div className="flex min-w-36 items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${student.percentage < 75 ? "bg-rose-500" : "bg-teal-600"}`}
                            style={{ width: `${student.percentage}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-sm font-semibold text-slate-800">
                          {student.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${standing.color}`}>
                        {standing.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {visibleRecords.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <p className="text-sm font-semibold text-slate-700">No attendance records found</p>
                    <p className="mt-1 text-sm text-slate-500">Try a different search or add a record.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowModal(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-dialog-title"
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-lg bg-white p-5 shadow-2xl sm:max-w-xl sm:rounded-lg sm:p-7"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
                  Student monitoring
                </p>
                <h2 id="attendance-dialog-title" className="mt-1 text-2xl font-semibold text-slate-900">
                  Add attendance
                </h2>
                <p className="mt-1 text-sm text-slate-500">Enter the student’s present and absent days.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close attendance dialog"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <FiX size={20} aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Student name <span className="text-rose-600">*</span>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={fieldClassName}
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Student ID <span className="text-rose-600">*</span>
                <input
                  required
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g. ST006"
                  className={fieldClassName}
                />
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Present days <span className="text-rose-600">*</span>
                  <input
                    required
                    type="number"
                    min="0"
                    step="1"
                    name="present"
                    value={formData.present}
                    onChange={handleChange}
                    className={fieldClassName}
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Absent days <span className="text-rose-600">*</span>
                  <input
                    required
                    type="number"
                    min="0"
                    step="1"
                    name="absent"
                    value={formData.absent}
                    onChange={handleChange}
                    className={fieldClassName}
                  />
                </label>
              </div>
              {error && <p role="alert" className="text-sm font-medium text-rose-700">{error}</p>}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 rounded-md bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
                >
                  Save attendance
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
};

export default AttendanceDetails;
