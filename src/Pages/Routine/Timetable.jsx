import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

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

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const openEditForm = (day, subject, periodIndex) => {
    if (subject === "Break") {
      alert(' Break period cannot be edited!');
      return;
    }

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

    if (editFormData.subject === 'Break') {
      alert(' Cannot set subject as Break!');
      return;
    }

    const { day, periodIndex, subject } = editFormData;

    setTimetable(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData[selectedClass][day][periodIndex] = subject.trim();
      return newData;
    });

    setShowEditForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 relative">
          <div className="absolute right-0 top-0 flex gap-2">
            <button
              onClick={() => setShowEditForm(!showEditForm)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                showEditForm 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {showEditForm ? ' Editing' : ' Edit'}
            </button>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="px-3 py-1 border-0 bg-transparent text-gray-700 font-medium rounded-md outline-none cursor-pointer"
              >
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
                <option value="10-C">10-C</option>
                <option value="11-A">11-A</option>
                <option value="11-B">11-B</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Class Time Table</h1>
            <p className="text-sm text-gray-500 mt-3">
              Academic Year 2025-26 - {selectedClass}
            </p>
          </div>
        </div>

        {/* Edit Form */}
        {showEditForm && (
          <div className="mb-6 bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800"> Edit Subject</h2>
              <button
                onClick={() => setShowEditForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <IoClose />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-left font-medium text-gray-700 mb-1">
                  Select Day
                </label>
                <select
                  value={editFormData.day}
                  onChange={handleDayChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-left font-medium text-gray-700 mb-1">
                  Select Period
                </label>
                <select
                  value={editFormData.periodIndex}
                  onChange={handlePeriodChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {periods.map((period, index) => (
                    <option key={index} value={index}>{period}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subject"
                  value={editFormData.subject}
                  onChange={handleFormChange}
                  placeholder="Enter subject name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Time Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border-r border-gray-700">
                    Time
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border-r border-gray-700 last:border-r-0"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {periods.map((period, periodIndex) => {
                  const isBreakPeriod = days.some(
                    (day) => currentTimetable[day][periodIndex] === "Break",
                  );

                  return (
                    <tr
                      key={periodIndex}
                      className={`hover:bg-gray-50 transition ${
                        isBreakPeriod ? "bg-red-50" : ""
                      }`}
                    >
                      <td
                        className={`px-4 py-3 text-sm font-medium border-r border-gray-200 whitespace-nowrap ${
                          isBreakPeriod
                            ? "text-red-600 font-bold bg-red-50"
                            : "text-gray-600 bg-gray-50"
                        }`}
                      >
                        {period}
                      </td>

                      {days.map((day) => {
                        const subject = currentTimetable[day][periodIndex];
                        const isBreak = subject === "Break";

                        return (
                          <td
                            key={`${day}-${periodIndex}`}
                            className={`px-4 py-3 text-center border-r border-gray-200 last:border-r-0 ${
                              isBreakPeriod ? "bg-red-50" : ""
                            } ${!isBreak && showEditForm ? 'cursor-pointer hover:bg-blue-50' : ''}`}
                            onClick={() => {
                              if (showEditForm) {
                                openEditForm(day, subject, periodIndex);
                              }
                            }}
                          >
                            {isBreak ? (
                              <span className="text-sm font-bold text-red-600">
                                Break
                              </span>
                            ) : (
                              <span className={`text-sm font-medium ${
                                showEditForm ? 'text-blue-600' : 'text-gray-700'
                              }`}>
                                {subject}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;