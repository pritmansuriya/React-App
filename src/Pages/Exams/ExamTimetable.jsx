import React, { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiEdit2,
  FiMapPin,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { saveActivity } from "../hooks/useMessages";

const defailtExamTimetables = {
  "Class 5": [
    {
      date: "Oct 20",
      day: "Monday",
      subject: "Maths",
      room: "Room 05",
      time: "9:00 - 11:00",
    },
    {
      date: "Oct 21",
      day: "Tuesday",
      subject: "Science",
      room: "Room 06",
      time: "9:00 - 11:00",
    },
    {
      date: "Oct 22",
      day: "Wednesday",
      subject: "English",
      room: "Room 08",
      time: "9:00 - 11:00",
    },
    {
      date: "Oct 23",
      day: "Thursday",
      subject: "History",
      room: "Room 07",
      time: "9:00 - 11:00",
    },
    {
      date: "Oct 24",
      day: "Friday",
      subject: "Computer",
      room: "Lab 1",
      time: "9:00 - 10:30",
    },
  ],

  "Class 6": [
    {
      date: "Oct 20",
      day: "Monday",
      subject: "English",
      room: "Room 10",
      time: "9:00 - 11:00",
    },
    {
      date: "Oct 21",
      day: "Tuesday",
      subject: "Maths",
      room: "Room 11",
      time: "9:00 - 11:00",
    },
    {
      date: "Oct 22",
      day: "Wednesday",
      subject: "Science",
      room: "Room 12",
      time: "9:00 - 11:00",
    },
    {
      date: "Oct 23",
      day: "Thursday",
      subject: "Computer",
      room: "Lab 2",
      time: "9:00 - 11:00",
    },
    {
      date: "Oct 24",
      day: "Friday",
      subject: "History",
      room: "Room 13",
      time: "9:00 - 10:30",
    },
  ],

  "Class 7": [
    {
      date: "Oct 20",
      day: "Monday",
      subject: "Science",
      room: "Room 20",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 21",
      day: "Tuesday",
      subject: "English",
      room: "Room 21",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 22",
      day: "Wednesday",
      subject: "Maths",
      room: "Room 22",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 23",
      day: "Thursday",
      subject: "History",
      room: "Room 23",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 24",
      day: "Friday",
      subject: "Computer",
      room: "Lab 3",
      time: "9:00 - 11:30",
    },
  ],

  "Class 8": [
    {
      date: "Oct 20",
      day: "Monday",
      subject: "History",
      room: "Room 30",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 21",
      day: "Tuesday",
      subject: "Science",
      room: "Room 31",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 22",
      day: "Wednesday",
      subject: "English",
      room: "Room 32",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 23",
      day: "Thursday",
      subject: "Maths",
      room: "Room 33",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 24",
      day: "Friday",
      subject: "Computer",
      room: "Lab 4",
      time: "9:00 - 11:30",
    },
  ],

  "Class 9": [
    {
      date: "Oct 20",
      day: "Monday",
      subject: "Computer",
      room: "Lab 4",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 21",
      day: "Tuesday",
      subject: "Maths",
      room: "Room 40",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 22",
      day: "Wednesday",
      subject: "Science",
      room: "Room 41",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 23",
      day: "Thursday",
      subject: "English",
      room: "Room 42",
      time: "9:00 - 12:00",
    },
    {
      date: "Oct 24",
      day: "Friday",
      subject: "History",
      room: "Room 43",
      time: "9:00 - 11:30",
    },
  ],
};

const ExamTimetable = () => {
  const [examTimetables, setExamTimetables] = useState(() => {
    const savedData = localStorage.getItem("examTimetables");

    return savedData ? JSON.parse(savedData) : defailtExamTimetables;
  });

  useEffect(() => {
    localStorage.setItem("examTimetables", JSON.stringify(examTimetables));
  }, [examTimetables]);

  const [selectedClass, setSelectedClass] = useState("Class 5");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRow, setSelectdRow] = useState(null);
  const [editFormData, setEditFormData] = useState({
    date: "",
    day: "",
    subject: "",
    room: "",
    time: "",
  });

  const openEditModal = (item, index) => {
    setSelectdRow(index);

    setEditFormData({
      date: item.date,
      day: item.day,
      subject: item.subject,
      room: item.room,
      time: item.time,
    });
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    if (!editFormData.subject.trim()) {
      alert("Subject cannot be empty!");
      return;
    }

    if (!editFormData.room.trim()) {
      alert("Room cannot be empty!");
      return;
    }

    if (!editFormData.time.trim()) {
      alert("Exam time table cannot be empty!");
      return;
    }

    setExamTimetables((prev) => ({
      ...prev,

      [selectedClass]: prev[selectedClass].map((item, index) =>
        index === selectedRow
          ? {
              ...item,
              date: editFormData.date,
              day: editFormData.day,
              subject: editFormData.subject.trim(),
              room: editFormData.room.trim(),
              time: editFormData.time.trim(),
            }
          : item,
      ),
    }));
    saveActivity(
      "Exam timetable updated",
      `${selectedClass} exam schedule for ${editFormData.subject.trim()} was updated.`,
    );
    setShowEditModal(false);
  };
  const classExams = examTimetables[selectedClass] ?? [];

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Academic schedule
              </div>
              <h2 className="text-2xl font-bold text-left tracking-tight text-slate-900 sm:text-3xl">
                Exam Timetable
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                View exam dates, subjects, rooms, and timings by class.
              </p>
            </div>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-600">
              Select class
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="min-w-44 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {Object.keys(defailtExamTimetables).map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiBookOpen size={22} />
            </span>
            <div>
              <p className="text-sm text-slate-500">Scheduled exams</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {classExams.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FiCalendar size={22} />
            </span>
            <div>
              <p className="text-sm text-slate-500">Schedule period</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {classExams.length
                  ? `${classExams[0].date} – ${classExams[classExams.length - 1].date}`
                  : "No exams scheduled"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <FiClock size={22} />
            </span>
            <div>
              <p className="text-sm text-slate-500">First exam</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {classExams[0]?.time ?? "Not scheduled"}
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 sm:px-6">
            <h3 className="font-semibold text-slate-900">{selectedClass} schedule</h3>
            <p className="text-sm text-slate-500">
              {classExams.length} exam{classExams.length === 1 ? "" : "s"} listed
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4 sm:px-6">Date</th>
                  <th className="px-5 py-4">Subject</th>
                  <th className="px-5 py-4">Room</th>
                  <th className="px-5 py-4">Exam time</th>
                  <th className="px-5 py-4 text-right sm:px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classExams.map((item, index) => (
                  <tr
                    key={`${selectedClass}-${item.date}-${item.subject}`}
                    className="transition-colors hover:bg-blue-50/50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                      <p className="font-semibold text-slate-800">{item.date}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{item.day}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex items-center gap-2 font-medium text-slate-800">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        {item.subject}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <FiMapPin className="text-slate-400" />
                        {item.room}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <FiClock className="text-slate-400" />
                        {item.time}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right sm:px-6">
                      <button
                        type="button"
                        aria-label={`Edit ${item.subject} exam`}
                        onClick={() => openEditModal(item, index)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        <FiEdit2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
                {classExams.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No exams are scheduled for this class.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowEditModal(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-exam-title"
            className="my-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
               
                <h3 id="edit-exam-title" className="text-xl text-left font-bold text-slate-900">
                  Edit exam schedule
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Update the date, subject, room, or exam time.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close edit dialog"
                onClick={() => setShowEditModal(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <IoClose size={22} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Date", name: "date" },
                { label: "Day", name: "day" },
                { label: "Subject", name: "subject" },
                { label: "Room", name: "room" },
                { label: "Exam time", name: "time" },
              ].map(({ label, name }) => (
                <label
                  key={name}
                  className={`flex flex-col gap-1.5 text-sm font-medium text-slate-700 ${
                    name === "subject" ? "sm:col-span-2" : ""
                  }`}
                >
                  {label}
                  <input
                    type="text"
                    name={name}
                    value={editFormData[name]}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              ))}
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamTimetable;
