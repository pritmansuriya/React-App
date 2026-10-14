import { saveActivity } from "../hooks/useMessages";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FiBookOpen, FiCalendar, FiClock, FiEdit2 } from "react-icons/fi";

const TimeTable = () => {
  // Time slots (periods)
  const periods = [
    "8:00 - 8:45",
    "8:45 - 9:30",
    "9:30 - 10:15",
    "10:15 - 10:45", 
    "10:45 - 11:30",
    "11:30 - 12:15",
    "12:15 - 1:00",
  ];

  // Days
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    day: 'Monday',
    periodIndex: 0,
    subject: ''
  });

  // Subject data - Only subject names
  const timetableData = {
    '10-A': {
      Monday: ['Mathematics', 'Science', 'English', 'Break', 'Gujarati', 'Computer', 'History'],
      Tuesday: ['Science', 'Mathematics', 'Gujarati', 'Break', 'English', 'Computer', 'Art'],
      Wednesday: ['English', 'Mathematics', 'Science', 'Break', 'History', 'Gujarati', 'Sports'],
      Thursday: ['Mathematics', 'English', 'Computer', 'Break', 'Science', 'Art', 'History'],
      Friday: ['Gujarati', 'Science', 'Mathematics', 'Break', 'Computer', 'English', 'Sports'],
      Saturday: ['Science', 'Mathematics', 'English', 'Break', 'Gujarati', 'History', 'Art']
    },
    '10-B': {
      Monday: ['English', 'Mathematics', 'Science', 'Break', 'Computer', 'Gujarati', 'Art'],
      Tuesday: ['Gujarati', 'Science', 'Mathematics', 'Break', 'History', 'English', 'Computer'],
      Wednesday: ['Mathematics', 'English', 'Computer', 'Break', 'Science', 'Art', 'Gujarati'],
      Thursday: ['Science', 'Gujarati', 'English', 'Break', 'Mathematics', 'Computer', 'Sports'],
      Friday: ['Mathematics', 'Computer', 'Science', 'Break', 'English', 'History', 'Gujarati'],
      Saturday: ['English', 'Science', 'Mathematics', 'Break', 'Computer', 'Art', 'History']
    },
    '10-C': {
      Monday: ['Computer', 'Mathematics', 'Science', 'Break', 'English', 'Gujarati', 'Art'],
      Tuesday: ['Science', 'English', 'Mathematics', 'Break', 'Gujarati', 'History', 'Computer'],
      Wednesday: ['Mathematics', 'Science', 'English', 'Break', 'Computer', 'Gujarati', 'Sports'],
      Thursday: ['English', 'Computer', 'Gujarati', 'Break', 'Mathematics', 'Science', 'History'],
      Friday: ['Science', 'Mathematics', 'English', 'Break', 'Gujarati', 'Computer', 'Art'],
      Saturday: ['Mathematics', 'Science', 'Computer', 'Break', 'English', 'History', 'Gujarati']
    },
    '11-A': {
      Monday: ['Physics', 'Chemistry', 'Mathematics', 'Break', 'Biology', 'English', 'Computer'],
      Tuesday: ['Chemistry', 'Physics', 'Mathematics', 'Break', 'English', 'Biology', 'Sports'],
      Wednesday: ['Mathematics', 'Physics', 'Chemistry', 'Break', 'Computer', 'English', 'Biology'],
      Thursday: ['Physics', 'Mathematics', 'Chemistry', 'Break', 'Biology', 'Computer', 'English'],
      Friday: ['Chemistry', 'Biology', 'Physics', 'Break', 'Mathematics', 'English', 'Computer'],
      Saturday: ['Physics', 'Chemistry', 'Mathematics', 'Break', 'Biology', 'Computer', 'English']
    },
    '11-B': {
      Monday: ['Chemistry', 'Physics', 'Biology', 'Break', 'Mathematics', 'English', 'Computer'],
      Tuesday: ['Physics', 'Chemistry', 'English', 'Break', 'Mathematics', 'Biology', 'Sports'],
      Wednesday: ['Biology', 'Mathematics', 'Physics', 'Break', 'Chemistry', 'Computer', 'English'],
      Thursday: ['Chemistry', 'Biology', 'Physics', 'Break', 'Mathematics', 'English', 'Computer'],
      Friday: ['Physics', 'Mathematics', 'Chemistry', 'Break', 'Biology', 'English', 'Computer'],
      Saturday: ['Mathematics', 'Physics', 'Chemistry', 'Break', 'Biology', 'Computer', 'English']
    }
  };

  // Initialize timetable from localStorage or default data
  const [timetable, setTimetable] = useState(() => {
    try {
      const savedData = localStorage.getItem('timetableData');
      if (savedData) {
        return JSON.parse(savedData);
      }
      return timetableData;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return timetableData;
    }
  });

  // Save timetable to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('timetableData', JSON.stringify(timetable));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [timetable]);

  const currentTimetable = timetable[selectedClass] || timetableData['10-A'];
  const subjectCount = new Set(
    Object.values(currentTimetable).flat().filter((subject) => subject !== "Break")
  ).size;

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const openEditForm = (day, subject, periodIndex) => {
    setEditFormData({
      day: day,
      periodIndex: periodIndex,
      subject: subject
    });
    setShowEditForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDayChange = (e) => {
    const day = e.target.value;
    setEditFormData(prev => ({
      ...prev,
      day: day,
    }));
  };

  const handlePeriodChange = (e) => {
    const periodIndex = parseInt(e.target.value);
    setEditFormData(prev => ({
      ...prev,
      periodIndex: periodIndex,
    }));
  };

  const handleSaveEdit = () => {
    if (!editFormData.subject.trim()) {
      alert(' Subject name cannot be empty!');
      return;
    }

    const { day, periodIndex, subject } = editFormData;

    setTimetable(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData[selectedClass][day][periodIndex] = subject.trim();
      return newData;
    });
    saveActivity(
      "Timetable updated",
      `${selectedClass} schedule for ${day} was updated to ${subject.trim()}.`,
    );

    setShowEditForm(false);
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Weekly schedule
              </div>
              <h1 className="text-2xl text-left font-bold tracking-tight text-slate-900 sm:text-3xl">
                Class Timetable
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Academic Year 2025–26 <span className="mx-1 text-slate-300">/</span> {selectedClass}
              </p>
            </div>

            <div className="flex flex-col gap-3 min-[420px]:flex-row">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-600">
                Select class
                <select
                  value={selectedClass}
                  onChange={handleClassChange}
                  className="min-w-36 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {Object.keys(timetableData).map((className) => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                aria-pressed={showEditForm}
                onClick={() => setShowEditForm((isEditing) => !isEditing)}
                className={`self-end inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 ${
                  showEditForm
                    ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-100"
                    : "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-blue-200"
                }`}
              >
                <FiEdit2 size={16} />
                {showEditForm ? "Done editing" : "Edit timetable"}
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
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
              tone: "bg-indigo-50 text-indigo-600",
            },
            {
              label: "Subjects this week",
              value: subjectCount,
              icon: <FiBookOpen size={21} />,
              tone: "bg-sky-50 text-sky-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.tone}`}>
                {stat.icon}
              </span>
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        {showEditForm && (
          <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Edit a lesson</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Choose the day and period, then enter the subject.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close edit form"
                onClick={() => setShowEditForm(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <IoClose size={21} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Day
                <select
                  value={editFormData.day}
                  onChange={handleDayChange}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {days.map((day) => <option key={day} value={day}>{day}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Period
                <select
                  value={editFormData.periodIndex}
                  onChange={handlePeriodChange}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {periods.map((period, index) => (
                    <option key={period} value={index}>{period}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 sm:col-span-2 lg:col-span-1">
                Subject
                <input
                  type="text"
                  name="subject"
                  value={editFormData.subject}
                  onChange={handleFormChange}
                  placeholder="Enter subject name"
                  className="rounded-xl border border-slate-200 px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Save changes
              </button>
            </div>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">{selectedClass} weekly schedule</h2>
            <p className="text-sm text-slate-500">
              {showEditForm
                ? "Select any lesson or break cell to edit it."
                : "Select Edit timetable to make changes to a lesson."}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-separate border-spacing-0 text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="sticky left-0 z-10 min-w-32 border-b border-r border-slate-200 bg-slate-50 px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Time
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="min-w-32 border-b border-r border-slate-200 px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 last:border-r-0"
                    >
                      {day}
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
                      const subject = currentTimetable[day][periodIndex];
                      const isBreak = subject === "Break";

                      return (
                        <td
                          key={`${day}-${periodIndex}`}
                          className="border-b border-r border-slate-100 p-2 text-center last:border-r-0"
                        >
                          {showEditForm ? (
                            <button
                              type="button"
                              aria-label={`Edit ${isBreak ? "break" : subject} period for ${day}, ${period}`}
                              onClick={() => openEditForm(day, subject, periodIndex)}
                              className={`inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold transition focus:outline-none focus:ring-4 sm:text-sm ${
                                isBreak
                                  ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 hover:bg-amber-100 focus:ring-amber-100"
                                  : "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100 hover:bg-blue-100 focus:ring-blue-100"
                              }`}
                            >
                              {isBreak && <FiClock className="shrink-0" size={13} />}
                              <span>{subject}</span>
                              <FiEdit2 className="ml-1 shrink-0 opacity-60" size={12} />
                            </button>
                          ) : (
                            <span
                              className={`inline-flex min-h-10 w-full items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold sm:text-sm ${
                                isBreak
                                  ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100"
                                  : "bg-slate-50 text-slate-700 group-hover:bg-white"
                              }`}
                            >
                              {isBreak && <FiClock className="mr-1.5 shrink-0" size={13} />}
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
        </section>
      </div>
    </div>
  );
};

export default TimeTable;