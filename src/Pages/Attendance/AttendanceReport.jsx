import { useState } from "react";
import { FiActivity, FiDownload, FiSearch, FiUserCheck, FiUserX, FiUsers } from "react-icons/fi";
import { useAttendance } from "./useAttendance";

const AttendanceReport = () => {
  const { students } = useAttendance();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const reportRows = students.map((student) => {
    const present = Number(student.present) || 0;
    const absent = Number(student.absent) || 0;
    const total = present + absent;
    const percentage = total ? Math.round((present / total) * 100) : 0;
    const standing = percentage >= 90
      ? "Excellent"
      : percentage >= 75
        ? "On track"
        : "Needs attention";

    return { ...student, present, absent, total, percentage, standing };
  });
  const totalPresent = reportRows.reduce((total, student) => total + student.present, 0);
  const totalAbsent = reportRows.reduce((total, student) => total + student.absent, 0);
  const overallRate = totalPresent + totalAbsent
    ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)
    : 0;
  const attentionCount = reportRows.filter((student) => student.percentage < 75).length;
  const query = search.trim().toLowerCase();
  const visibleRows = reportRows
    .filter((student) => `${student.name} ${student.studentId}`.toLowerCase().includes(query))
    .filter((student) => {
      if (filter === "attention") return student.percentage < 75;
      if (filter === "on-track") return student.percentage >= 75;
      return true;
    })
    .sort((first, second) => first.percentage - second.percentage);

  const exportCsv = () => {
    const csvRows = [
      ["Student", "Student ID", "Present days", "Absent days", "Attendance rate", "Standing"],
      ...visibleRows.map((student) => [
        student.name,
        student.studentId,
        student.present,
        student.absent,
        `${student.percentage}%`,
        student.standing,
      ]),
    ];
    const csv = csvRows
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const fileUrl = window.URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "attendance-report.csv";
    link.click();
    window.URL.revokeObjectURL(fileUrl);
  };

  return (
    <section className="mx-auto max-w-7xl text-left text-slate-900">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
            Student monitoring
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Attendance report</h1>
          <p className="mt-2 text-sm text-slate-500">
            Summary and attendance rates for all recorded students.
          </p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={visibleRows.length === 0}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiDownload aria-hidden="true" />
          Export CSV
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        <div className="flex items-center gap-3 py-4 sm:pr-5">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-teal-50 text-teal-700">
            <FiActivity aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Overall attendance</p>
            <p className="text-xl font-semibold text-slate-900">{overallRate}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:px-5">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-sky-50 text-sky-700">
            <FiUsers aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Students included</p>
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
        <div className="flex items-center gap-3 py-4 sm:pl-5">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-rose-50 text-rose-700">
            <FiUserX aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Needs attention</p>
            <p className="text-xl font-semibold text-slate-900">{attentionCount}</p>
          </div>
        </div>
      </div>

      <section className="mb-6 border-y border-slate-200 bg-white px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="min-w-40">
            <p className="text-sm font-semibold text-slate-900">Attendance overview</p>
            <p className="mt-1 text-xs text-slate-500">Present vs. absent days recorded</p>
          </div>
          <div className="flex-1">
            <div
              role="img"
              aria-label={`${overallRate}% of recorded student days were present`}
              className="flex h-3 overflow-hidden rounded-full bg-slate-100"
            >
              <div className="bg-teal-600 transition-all" style={{ width: `${overallRate}%` }} />
              <div className="bg-rose-400 transition-all" style={{ width: `${100 - overallRate}%` }} />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4 text-xs font-medium">
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <span className="h-2 w-2 rounded-full bg-teal-600" />Present {totalPresent}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <span className="h-2 w-2 rounded-full bg-rose-400" />Absent {totalAbsent}
            </span>
          </div>
        </div>
      </section>

      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Student breakdown</h2>
          <p className="mt-1 text-sm text-slate-500">{visibleRows.length} students in this view</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block w-full sm:w-64">
            <span className="sr-only">Search report</span>
            <FiSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name or ID"
              className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
            />
          </label>
          <label>
            <span className="sr-only">Filter by attendance standing</span>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15 sm:w-48"
            >
              <option value="all">All standings</option>
              <option value="attention">Needs attention</option>
              <option value="on-track">75% and above</option>
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                <th scope="col" className="px-5 py-3.5">Student</th>
                <th scope="col" className="px-5 py-3.5">Present days</th>
                <th scope="col" className="px-5 py-3.5">Absent days</th>
                <th scope="col" className="px-5 py-3.5">Total days</th>
                <th scope="col" className="px-5 py-3.5">Attendance rate</th>
                <th scope="col" className="px-5 py-3.5">Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleRows.map((student) => (
                <tr key={student.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{student.studentId}</p>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">{student.present}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">{student.absent}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{student.total}</td>
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
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        student.percentage < 75
                          ? "bg-rose-50 text-rose-700"
                          : student.percentage >= 90
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-sky-50 text-sky-700"
                      }`}
                    >
                      {student.standing}
                    </span>
                  </td>
                </tr>
              ))}
              {visibleRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <p className="text-sm font-semibold text-slate-700">No report rows found</p>
                    <p className="mt-1 text-sm text-slate-500">Adjust the search or attendance filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AttendanceReport;
