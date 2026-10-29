import React, { useState, useEffect, useMemo } from "react";
import { saveActivity } from "../hooks/useMessages";
import { IoClose } from "react-icons/io5";
import {
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiEdit2,
  FiPrinter,
  FiDownload,
  FiRotateCcw,
  FiCheckCircle,
} from "react-icons/fi";

const periods = [
  "8:00 - 8:45",
  "8:45 - 9:30",
  "9:30 - 10:15",
  "10:15 - 10:45",
  "10:45 - 11:30",
  "11:30 - 12:15",
  "12:15 - 1:00",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const defaultTimetable = {
  "10-A": {
    Monday: [
      "Mathematics",
      "Science",
      "English",
      "Break",
      "Gujarati",
      "Computer",
      "History",
    ],
    Tuesday: [
      "Science",
      "Mathematics",
      "Gujarati",
      "Break",
      "English",
      "Computer",
      "Art",
    ],
    Wednesday: [
      "English",
      "Mathematics",
      "Science",
      "Break",
      "History",
      "Gujarati",
      "Sports",
    ],
    Thursday: [
      "Mathematics",
      "English",
      "Computer",
      "Break",
      "Science",
      "Art",
      "History",
    ],
    Friday: [
      "Gujarati",
      "Science",
      "Mathematics",
      "Break",
      "Computer",
      "English",
      "Sports",
    ],
    Saturday: [
      "Science",
      "Mathematics",
      "English",
      "Break",
      "Gujarati",
      "History",
      "Art",
    ],
  },
  "10-B": {
    Monday: [
      "English",
      "Mathematics",
      "Science",
      "Break",
      "Computer",
      "Gujarati",
      "Art",
    ],
    Tuesday: [
      "Gujarati",
      "Science",
      "Mathematics",
      "Break",
      "History",
      "English",
      "Computer",
    ],
    Wednesday: [
      "Mathematics",
      "English",
      "Computer",
      "Break",
      "Science",
      "Art",
      "Gujarati",
    ],
    Thursday: [
      "Science",
      "Gujarati",
      "English",
      "Break",
      "Mathematics",
      "Computer",
      "Sports",
    ],
    Friday: [
      "Mathematics",
      "Computer",
      "Science",
      "Break",
      "English",
      "History",
      "Gujarati",
    ],
    Saturday: [
      "English",
      "Science",
      "Mathematics",
      "Break",
      "Computer",
      "Art",
      "History",
    ],
  },
  "10-C": {
    Monday: [
      "Computer",
      "Mathematics",
      "Science",
      "Break",
      "English",
      "Gujarati",
      "Art",
    ],
    Tuesday: [
      "Science",
      "English",
      "Mathematics",
      "Break",
      "Gujarati",
      "History",
      "Computer",
    ],
    Wednesday: [
      "Mathematics",
      "Science",
      "English",
      "Break",
      "Computer",
      "Gujarati",
      "Sports",
    ],
    Thursday: [
      "English",
      "Computer",
      "Gujarati",
      "Break",
      "Mathematics",
      "Science",
      "History",
    ],
    Friday: [
      "Science",
      "Mathematics",
      "English",
      "Break",
      "Gujarati",
      "Computer",
      "Art",
    ],
    Saturday: [
      "Mathematics",
      "Science",
      "Computer",
      "Break",
      "English",
      "History",
      "Gujarati",
    ],
  },
  "11-A": {
    Monday: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Break",
      "Biology",
      "English",
      "Computer",
    ],
    Tuesday: [
      "Chemistry",
      "Physics",
      "Mathematics",
      "Break",
      "English",
      "Biology",
      "Sports",
    ],
    Wednesday: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Break",
      "Computer",
      "English",
      "Biology",
    ],
    Thursday: [
      "Physics",
      "Mathematics",
      "Chemistry",
      "Break",
      "Biology",
      "Computer",
      "English",
    ],
    Friday: [
      "Chemistry",
      "Biology",
      "Physics",
      "Break",
      "Mathematics",
      "English",
      "Computer",
    ],
    Saturday: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Break",
      "Biology",
      "Computer",
      "English",
    ],
  },
  "11-B": {
    Monday: [
      "Chemistry",
      "Physics",
      "Biology",
      "Break",
      "Mathematics",
      "English",
      "Computer",
    ],
    Tuesday: [
      "Physics",
      "Chemistry",
      "English",
      "Break",
      "Mathematics",
      "Biology",
      "Sports",
    ],
    Wednesday: [
      "Biology",
      "Mathematics",
      "Physics",
      "Break",
      "Chemistry",
      "Computer",
      "English",
    ],
    Thursday: [
      "Chemistry",
      "Biology",
      "Physics",
      "Break",
      "Mathematics",
      "English",
      "Computer",
    ],
    Friday: [
      "Physics",
      "Mathematics",
      "Chemistry",
      "Break",
      "Biology",
      "English",
      "Computer",
    ],
    Saturday: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Break",
      "Biology",
      "Computer",
      "English",
    ],
  },
};

