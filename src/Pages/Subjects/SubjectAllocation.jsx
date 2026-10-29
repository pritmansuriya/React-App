
import { useEffect, useMemo, useState } from "react";
import {
  FiBookOpen,
  FiCheck,
  FiGrid,
  FiPlus,
  FiSearch,
  FiUsers,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiX,
  FiLayers,
  FiCheckCircle,
  FiAlertCircle,
  FiFilter,
} from "react-icons/fi";

import { useClasses } from "../Class/useClasses";
import { useTeachers } from "../Teachers/useTeachers";
import { saveActivity } from "../hooks/useMessages";

const ALLOCATION_STORAGE_KEY = "schoolSubjectAllocations";

const defaultSubjects = [
  { id: 1, name: "Mathematics", code: "MAT101", status: "Active" },
  { id: 2, name: "Science", code: "SCI101", status: "Active" },
  { id: 3, name: "English", code: "ENG101", status: "Active" },
  { id: 4, name: "History", code: "HIS101", status: "Active" },
];

const readStorage = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const createId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `allocation-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const initialForm = {
  subjectId: "",
  classId: "",
  teacherId: "",
  academicYear: "2026-27",
};

const SubjectAllocation = () => {
  const { classes = [] } = useClasses();
  const { teachers = [] } = useTeachers();

  const [subjects, setSubjects] = useState(() =>
    readStorage("schoolSubjects", defaultSubjects)
  );

  const [allocations, setAllocations] = useState(() =>
    readStorage(ALLOCATION_STORAGE_KEY, [])
  );

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const activeSubjects = subjects.filter(
    (subject) => subject.status === "Active"
  );

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active"
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        ALLOCATION_STORAGE_KEY,
        JSON.stringify(allocations)
      );
    } catch (storageError) {
      console.error("Unable to save assignments:", storageError);
    }
  }, [allocations]);

  useEffect(() => {
    const syncStoredData = (event) => {
      if (event.key === "schoolSubjects") {
        setSubjects(readStorage("schoolSubjects", defaultSubjects));
      }

      if (event.key === ALLOCATION_STORAGE_KEY) {
        setAllocations(readStorage(ALLOCATION_STORAGE_KEY, []));
      }
    };

    window.addEventListener("storage", syncStoredData);

    return () => {
      window.removeEventListener("storage", syncStoredData);
    };
  }, []);

  useEffect(() => {
    if (!notice && !error) return;

    const timer = setTimeout(() => {
      setNotice("");
      setError("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [notice, error]);

  const availableYears = useMemo(
    () => [
      ...new Set(allocations.map((item) => item.academicYear).filter(Boolean)),
    ].sort(),
    [allocations]
  );

  const visibleAllocations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allocations.filter((item) => {
      const matchesSearch = [
        item.subjectName,
        item.code,
        item.className,
        item.teacherName,
        item.academicYear,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesClass =
        classFilter === "all" ||
        String(item.classId) === String(classFilter);

      const matchesTeacher =
        teacherFilter === "all" ||
        String(item.teacherId) === String(teacherFilter);

      const matchesYear =
        yearFilter === "all" || item.academicYear === yearFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesTeacher &&
        matchesYear
      );
    });
  }, [allocations, search, classFilter, teacherFilter, yearFilter]);

  const stats = [
    {
      label: "Active Subjects",
      value: activeSubjects.length,
      icon: FiBookOpen,
      color: "bg-teal-50 text-teal-700",
      description: "Available for allocation",
    },
    {
      label: "Total Classes",
      value: classes.length,
      icon: FiGrid,
      color: "bg-blue-50 text-blue-700",
      description: "Registered classes",
    },
    {
      label: "Active Teachers",
      value: activeTeachers.length,
      icon: FiUsers,
      color: "bg-violet-50 text-violet-700",
      description: "Available teachers",
    },
    {
      label: "Assignments",
      value: allocations.length,
      icon: FiLayers,
      color: "bg-amber-50 text-amber-700",
      description: "Total subject allocations",
    },
  ];

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setNotice("");
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = activeSubjects.find(
      (item) => String(item.id) === String(form.subjectId)
    );

    const classItem = classes.find(
      (item) => String(item.id) === String(form.classId)
    );

    const teacher = activeTeachers.find(
      (item) => String(item.id) === String(form.teacherId)
    );

    const academicYear = form.academicYear.trim();

    if (!subject || !classItem || !teacher) {
      setError("Please select an active subject, class, and teacher.");
      return;
    }

    if (!academicYear) {
      setError("Please enter the academic year.");
      return;
    }

    const className = `${classItem.grade} - ${classItem.section}`;

    const duplicate = allocations.some(
      (item) =>
        item.id !== editingId &&
        String(item.subjectId) === String(subject.id) &&
        String(item.classId) === String(classItem.id) &&
        item.academicYear === academicYear
    );

    if (duplicate) {
      setError(
        "This subject is already assigned to that class for this academic year."
      );
      return;
    }

    const allocation = {
      id: editingId || createId(),
      subjectId: subject.id,
      subjectName: subject.name,
      code: subject.code,
      classId: classItem.id,
      className,
      teacherId: teacher.id,
      teacherName: teacher.name,
      academicYear,
    };

    const updatedAllocations = editingId
      ? allocations.map((item) =>
          item.id === editingId ? allocation : item
        )
      : [allocation, ...allocations];

    setAllocations(updatedAllocations);

    try {
      saveActivity(
        editingId ? "Subject assignment updated" : "Subject assigned",
        `${subject.name} was assigned to ${className} with ${teacher.name} for ${academicYear}.`
      );
    } catch (activityError) {
      console.error("Unable to save activity:", activityError);
    }

    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
    setError("");

    setNotice(
      editingId
        ? "Assignment updated successfully."
        : `${subject.name} assigned to ${className} successfully.`
    );
  };

  const handleEdit = (item) => {
    setForm({
      subjectId: String(item.subjectId),
      classId: String(item.classId),
      teacherId: String(item.teacherId),
      academicYear: item.academicYear || "2026-27",
    });

    setEditingId(item.id);
    setShowForm(true);
    setError("");
    setNotice("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (item) => {
    const confirmed = window.confirm(
      `Delete the ${item.subjectName} assignment for ${item.className}?`
    );

    if (!confirmed) return;

    const updatedAllocations = allocations.filter(
      (allocation) => allocation.id !== item.id
    );

    setAllocations(updatedAllocations);

    try {
      saveActivity(
        "Subject assignment deleted",
        `${item.subjectName} assignment for ${item.className} was deleted.`
      );
    } catch (activityError) {
      console.error("Unable to save activity:", activityError);
    }

    if (editingId === item.id) {
      resetForm();
    }

    setNotice("Assignment deleted successfully.");
    setError("");
  };

  const exportCSV = () => {
    if (visibleAllocations.length === 0) {
      setError("There are no assignments to export.");
      return;
    }

    const headers = [
      "Subject",
      "Subject Code",
      "Class",
      "Teacher",
      "Academic Year",
    ];

    const rows = visibleAllocations.map((item) => [
      item.subjectName,
      item.code,
      item.className,
      item.teacherName,
      item.academicYear,
    ]);

    const csvCell = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "subject-allocations.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    setNotice("Assignments exported successfully.");
    setError("");
  };

  const fieldClassName =
    "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

  const selectClassName =
    "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

  return (
    <section className="mx-auto max-w-7xl space-y-6 text-left text-slate-900">

      {/* Notifications */}
      {(notice || error) && (
        <div
          role={error ? "alert" : "status"}
          className={`fixed right-4 top-4 z-50 flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${
            error
              ? "border-rose-200 bg-white text-rose-700"
              : "border-emerald-200 bg-white text-emerald-700"
          }`}
        >
          {error ? (
            <FiAlertCircle className="mt-0.5 shrink-0" size={19} />
          ) : (
            <FiCheckCircle className="mt-0.5 shrink-0" size={19} />
          )}

          <p className="flex-1 text-sm font-medium">
            {error || notice}
          </p>

          <button
            type="button"
            onClick={() => {
              setNotice("");
              setError("");
            }}
            aria-label="Dismiss notification"
            className="rounded-md p-1 hover:bg-slate-100"
          >
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            Academic Management
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Subject Allocation
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage subjects, classes, and teacher assignments for each
            academic year.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <FiDownload size={17} />
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setForm(initialForm);
                setEditingId(null);
                setShowForm(true);
                setError("");
                setNotice("");
              }
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-700/20"
          >
            {showForm ? <FiX size={17} /> : <FiPlus size={18} />}
            {showForm ? "Close form" : "New assignment"}
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${stat.color}`}
                >
                  <Icon size={22} />
                </span>
              </div>

              <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Assignment form */}
      {showForm && (
        <section className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-bold text-slate-900">
                {editingId ? "Edit assignment" : "Create new assignment"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Complete the fields below to manage the allocation.
              </p>
            </div>

            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700">
              {editingId ? <FiEdit2 size={19} /> : <FiPlus size={21} />}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <label className="block text-sm font-semibold text-slate-700">
                Subject <span className="text-rose-500">*</span>

                <select
                  required
                  name="subjectId"
                  value={form.subjectId}
                  onChange={updateField}
                  className={fieldClassName}
                >
                  <option value="">Select subject</option>

                  {activeSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} · {subject.code}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Class and section <span className="text-rose-500">*</span>

                <select
                  required
                  name="classId"
                  value={form.classId}
                  onChange={updateField}
                  className={fieldClassName}
                >
                  <option value="">Select class</option>

                  {classes.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.grade} · Section {classItem.section}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Teacher <span className="text-rose-500">*</span>

                <select
                  required
                  name="teacherId"
                  value={form.teacherId}
                  onChange={updateField}
                  className={fieldClassName}
                >
                  <option value="">Select teacher</option>

                  {activeTeachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Academic year <span className="text-rose-500">*</span>

                <input
                  required
                  name="academicYear"
                  value={form.academicYear}
                  onChange={updateField}
                  placeholder="e.g. 2026-27"
                  maxLength={20}
                  className={fieldClassName}
                />
              </label>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 flex items-center gap-2 text-sm font-medium text-rose-600"
              >
                <FiAlertCircle size={17} />
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-700/20"
              >
                <FiCheck size={17} />
                {editingId ? "Save changes" : "Assign subject"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Assignment list */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Current Assignments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing {visibleAllocations.length} of {allocations.length} assignments
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
            <FiCheckCircle size={15} />
            Assignment overview
          </span>
        </div>

        {/* Search and filters */}
        <div className="space-y-4 border-b border-slate-100 bg-slate-50/50 p-4 sm:p-5">
          <label className="relative block">
            <span className="sr-only">Search assignments</span>

            <FiSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search subject, code, class, teacher, or year..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
            />
          </label>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <FiFilter size={15} />
            Filter assignments
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <select
              aria-label="Filter by class"
              value={classFilter}
              onChange={(event) => setClassFilter(event.target.value)}
              className={selectClassName}
            >
              <option value="all">All classes</option>

              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.grade} - {classItem.section}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by teacher"
              value={teacherFilter}
              onChange={(event) => setTeacherFilter(event.target.value)}
              className={selectClassName}
            >
              <option value="all">All teachers</option>

              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by academic year"
              value={yearFilter}
              onChange={(event) => setYearFilter(event.target.value)}
              className={selectClassName}
            >
              <option value="all">All academic years</option>

              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {(search || classFilter !== "all" ||
            teacherFilter !== "all" || yearFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setClassFilter("all");
                setTeacherFilter("all");
                setYearFilter("all");
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900"
            >
              <FiX size={15} />
              Clear all filters
            </button>
          )}
        </div>

        {visibleAllocations.length === 0 ? (
          <div className="px-5 py-16 text-center sm:px-8">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
              <FiBookOpen size={25} />
            </span>

            <h3 className="mt-4 font-bold text-slate-800">
              {allocations.length === 0
                ? "No assignments yet"
                : "No matching assignments"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              {allocations.length === 0
                ? "Create your first subject assignment using the button above."
                : "Try another search term or clear your filters to see more results."}
            </p>

            {allocations.length === 0 && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
              >
                <FiPlus size={17} />
                Create assignment
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th scope="col" className="px-5 py-4">Subject</th>
                  <th scope="col" className="px-5 py-4">Class</th>
                  <th scope="col" className="px-5 py-4">Teacher</th>
                  <th scope="col" className="px-5 py-4">Academic Year</th>
                  <th scope="col" className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {visibleAllocations.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-teal-50/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700">
                          <FiBookOpen size={18} />
                        </span>

                        <div>
                          <p className="whitespace-nowrap text-sm font-bold text-slate-800">
                            {item.subjectName}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        {item.className}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-50 text-xs font-bold text-violet-700">
                          {(item.teacherName || "T")
                            .trim()
                            .charAt(0)
                            .toUpperCase()}
                        </span>

                        <span className="text-sm font-medium text-slate-700">
                          {item.teacherName}
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                        <FiCheck className="text-emerald-600" size={16} />
                        {item.academicYear}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          title="Edit assignment"
                          aria-label={`Edit ${item.subjectName} assignment`}
                          onClick={() => handleEdit(item)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <FiEdit2 size={16} />
                        </button>

                        <button
                          type="button"
                          title="Delete assignment"
                          aria-label={`Delete ${item.subjectName} assignment`}
                          onClick={() => handleDelete(item)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            {visibleAllocations.length} assignment
            {visibleAllocations.length === 1 ? "" : "s"} displayed
          </span>

          <span className="inline-flex items-center gap-1.5">
            <FiCheckCircle className="text-emerald-600" size={14} />
            Changes saved in this browser
          </span>
        </div>
      </section>
    </section>
  );
};

export default SubjectAllocation;
