import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const LunchMenu = () => {
  // Lunch menu data
  const defaultLunchData = [
    {
      date: "Aug 10",
      day: "Monday",
      mainCourse: "Rice & Dal",
      sideDish: "Salad",
    },
    {
      date: "Aug 11",
      day: "Tuesday",
      mainCourse: "Pasta",
      sideDish: "Fruit",
    },
    {
      date: "Aug 12",
      day: "Wednesday",
      mainCourse: "Rice & Curry",
      sideDish: "Milk",
    },
    {
      date: "Aug 13",
      day: "Thursday",
      mainCourse: "Sandwich",
      sideDish: "Apple",
    },
    {
      date: "Aug 14",
      day: "Friday",
      mainCourse: "Pizza",
      sideDish: "Salad",
    },
  ];

  const [lunchData, setLunchData] = useState(() => {
    const savedData = localStorage.getItem("lunchMenu");

    return savedData ? JSON.parse(savedData) : defaultLunchData;
  });

  useEffect(() => {
    localStorage.setItem("lunchMenu", JSON.stringify(lunchData));
  }, [lunchData]);

  // Show/hide edit form
  const [showEditForm, setShowEditForm] = useState(false);

  // Selected row
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Temporary form data
  const [editFormData, setEditFormData] = useState({
    date: "",
    day: "",
    mainCourse: "",
    sideDish: "",
  });

  // Open edit form
  const openEditForm = () => {
    const selectedLunch = lunchData[selectedIndex];

    setEditFormData({
      date: selectedLunch.date,
      day: selectedLunch.day,
      mainCourse: selectedLunch.mainCourse,
      sideDish: selectedLunch.sideDish,
    });

    setShowEditForm(true);
  };

  // Handle input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updated value
  const handleSaveEdit = () => {
    if (!editFormData.mainCourse.trim()) {
      alert("Main Course cannot be empty!");
      return;
    }

    if (!editFormData.sideDish.trim()) {
      alert("Side Dish cannot be empty!");
      return;
    }

    setLunchData((prev) => {
      const newData = [...prev];

      newData[selectedIndex] = {
        ...newData[selectedIndex],
        mainCourse: editFormData.mainCourse.trim(),
        sideDish: editFormData.sideDish.trim(),
      };

      return newData;
    });

    setShowEditForm(false);
  };

  return (
    <div className="bg-white min-h-screen rounded-2xl shadow-sm p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Lunch Schedule</h2>

          {/* Edit Button */}
          <button
            onClick={openEditForm}
            className="px-5 py-2.5 bg-purple-600 text-white rounded-xl
                     hover:bg-purple-700 transition-all duration-200"
          >
            Edit
          </button>
        </div>

        {/* Edit Form */}
        {showEditForm && (
          <div className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-800">
                Edit Lunch Menu
              </h3>

              <button
                onClick={() => setShowEditForm(false)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                <IoClose />
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Select Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>

                <select
                  value={selectedIndex}
                  onChange={(e) => {
                    const index = Number(e.target.value);

                    setSelectedIndex(index);

                    setEditFormData({
                      date: lunchData[index].date,
                      day: lunchData[index].day,
                      mainCourse: lunchData[index].mainCourse,
                      sideDish: lunchData[index].sideDish,
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl
                     bg-white outline-none focus:border-purple-500"
                >
                  {lunchData.map((item, index) => (
                    <option key={index} value={index}>
                      {item.date} - {item.day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Main Menu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Menu
                </label>

                <input
                  type="text"
                  name="mainCourse"
                  value={editFormData.mainCourse}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl
                     bg-white outline-none focus:border-purple-500"
                  placeholder="Enter main menu"
                />
              </div>

              {/* Side Dish */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Side Dish
                </label>

                <input
                  type="text"
                  name="sideDish"
                  value={editFormData.sideDish}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl
                     bg-white outline-none focus:border-purple-500"
                  placeholder="Enter side dish"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowEditForm(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200
                   text-gray-600 hover:bg-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                className="px-5 py-2.5 rounded-xl bg-purple-600
                   text-white hover:bg-purple-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-800 border-b border-gray-200">
                <th className="text-center px-5 py-4 text-xl font-semibold text-white">
                  Date
                </th>

                <th className="text-center px-5 py-4 text-xl font-semibold text-white">
                  Day
                </th>

                <th className="text-center px-5 py-4 text-xl font-semibold text-white">
                  Main Menu
                </th>

                <th className="text-center px-5 py-4 text-xl font-semibold text-white">
                  Side Dish
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {lunchData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4 text-gray-700">{item.date}</td>

                  <td className="px-5 py-4 text-gray-700">{item.day}</td>

                  <td className="px-5 py-4 font-medium text-gray-800">
                    {item.mainCourse}
                  </td>

                  <td className="px-5 py-4 text-gray-700">{item.sideDish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LunchMenu;
