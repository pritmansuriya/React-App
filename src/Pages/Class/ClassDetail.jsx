
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiBookOpen,
  FiGrid,
  FiPlus,
  FiSearch,
  FiUsers,
  FiUser,
  FiMapPin,
  FiCalendar,
  FiFilter,
  FiX,
  FiArrowUpRight,
  FiCheckCircle,
} from "react-icons/fi";

import { useClasses } from "./useClasses";

const ClassDetail = () => {
  const { classes } = useClasses();

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [sortBy, setSortBy] = useState("grade");

  // Safe numeric values
  const getStudents = (item) => Number(item.students) || 0;
  const getCapacity = (item) => Number(item.capacity) || 0;

  // Unique filter options
  const grades = useMemo(
    () => [...new Set(classes.map((item) => item.grade).filter(Boolean))].sort(),
    [classes],
  );

  const academicYears = useMemo(
    () =>
      [...new Set(classes.map((item) => item.academicYear).filter(Boolean))].sort(),
    [classes],
  );

  // Dashboard statistics
  const studentCount = classes.reduce(
    (total, item) => total + getStudents(item),
    0,
  );

  const capacityCount = classes.reduce(
    (total, item) => total + getCapacity(item),
    0,
  );

  const availableSeats = Math.max(capacityCount - studentCount, 0);

  const occupancyRate = capacityCount
    ? Math.min(Math.round((studentCount / capacityCount) * 100), 100)
    : 0;

  const fullClasses = classes.filter(
    (item) => getCapacity(item) > 0 && getStudents(item) >= getCapacity(item),
  ).length;

  // Search + filters
  const filteredClasses = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = classes.filter((item) => {
      const matchesSearch = [
        item.grade,
        item.section,
        item.classTeacher,
        item.room,
        item.academicYear,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesGrade =
        gradeFilter === "All" || item.grade === gradeFilter;

      const matchesYear =
        yearFilter === "All" || item.academicYear === yearFilter;

      return matchesSearch && matchesGrade && matchesYear;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "grade") {
        return String(a.grade || "").localeCompare(
          String(b.grade || ""),
          undefined,
          { numeric: true },
        );
      }

      if (sortBy === "students") {
        return getStudents(b) - getStudents(a);
      }

      if (sortBy === "capacity") {
        return getCapacity(b) - getCapacity(a);
      }

      if (sortBy === "teacher") {
        return String(a.classTeacher || "").localeCompare(
          String(b.classTeacher || ""),
        );
      }

      return 0;
    });

    return result;
  }, [classes, search, gradeFilter, yearFilter, sortBy]);

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setGradeFilter("All");
    setYearFilter("All");
    setSortBy("grade");
  };

  const hasFilters =
    search !== "" || gradeFilter !== "All" || yearFilter !== "All";

  // Enrollment progress color
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "bg-rose-500";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-teal-600";
  };

  const getStatus = (item) => {
    const students = getStudents(item);
    const capacity = getCapacity(item);

    if (item.status === "Inactive") return "Inactive";
    if (capacity > 0 && students >= capacity) return "Full";

    return item.status || "Active";
  };

  const getStatusStyle = (status) => {
    if (status === "Full") {
      return "bg-rose-50 text-rose-700";
    }

    if (status === "Inactive") {
      return "bg-slate-100 text-slate-600";
    }

    return "bg-emerald-50 text-emerald-700";
  };

  return (
    <section className="mx-auto max-w-7xl space-y-7 pb-8 text-left text-slate-900">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-teal-700">
            Academic management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Class management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage classrooms, teachers and student enrollment.
          </p>
        </div>

        <Link
          to="/dashboard/class/add"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 active:scale-[0.98]"
        >
          <FiPlus size={18} />
          Add new class
        </Link>
      </div>

      {/* =================================
          STATISTICS CARDS
      ================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Classes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
              <FiGrid size={21} />
            </div>

            <span className="text-xs font-medium text-slate-400">
              Overview
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total classes
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {classes.length}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            All registered classes
          </p>
        </div>

        {/* Students */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-sky-700">
              <FiUsers size={21} />
            </div>

            <span className="text-xs font-medium text-slate-400">
              Enrollment
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Enrolled students
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {studentCount}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Across all classes
          </p>
        </div>

        {/* Available Seats */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <FiBookOpen size={21} />
            </div>

            <span className="text-xs font-medium text-slate-400">
              Capacity
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Available seats
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {availableSeats}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Out of {capacityCount} total seats
          </p>
        </div>

        {/* Occupancy */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-700">
              <FiCheckCircle size={21} />
            </div>

            <span className="text-xs font-medium text-slate-400">
              Utilization
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Seat occupancy
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {occupancyRate}%
          </h2>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-violet-600 transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* =================================
          ADDITIONAL SUMMARY
      ================================= */}

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Classroom capacity overview
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {fullClasses} {fullClasses === 1 ? "class is" : "classes are"} currently full.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100 sm:w-48">
            <div
              className="h-full rounded-full bg-teal-600 transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>

          <span className="text-sm font-bold text-teal-700">
            {occupancyRate}%
          </span>
        </div>
      </div>

      {/* =================================
          CLASS LIST HEADER
      ================================= */}

      <div className="space-y-4">

        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              All classes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredClasses.length} of {classes.length} classes
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-900"
            >
              <FiX size={16} />
              Clear filters
            </button>
          )}
        </div>

        {/* =================================
            SEARCH AND FILTERS
        ================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FiFilter size={17} className="text-teal-700" />
            Search and filters
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

            {/* Search */}
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search class, teacher, room..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              />
            </div>

            {/* Grade Filter */}
            <select
              value={gradeFilter}
              onChange={(event) => setGradeFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
            >
              <option value="All">All grades</option>

              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>

            {/* Academic Year */}
            <select
              value={yearFilter}
              onChange={(event) => setYearFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
            >
              <option value="All">All academic years</option>

              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
            >
              <option value="grade">Sort by grade</option>
              <option value="students">Most students</option>
              <option value="capacity">Highest capacity</option>
              <option value="teacher">Teacher name</option>
            </select>
          </div>
        </div>
      </div>

      {/* =================================
          CLASSES TABLE
      ================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="font-bold text-slate-800">
              Class directory
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Complete classroom and enrollment information
            </p>
          </div>

          <span className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
            {filteredClasses.length} Results
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse text-left">

            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Class / Section</th>
                <th className="px-5 py-4">Class teacher</th>
                <th className="px-5 py-4">Room</th>
                <th className="px-5 py-4">Enrollment</th>
                <th className="px-5 py-4">Academic year</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredClasses.map((item) => {
                const students = getStudents(item);
                const capacity = getCapacity(item);

                const occupancy = capacity
                  ? Math.min(Math.round((students / capacity) * 100), 100)
                  : 0;

                const status = getStatus(item);

                return (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-teal-50/40"
                  >

                    {/* Class */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-50 font-bold text-teal-700">
                          {item.section || "A"}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {item.grade}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Section {item.section}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Teacher */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-50 text-sky-700">
                          <FiUser size={15} />
                        </span>

                        <span className="text-sm font-medium text-slate-700">
                          {item.classTeacher || "Not assigned"}
                        </span>
                      </div>
                    </td>

                    {/* Room */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <FiMapPin className="text-slate-400" size={15} />
                        {item.room || "Not assigned"}
                      </div>
                    </td>

                    {/* Enrollment */}
                    <td className="px-5 py-4">
                      <div className="min-w-40">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-xs font-bold text-slate-700">
                            {students}/{capacity}
                          </span>

                          <span className="text-xs font-semibold text-slate-500">
                            {occupancy}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(occupancy)}`}
                            style={{ width: `${occupancy}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Academic Year */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <FiCalendar size={15} className="text-slate-400" />
                        {item.academicYear || "—"}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(status)}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {status}
                      </span>
                    </td>

                  </tr>
                );
              })}

              {/* Empty State */}
              {filteredClasses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">

                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                      <FiSearch size={25} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-800">
                      No classes found
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                      We couldn't find any classes matching your search or filters.
                      Try changing your filters.
                    </p>

                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      {hasFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                          Clear filters
                        </button>
                      )}

                      <Link
                        to="/dashboard/class/add"
                        className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
                      >
                        <FiPlus size={16} />
                        Add class
                      </Link>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredClasses.length > 0 && (
          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Showing {filteredClasses.length} of {classes.length} classes
            </p>

            <p className="text-xs font-medium text-slate-500">
              <FiArrowUpRight className="mr-1 inline" size={14} />
              Class management overview
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default ClassDetail;
