import { time } from "framer-motion";
import { title } from "framer-motion/client";
import React, { useState } from "react";
import {
  FaBookOpen,
  FaBullhorn,
  FaClock,
  FaExclamationCircle,
  FaFutbol,
  FaPlus,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { date } from "yup";

const defaultNotice = [
  {
    id: 1,
    category: "IMPORTANT",
    title: "Parent-Teacher Meeting",
    description: "The PTM will be held on Saturday at 10:00 AM.",
    date: "Aug 13, 2026",
    audience: "Parents",
    time: "10:00 AM",
  },

  {
    id: 2,
    category: "ACADEMIC",
    title: "Final Exam Timetable Released",
    description: "The examination timetable for Classes 5-9 is available.",
    date: "Aug 12, 2026",
    audience: "Students",
    time: "09:00 AM",
  },

  {
    id: 3,
    category: "EVENT",
    title: "Annual Sports Day",
    description: "Students are requested to register before Friday.",
    date: "Aug 10, 2026",
    audience: "All Students",
    time: "08:30 AM",
  },
];
const Notice1 = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState(() => {
    const savedNotices = localStorage.getItem("schoolNotices");

    return savedNotices ? JSON.parse(savedNotices) : defaultNotice;
  });
  const [newNotice, setNewNotice] = useState({
    category: "",
    title: "",
    description: "",
    date: "",
    audience: "",
    time: "",
  });

  const handleChange = (e) => {
    setNewNotice({
      ...newNotice,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublish = (e) => {
    e.preventDefault();

    if (
      !newNotice.category ||
      !newNotice.title ||
      !newNotice.description ||
      !newNotice.date ||
      !newNotice.audience ||
      !newNotice.time
    ) {
      alert("Please fill all fields.");
      return;
    }

    const notice = {
      id: Date.now(),
      category: newNotice.category,
      title: newNotice.title,
      description: newNotice.description,
      date: newNotice.date,
      audience: newNotice.audience,
      time: newNotice.time,
    };

    const updatedNotice = [...notices, notice];

    setNewNotice(updatedNotice);
    localStorage.setItem("schoolNotices", JSON.stringify(updatedNotice));

    setNewNotice({
      category: "",
      title: "",
      description: "",
      date: "",
      audience: "",
      time: "",
    });

    setShowModal(false);
  };
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        {/* <div className='max-w-5xl mx-auto'> */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <FaBullhorn className="text-purple-600 text-lg" />
              </div>

              <div>
                <h2 className="text-xl text-left font-semibold text-gray-800">
                  Notice Board
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Latest school announcements and notices
                </p>
              </div>
            </div>

            {/* Right side - Create Notice */}
            <button
              onClick={() => navigate("/dashboard/notice/2")}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
            >
              <FaPlus className="text-xs" />
              Add Notice
            </button>
          </div>
        </div>
        {/* Notices */}
        {notices.map((notice, index) => (
          <div
            key={notice.id}
            className={`px-6 py-5 ${
              index !== notices.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            {/* Category */}
            <div className="flex items-center justify-between  mb-4">
              <div>
                {notice.category === "IMPORTANT" && (
                  <div className="flex items-center gap-2">
                    <FaExclamationCircle className="text-red-500 text-sm" />

                    <span className="text-xl font-bold text-red-500 tracking-wide">
                      {notice.category}
                    </span>
                  </div>
                )}

                {notice.category === "ACADEMIC" && (
                  <div className="flex items-center gap-2">
                    <FaBookOpen className="text-purple-500 text-sm" />

                    <span className="text-xl font-bold text-purple-500 tracking-wide">
                      {notice.category}
                    </span>
                  </div>
                )}

                {notice.category === "EVENT" && (
                  <div className="flex items-center gap-2">
                    <FaFutbol className="text-green-500 text-sm" />

                    <span className="text-xl font-bold text-green-500 tracking-wide">
                      {notice.category}
                    </span>
                  </div>
                )}

                {/* Other Category */}
                {notice.category !== "IMPORTANT" &&
                  notice.category !== "ACADEMIC" &&
                  notice.category !== "EVENT" && (
                    <div className="flex items-center gap-2">
                      <FaBullhorn className="text-blue-500 text-sm" />

                      <span className="text-xl  font-bold text-blue-500 tracking-wide">
                        {notice.category}
                      </span>
                    </div>
                  )}
              </div>

              {/* Date */}
              <span className="text-sm text-gray-400">{notice.date}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg text-left font-semibold text-gray-800 mb-2">
              {notice.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-left text-gray-500 leading-6">
              {notice.description}
            </p>

            {/* Audience Time */}
            <div className="flex items-center gap-6 mt-5">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaUsers className="text-gray-400" />
                <span>{notice.audience}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaClock className="text-gray-400" />
                <span>{notice.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notice1;
