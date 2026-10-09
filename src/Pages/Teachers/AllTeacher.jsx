import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiPlus,
  FiSearch,
  FiUsers,
  FiX,
} from "react-icons/fi";
import TeacherForm from "./TeacherForm";
import { useTeachers } from "./useTeachers";
import { saveActivity } from "../hooks/useMessages";

const formatJoiningDate = (dateString) => {
  if (!dateString) return "Not set";
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en", {
    month: "short",
    year: "numeric",
  });
};

export const AllTeachers = () => {
  const { teachers, addTeacher } = useTeachers();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!isDialogOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsDialogOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [isDialogOpen]);

  const normalizedSearch = search.trim().toLowerCase();
  const visibleTeachers = teachers.filter((teacher) =>
    [teacher.name, teacher.email, teacher.subject, teacher.phone]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch),
  );
  const activeCount = teachers.filter((teacher) => teacher.status === "Active").length;
  const subjectCount = new Set(teachers.map((teacher) => teacher.subject)).size;

  const handleAddTeacher = (teacherData) => {
    const teacher = addTeacher(teacherData);
    setAnnouncement(`${teacher.name} added to the teacher directory.`);
    saveActivity("Teacher added", `${teacher.name} was added to the teacher directory.`);
    setIsDialogOpen(false);
  };

  return (
    <section className="mx-auto max-w-7xl text-left text-slate-900">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
            Faculty directory
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">All teachers</h1>
          <p className="mt-2 text-sm text-slate-500">
            Teacher profiles and contact details for your school.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
        >
          <FiPlus aria-hidden="true" size={17} />
          Add teacher
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex items-center gap-3 py-4 sm:pr-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-teal-50 text-teal-700">
            <FiUsers aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Total teachers</p>
            <p className="text-xl font-semibold text-slate-900">{teachers.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:px-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-50 text-emerald-700">
            <FiBriefcase aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Currently active</p>
            <p className="text-xl font-semibold text-slate-900">{activeCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:pl-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-amber-50 text-amber-700">
            <FiBookOpen aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Subjects covered</p>
            <p className="text-xl font-semibold text-slate-900">{subjectCount}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Faculty members</h2>
          <p className="mt-1 text-sm text-slate-500">
            {visibleTeachers.length} of {teachers.length} teachers
          </p>
        </div>
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search teachers</span>
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, subject, email"
            className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-195 border-collapse text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                <th scope="col" className="px-5 py-3.5">Teacher</th>
                <th scope="col" className="px-5 py-3.5">Subject</th>
                <th scope="col" className="px-5 py-3.5">Contact</th>
                <th scope="col" className="px-5 py-3.5">Qualification</th>
                <th scope="col" className="px-5 py-3.5">Joined</th>
                <th scope="col" className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleTeachers.map((teacher, index) => (
                <tr key={teacher.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-md text-xs font-bold ${
                          ["bg-teal-100 text-teal-800", "bg-amber-100 text-amber-800", "bg-sky-100 text-sky-800"][index % 3]
                        }`}
                      >
                        {teacher.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <span className="whitespace-nowrap text-sm font-semibold text-slate-900">
                        {teacher.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">{teacher.subject}</td>
                  <td className="px-5 py-4">
                    <div className="space-y-1 text-xs text-slate-500">
                      <p className="flex items-center gap-1.5 whitespace-nowrap">
                        <FiMail aria-hidden="true" /> {teacher.email}
                      </p>
                      <p className="flex items-center gap-1.5 whitespace-nowrap">
                        <FiPhone aria-hidden="true" /> {teacher.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{teacher.qualification || "—"}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatJoiningDate(teacher.joiningDate)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        teacher.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-800"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {teacher.status}
                    </span>
                  </td>
                </tr>
              ))}
              {visibleTeachers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <p className="text-sm font-semibold text-slate-700">No teachers found</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try another search or add a new teacher.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>

      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsDialogOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-teacher-title"
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-lg bg-white p-5 shadow-2xl sm:max-w-2xl sm:rounded-lg sm:p-7"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
                  Faculty directory
                </p>
                <h2 id="add-teacher-title" className="mt-1 text-2xl font-semibold text-slate-900">
                  Add a teacher
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the teacher’s details to create their profile.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                aria-label="Close add teacher dialog"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <FiX size={20} aria-hidden="true" />
              </button>
            </div>
            <TeacherForm onSubmit={handleAddTeacher} onCancel={() => setIsDialogOpen(false)} />
          </section>
        </div>
      )}
    </section>
  );
};

export default AllTeachers;