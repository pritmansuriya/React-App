import React, { useEffect, useMemo, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  FiCalendar,
  FiCoffee,
  FiEdit2,
  FiSun,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiFilter,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { saveActivity } from "../hooks/useMessages";

const STORAGE_KEY = "lunchMenu";

const defaultLunchData = [
  { id: 1, date: "Aug 10", day: "Monday", mainCourse: "Rice & Dal", sideDish: "Salad" },
  { id: 2, date: "Aug 11", day: "Tuesday", mainCourse: "Pasta", sideDish: "Fruit" },
  { id: 3, date: "Aug 12", day: "Wednesday", mainCourse: "Rice & Curry", sideDish: "Milk" },
  { id: 4, date: "Aug 13", day: "Thursday", mainCourse: "Sandwich", sideDish: "Apple" },
  { id: 5, date: "Aug 14", day: "Friday", mainCourse: "Pizza", sideDish: "Salad" },
];

const emptyForm = {
  date: "",
  day: "Monday",
  mainCourse: "",
  sideDish: "",
};

const LunchMenu = () => {
  const [lunchData, setLunchData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultLunchData;
    } catch {
      return defaultLunchData;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [filterDay, setFilterDay] = useState("All");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lunchData));
  }, [lunchData]);

  const filteredMenus = useMemo(() => {
    return lunchData.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch = [
        item.day,
        item.date,
        item.mainCourse,
        item.sideDish,
      ].some((value) => value.toLowerCase().includes(searchText));

      const matchesDay = filterDay === "All" || item.day === filterDay;

      return matchesSearch && matchesDay;
    });
  }, [lunchData, search, filterDay]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditingId(item.id);
    setFormData({
      date: item.date,
      day: item.day,
      mainCourse: item.mainCourse,
      sideDish: item.sideDish,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const { date, day, mainCourse, sideDish } = formData;

    if (!date.trim() || !mainCourse.trim() || !sideDish.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId !== null) {
      setLunchData((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                date: date.trim(),
                day,
                mainCourse: mainCourse.trim(),
                sideDish: sideDish.trim(),
              }
            : item
        )
      );

      saveActivity(
        "Lunch menu updated",
        `${day}'s menu was updated to ${mainCourse.trim()} with ${sideDish.trim()}.`
      );

      showSuccess("Lunch menu updated successfully!");
    } else {
      const newItem = {
        id: Date.now(),
        date: date.trim(),
        day,
        mainCourse: mainCourse.trim(),
        sideDish: sideDish.trim(),
      };

      setLunchData((prev) => [...prev, newItem]);

      saveActivity(
        "Lunch menu added",
        `${day}'s menu was added: ${mainCourse.trim()} with ${sideDish.trim()}.`
      );

      showSuccess("New lunch menu added successfully!");
    }

    setShowForm(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleDelete = (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${item.day}'s lunch menu?`
    );

    if (!confirmed) return;

    setLunchData((prev) => prev.filter((menu) => menu.id !== item.id));

    saveActivity(
      "Lunch menu deleted",
      `${item.day}'s lunch menu was deleted.`
    );

    showSuccess("Lunch menu deleted successfully!");
  };

  const totalMenus = lunchData.length;
  const totalDays = new Set(lunchData.map((item) => item.day)).size;

  return (
    <div className="min-h-full bg-slate-50/50">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                School food management
              </div>

              <h2 className="text-2xl text-left font-bold tracking-tight text-slate-900 sm:text-3xl">
                Lunch Menu
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Manage daily meals and keep students informed about their food.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <FiPlus size={18} />
              Add New Menu
            </button>
          </div>
        </section>

        {/* Success message */}
        {successMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <FiCheckCircle size={18} />
            {successMessage}
          </div>
        )}

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiCalendar size={22} />
            </span>
            <div>
              <p className="text-sm text-slate-500">Total menu entries</p>
              <h3 className="text-2xl text-left font-bold text-slate-900">{totalMenus}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FiClock size={22} />
            </span>
            <div>
              <p className="text-sm text-slate-500">Days covered</p>
              <h3 className="text-2xl text-left font-bold text-slate-900">{totalDays}</h3>
            </div>
          </div>
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg text-left font-bold text-slate-900">
                  {editingId !== null ? "Edit Lunch Menu" : "Add New Lunch Menu"}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the date and meal details below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <IoClose size={22} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Date
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="e.g. Oct 30"
                    className="rounded-xl border border-slate-200 px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Day
                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Main Course
                  <input
                    type="text"
                    name="mainCourse"
                    value={formData.mainCourse}
                    onChange={handleChange}
                    placeholder="Enter main course"
                    className="rounded-xl border border-slate-200 px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Side Dish
                  <input
                    type="text"
                    name="sideDish"
                    value={formData.sideDish}
                    onChange={handleChange}
                    placeholder="Enter side dish"
                    className="rounded-xl border border-slate-200 px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  <FiCheckCircle size={17} />
                  {editingId !== null ? "Save Changes" : "Add Menu"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Search and Filters */}
        <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search meals, dates or days..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="relative sm:w-52">
            <FiFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <select
              value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="All">All Days</option>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Menu Cards */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900">Daily Meal Schedule</h3>
              <p className="mt-1 text-sm text-left text-slate-500">
                {filteredMenus.length} menu entries found
              </p>
            </div>
          </div>

          {filteredMenus.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredMenus.map((item, index) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-semibold text-slate-900">{item.day}</h4>
                        <p className="text-sm text-left text-slate-500">{item.date}</p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => openEditForm(item)}
                        aria-label={`Edit ${item.day}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-100 hover:text-blue-700"
                      >
                        <FiEdit2 size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        aria-label={`Delete ${item.day}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FiCoffee size={18} />
                      </span>
                      <div>
                        <p className="text-xs text-left font-semibold uppercase tracking-wide text-slate-400">
                          Main Course
                        </p>
                        <p className="mt-1 text-left font-semibold text-slate-800">
                          {item.mainCourse}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <FiSun size={18} />
                      </span>
                      <div>
                        <p className="text-xs text-left font-semibold uppercase tracking-wide text-slate-400">
                          Side Dish
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
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <FiCoffee className="mx-auto mb-3 text-3xl text-slate-300" />
              <h3 className="font-semibold text-slate-800">No menus found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try another search or add a new lunch menu.
              </p>
              <button
                type="button"
                onClick={openAddForm}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <FiPlus size={17} />
                Add Menu
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LunchMenu;
