import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiCalendar, FiCoffee, FiEdit2, FiSun } from "react-icons/fi";
import { saveActivity } from "../hooks/useMessages";

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
  const openEditForm = (index = selectedIndex) => {
    const selectedLunch = lunchData[index];
    setSelectedIndex(index);

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
    saveActivity(
      "Lunch menu updated",
      `${editFormData.day}'s menu was updated to ${editFormData.mainCourse.trim()} with ${editFormData.sideDish.trim()}.`,
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
                Weekly meal plan
              </div>
              <h2 className="text-2xl text-left font-bold tracking-tight text-slate-900 sm:text-3xl">
                Lunch Menu
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                See what’s being served each day this week.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FiCalendar size={19} />
              </span>
              <div>
                <p className="text-xs font-medium text-slate-500">Menu days</p>
                <p className="text-lg font-bold text-slate-900">{lunchData.length}</p>
              </div>
            </div>
          </div>
        </section>

        {showEditForm && (
          <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit lunch menu</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Update the selected day’s main course and side dish.
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

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Select day
                <select
                  value={selectedIndex}
                  onChange={(e) => {
                    const index = Number(e.target.value);
                    setSelectedIndex(index);
                    setEditFormData({ ...lunchData[index] });
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {lunchData.map((item, index) => (
                    <option key={`${item.date}-${item.day}`} value={index}>
                      {item.day}, {item.date}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Main course
                <input
                  type="text"
                  name="mainCourse"
                  value={editFormData.mainCourse}
                  onChange={handleFormChange}
                  placeholder="Enter main course"
                  className="rounded-xl border border-slate-200 px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Side dish
                <input
                  type="text"
                  name="sideDish"
                  value={editFormData.sideDish}
                  onChange={handleFormChange}
                  placeholder="Enter side dish"
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

        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900">This week’s menu</h3>
              <p className="mt-1 text-sm text-slate-500">
                Daily meals prepared for students
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {lunchData.length} days
            </span>
          </div>

          {lunchData.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {lunchData.map((item, index) => (
                <article
                  key={`${item.date}-${item.day}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-semibold text-slate-900">{item.day}</h4>
                        <p className="text-sm text-slate-500">{item.date}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Edit ${item.day} lunch menu`}
                      onClick={() => openEditForm(index)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                      <FiEdit2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FiCoffee size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Main course
                        </p>
                        <p className="mt-1 text-left font-semibold text-slate-800">
                          {item.mainCourse}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <FiSun size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Side dish
                        </p>
                        <p className="mt-1 text-left font-medium text-slate-700">
                          {item.sideDish}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
              No lunch menu has been added yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LunchMenu;
