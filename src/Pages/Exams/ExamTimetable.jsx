import { time } from "framer-motion";
import { pre } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { date } from "yup";

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
      subject: "Histroy",
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
      subject: "Histroy",
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
      subject: "Histroy",
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
      subject: "Histroy",
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
      subject: "Histroy",
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
    setShowEditModal(false);
  };
  return (
    <div className="min-h-screen bg-white rounded-2xl shadow-sm p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Exam Timetable
          </h2>
          {/* Drop down */}
          <div className="flex items-center gap-3">
            {/* <label className='text-sm font-medium text-gray-600'>
              Select  Class
            </label> */}

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none "
            >
              <option value="Class 5">Class 5</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-5 py-4 text-center text-lg font-semibold text-white">
                  Date
                </th>

                <th className="px-5 py-4 text-center text-lg font-semibold text-white">
                  Day
                </th>

                <th className="px-5 py-4 text-center text-lg font-semibold text-white">
                  Subject
                </th>

                <th className="px-5 py-4 text-center text-lg font-semibold text-white">
                  Room
                </th>

                <th className="px-5 py-4 text-center text-lg font-semibold text-white">
                  Exam Time
                </th>

                <th className="px-5 py-4 text-center text-lg font-semibold text-white">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {examTimetables[selectedClass].map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4 items-center text-gray-700">
                    {item.date}
                  </td>

                  <td className="px-5 py-4 items-center text-gray-700">
                    {item.day}
                  </td>

                  <td className="px-5 py-4 items-center text-gray-700">
                    {item.subject}
                  </td>

                  <td className="px-5 py-4 items-center text-gray-700">
                    {item.room}
                  </td>

                  <td className="px-5 py-4 items-center text-gray-700">
                    {item.time}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <button onClick={() => openEditModal(item, index)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition"
                    >
                      <FiEdit2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EditModal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    Edit Exam Timetable
                  </h3>

                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-800 text-2xl"
                  >
                    <IoClose />
                  </button>
                </div>

                {/* Date */}
                <div className="mb-4">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Date
                  </label>

                  <input
                    type="text"
                    name="date"
                    value={editFormData.date}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                {/* Day */}
                <div className="mb-4">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Day
                  </label>

                  <input
                    type="text"
                    name="day"
                    value={editFormData.day}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                {/* subject */}
                <div className="mb-4">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={editFormData.subject}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                {/* Room */}
                <div className="mb-4">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Room
                  </label>

                  <input
                    type="text"
                    name="room"
                    value={editFormData.room}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                {/* Time */}
                <div className="mb-4">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Exam Time
                  </label>

                  <input
                    type="text"
                    name="time"
                    value={editFormData.time}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveEdit}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamTimetable;
