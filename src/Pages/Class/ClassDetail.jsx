import { useState } from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiGrid, FiPlus, FiSearch, FiUsers } from "react-icons/fi";
import { useClasses } from "./useClasses";

const ClassDetail = () => {
  const { classes } = useClasses();
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const filteredClasses = classes.filter((item) =>
    [item.grade, item.section, item.classTeacher, item.room]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
  const studentCount = classes.reduce((total, item) => total + Number(item.students || 0), 0);
  const capacityCount = classes.reduce((total, item) => total + Number(item.capacity || 0), 0);

  return (
    <section className="mx-auto max-w-7xl text-left text-slate-900">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
            Academic management
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Class details</h1>
          <p className="mt-2 text-sm text-slate-500">
            Classes, homeroom teachers, and enrollment for the current year.
          </p>
        </div>
        <Link
          to="/dashboard/class/add"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
        >
          <FiPlus aria-hidden="true" size={17} />
          Add class
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex items-center gap-3 py-4 sm:pr-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-teal-50 text-teal-700">
            <FiGrid aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Total classes</p>
            <p className="text-xl font-semibold text-slate-900">{classes.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:px-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-sky-50 text-sky-700">
            <FiUsers aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Enrolled students</p>
            <p className="text-xl font-semibold text-slate-900">{studentCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:pl-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-amber-50 text-amber-700">
            <FiBookOpen aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Available seats</p>
            <p className="text-xl font-semibold text-slate-900">
              {Math.max(capacityCount - studentCount, 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">All classes</h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredClasses.length} of {classes.length} classes
          </p>
        </div>
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search classes</span>
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search grade, teacher, room"
            className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-195 border-collapse text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                <th scope="col" className="px-5 py-3.5">Class / Section</th>
                <th scope="col" className="px-5 py-3.5">Class teacher</th>
                <th scope="col" className="px-5 py-3.5">Room</th>
                <th scope="col" className="px-5 py-3.5">Enrollment</th>
                <th scope="col" className="px-5 py-3.5">Academic year</th>
                <th scope="col" className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClasses.map((item) => {
                const occupancy = item.capacity
                  ? Math.min(Math.round((item.students / item.capacity) * 100), 100)
                  : 0;

                return (
                  <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">{item.grade}</p>
                      <p className="mt-1 text-xs text-slate-500">Section {item.section}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-700">{item.classTeacher}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{item.room || "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex min-w-36 items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-teal-600"
                            style={{ width: `${occupancy}%` }}
                          />
                        </div>
                        <span className="whitespace-nowrap text-xs font-medium text-slate-600">
                          {item.students}/{item.capacity}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{item.academicYear}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredClasses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <p className="text-sm font-semibold text-slate-700">No classes found</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try a different search or add a class.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ClassDetail;