const getToday = () => {
  const dayIndex = new Date().getDay();
  return dayIndex >= 1 && dayIndex <= 6 ? days[dayIndex - 1] : "";
};

const cloneData = (data) => JSON.parse(JSON.stringify(data));

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

const TimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [showEditForm, setShowEditForm] = useState(false);
  const [undoData, setUndoData] = useState(null);
  const [toast, setToast] = useState("");
  const [editFormData, setEditFormData] = useState({
    day: "Monday",
    periodIndex: 0,
    subject: "",
  });

  const [timetable, setTimetable] = useState(() => {
    try {
      const saved = localStorage.getItem("timetableData");
      if (!saved) return cloneData(defaultTimetable);

      const parsed = JSON.parse(saved);

      // Merge saved classes with defaults so new classes remain available.
      return {
        ...cloneData(defaultTimetable),
        ...parsed,
      };
    } catch (error) {
      console.error("Unable to load timetable:", error);
      return cloneData(defaultTimetable);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("timetableData", JSON.stringify(timetable));
    } catch (error) {
      console.error("Unable to save timetable:", error);
      setToast("Unable to save changes in this browser.");
    }
  }, [timetable]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const currentTimetable =
    timetable[selectedClass] || defaultTimetable[selectedClass];

  const today = getToday();

  const subjectCount = useMemo(() => {
    const subjects = Object.values(currentTimetable || {})
      .flat()
      .filter((subject) => subject && subject !== "Break");

    return new Set(subjects).size;
  }, [currentTimetable]);

  const openEditForm = (day, subject, periodIndex) => {
    setEditFormData({ day, periodIndex, subject });
    setShowEditForm(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    const subject = editFormData.subject.trim();

    if (!subject) {
      setToast("Please enter a subject name.");
      return;
    }

    // Keep the previous timetable so the last edit can be undone.
    setUndoData(cloneData(timetable));

    setTimetable((previous) => {
      const updated = cloneData(previous);
      updated[selectedClass][editFormData.day][editFormData.periodIndex] =
        subject;
      return updated;
    });

    saveActivity(
      "Timetable updated",
      `${selectedClass} schedule for ${editFormData.day} was updated to ${subject}.`,
    );

    setShowEditForm(false);
    setToast("Timetable updated successfully!");
  };

  const handleUndo = () => {
    if (!undoData) return;

    setTimetable(cloneData(undoData));
    setUndoData(null);
    setToast("Last timetable change undone.");
  };

  const exportCSV = () => {
    const rows = [
      ["Class", selectedClass],
      ["Day", ...days],
      ...periods.map((period, index) => [
        period,
        ...days.map((day) => currentTimetable[day]?.[index] || ""),
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `timetable-${selectedClass}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setToast("Timetable CSV downloaded.");
  };

  const printTimetable = () => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setToast("Allow pop-ups to print the timetable.");
      return;
    }

    const tableRows = periods
      .map(
        (period, index) => `
        <tr>
          <th>${escapeHtml(period)}</th>
          ${days
            .map(
              (day) =>
                `<td>${escapeHtml(currentTimetable[day]?.[index] || "-")}</td>`,
            )
            .join("")}
        </tr>
      `,
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${escapeHtml(selectedClass)} Timetable</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #1e293b; }
            h1 { margin-bottom: 4px; }
            p { color: #64748b; margin-bottom: 24px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #cbd5e1; padding: 10px 6px; text-align: center; }
            thead { background: #eff6ff; }
            tbody th { background: #f8fafc; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>${escapeHtml(selectedClass)} Timetable</h1>
          <p>Weekly class schedule</p>
          <table>
            <thead>
              <tr><th>Time</th>${days.map((day) => `<th>${day}</th>`).join("")}</tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
            };
          <\/script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const stats = [
    {
      label: "School days",
      value: days.length,
      icon: <FiCalendar size={21} />,
      tone: "bg-blue-50 text-blue-600",
    },
    {
      label: "Periods per day",
      value: periods.length,
      icon: <FiClock size={21} />,
      tone: "bg-violet-50 text-violet-600",
    },
    {
      label: "Subjects this week",
      value: subjectCount,
      icon: <FiBookOpen size={21} />,
      tone: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="min-h-full bg-slate-50/50 py-2">
      <div className="mx-auto max-w-7xl space-y-6">
        {toast && (
          <div
            role="status"
            className="fixed right-4 top-4 z-[100] flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
          >
            <FiCheckCircle className="text-emerald-400" size={19} />
            {toast}
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setToast("")}
              className="ml-2 text-slate-300 hover:text-white"
            >
              <IoClose size={18} />
            </button>
          </div>
        )}

        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                School management
              </div>

              <h1 className="text-left text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Class Timetable
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Weekly schedule · Academic Year 2026–27 · {selectedClass}
              </p>

              {today ? (
                <div className="mt-3 flex w-full items-center justify-start">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Today is {today}
                  </span>
                </div>
              ) : (
                <div className="mt-3 flex w-full justify-start">
                  <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    Weekend · No regular school timetable
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-600">
                Select class
                <select
                  value={selectedClass}
                  onChange={(event) => setSelectedClass(event.target.value)}
                  className="min-w-36 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {Object.keys(defaultTimetable).map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => setShowEditForm((value) => !value)}
                className={`inline-flex items-center justify-center gap-2 self-end rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  showEditForm
                    ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                }`}
              >
                {showEditForm ? <IoClose size={17} /> : <FiEdit2 size={16} />}
                {showEditForm ? "Done editing" : "Edit timetable"}
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.tone}`}
              >
                {stat.icon}
              </span>
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-1 text-2xl text-left font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-left text-slate-900">
              Timetable tools
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Export or print the selected class schedule.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={!undoData}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiRotateCcw size={16} />
              Undo
            </button>

            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <FiDownload size={16} />
              Export CSV
            </button>

            <button
              type="button"
              onClick={printTimetable}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <FiPrinter size={16} />
              Print
            </button>
          </div>
        </section>

        {showEditForm && (
          <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg text-left font-bold text-slate-900">
                  Edit a lesson
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select a day, period and subject.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close edit form"
                onClick={() => setShowEditForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <IoClose size={21} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Day
                <select
                  name="day"
                  value={editFormData.day}
                  onChange={handleFormChange}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Period
                <select
                  name="periodIndex"
                  value={editFormData.periodIndex}
                  onChange={(event) =>
                    setEditFormData((previous) => ({
                      ...previous,
                      periodIndex: Number(event.target.value),
                    }))
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {periods.map((period, index) => (
                    <option key={period} value={index}>
                      {period}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Subject
                <input
                  type="text"
                  name="subject"
                  value={editFormData.subject}
                  onChange={handleFormChange}
                  placeholder="Enter subject name"
                  maxLength={60}
                  className="rounded-xl border border-slate-200 px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveEdit}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Save changes
              </button>
            </div>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">
              {selectedClass} weekly schedule
            </h2>
            <p className="text-sm text-slate-500">
              {showEditForm
                ? "Select a timetable cell to load it into the editor."
                : "Today's column is highlighted automatically."}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-separate border-spacing-0 text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="sticky left-0 z-20 min-w-32 border-b border-r border-slate-200 bg-slate-50 px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Time
                  </th>

                  {days.map((day) => (
                    <th
                      key={day}
                      className={`min-w-32 border-b border-r border-slate-200 px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide last:border-r-0 ${
                        day === today
                          ? "bg-blue-100 text-blue-800"
                          : "text-slate-500"
                      }`}
                    >
                      <div>{day}</div>
                      {day === today && (
                        <span className="mt-1 inline-block rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          TODAY
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {periods.map((period, periodIndex) => (
                  <tr key={period} className="group">
                    <th className="sticky left-0 z-10 whitespace-nowrap border-b border-r border-slate-100 bg-white px-4 py-3 text-left text-xs font-medium text-slate-500 group-hover:bg-slate-50">
                      {period}
                    </th>

                    {days.map((day) => {
                      const subject =
                        currentTimetable?.[day]?.[periodIndex] || "-";
                      const isBreak = subject === "Break";
                      const isToday = day === today;

                      return (
                        <td
                          key={`${day}-${periodIndex}`}
                          className={`border-b border-r border-slate-100 p-2 text-center last:border-r-0 ${
                            isToday ? "bg-blue-50/60" : ""
                          }`}
                        >
                          {showEditForm ? (
                            <button
                              type="button"
                              aria-label={`Edit ${subject} period for ${day}, ${period}`}
                              onClick={() =>
                                openEditForm(day, subject, periodIndex)
                              }
                              className={`inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold transition focus:outline-none focus:ring-4 sm:text-sm ${
                                isBreak
                                  ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 hover:bg-amber-100"
                                  : "bg-white text-blue-700 ring-1 ring-inset ring-blue-100 hover:bg-blue-100"
                              }`}
                            >
                              {isBreak && <FiClock size={13} />}
                              <span>{subject}</span>
                              <FiEdit2 size={12} className="ml-1 opacity-60" />
                            </button>
                          ) : (
                            <span
                              className={`inline-flex min-h-10 w-full items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold sm:text-sm ${
                                isBreak
                                  ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100"
                                  : isToday
                                    ? "bg-white text-blue-800 ring-1 ring-inset ring-blue-100"
                                    : "bg-slate-50 text-slate-700 group-hover:bg-white"
                              }`}
                            >
                              {isBreak && (
                                <FiClock className="mr-1.5" size={13} />
                              )}
                              {subject}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-blue-100 ring-1 ring-blue-200" />
              Today's schedule
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-amber-100 ring-1 ring-amber-200" />
              Break period
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-slate-100 ring-1 ring-slate-200" />
              Regular period
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TimeTable;
