import { useEffect, useState } from "react";
import { FiBookOpen, FiCheck, FiGrid, FiPlus, FiSearch, FiUsers } from "react-icons/fi";
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

const readSubjects = () => {
  try {
    const storedSubjects = window.localStorage.getItem("schoolSubjects");
    const subjects = storedSubjects ? JSON.parse(storedSubjects) : defaultSubjects;
    return Array.isArray(subjects) ? subjects : defaultSubjects;
  } catch {
    return defaultSubjects;
  }
};

const readAllocations = () => {
  try {
    const storedAllocations = window.localStorage.getItem(ALLOCATION_STORAGE_KEY);
    const allocations = storedAllocations ? JSON.parse(storedAllocations) : [];
    return Array.isArray(allocations) ? allocations : [];
  } catch {
    return [];
  }
};

const SubjectAllocation = () => {
  const { classes } = useClasses();
  const { teachers } = useTeachers();
  const [subjects, setSubjects] = useState(readSubjects);
  const [allocations, setAllocations] = useState(readAllocations);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    subjectId: "",
    classId: "",
    teacherId: "",
    academicYear: "2026-27",
  });

  useEffect(() => {
    const syncStoredData = (event) => {
      if (event.key === "schoolSubjects") setSubjects(readSubjects());
      if (event.key === ALLOCATION_STORAGE_KEY) setAllocations(readAllocations());
    };

    window.addEventListener("storage", syncStoredData);
    return () => window.removeEventListener("storage", syncStoredData);
  }, []);

  const activeSubjects = subjects.filter((subject) => subject.status === "Active");
  const activeTeachers = teachers.filter((teacher) => teacher.status === "Active");
  const query = search.trim().toLowerCase();
  const visibleAllocations = allocations.filter((item) =>
    [item.subjectName, item.code, item.className, item.teacherName]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
    setNotice("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = activeSubjects.find((item) => String(item.id) === form.subjectId);
    const classItem = classes.find((item) => item.id === form.classId);
    const teacher = activeTeachers.find((item) => item.id === form.teacherId);

    if (!subject || !classItem || !teacher) {
      setError("Select a subject, class, and teacher.");
      return;
    }

    const className = `${classItem.grade} - ${classItem.section}`;
    const alreadyAssigned = allocations.some(
      (item) =>
        String(item.subjectId) === String(subject.id) &&
        item.classId === classItem.id &&
        item.academicYear === form.academicYear,
    );

    if (alreadyAssigned) {
      setError("This subject is already assigned to that class for the selected year.");
      return;
    }

    const allocation = {
      id: globalThis.crypto?.randomUUID?.() ?? `allocation-${Date.now()}`,
      subjectId: subject.id,
      subjectName: subject.name,
      code: subject.code,
      classId: classItem.id,
      className,
      teacherId: teacher.id,
      teacherName: teacher.name,
      academicYear: form.academicYear.trim(),
    };
    const updatedAllocations = [allocation, ...allocations];
    window.localStorage.setItem(ALLOCATION_STORAGE_KEY, JSON.stringify(updatedAllocations));
    setAllocations(updatedAllocations);
    saveActivity(
      "Subject assigned",
      `${subject.name} was assigned to ${className} with ${teacher.name} for ${form.academicYear}.`,
    );
    setForm((current) => ({ ...current, subjectId: "", classId: "", teacherId: "" }));
    setError("");
    setNotice(`${subject.name} assigned to ${className}.`);
  };

  const fieldClassName =
    "mt-1.5 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";

  return (
    <section className="mx-auto max-w-7xl text-left text-slate-900">
      <div className="mb-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
          Academic management
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Subject allocation</h1>
        <p className="mt-2 text-sm text-slate-500">
          Assign subjects to classes and teachers for the academic year.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex items-center gap-3 py-4 sm:pr-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-teal-50 text-teal-700">
            <FiBookOpen aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Active subjects</p>
            <p className="text-xl font-semibold text-slate-900">{activeSubjects.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:px-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-sky-50 text-sky-700">
            <FiGrid aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Classes</p>
            <p className="text-xl font-semibold text-slate-900">{classes.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:pl-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-amber-50 text-amber-700">
            <FiUsers aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Assignments</p>
            <p className="text-xl font-semibold text-slate-900">{allocations.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]">
        <section className="border-y border-slate-200 bg-white px-5 py-6 sm:px-6">
          <div className="mb-5 border-b border-slate-200 pb-4">
            <h2 className="text-lg font-semibold text-slate-900">New assignment</h2>
            <p className="mt-1 text-sm text-slate-500">Select the subject, class, and teacher.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Subject <span className="text-rose-600">*</span>
              <select
                required
                name="subjectId"
                value={form.subjectId}
                onChange={updateField}
                className={fieldClassName}
              >
                <option value="">Select a subject</option>
                {activeSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} · {subject.code}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Class and section <span className="text-rose-600">*</span>
              <select
                required
                name="classId"
                value={form.classId}
                onChange={updateField}
                className={fieldClassName}
              >
                <option value="">Select a class</option>
                {classes.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.grade} · Section {classItem.section}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Teacher <span className="text-rose-600">*</span>
              <select
                required
                name="teacherId"
                value={form.teacherId}
                onChange={updateField}
                className={fieldClassName}
              >
                <option value="">Select a teacher</option>
                {activeTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Academic year <span className="text-rose-600">*</span>
              <input
                required
                name="academicYear"
                value={form.academicYear}
                onChange={updateField}
                placeholder="e.g. 2026-27"
                className={fieldClassName}
              />
            </label>

            {error && <p role="alert" className="text-sm font-medium text-rose-700">{error}</p>}
            {notice && <p role="status" className="text-sm font-medium text-emerald-700">{notice}</p>}

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
            >
              <FiPlus aria-hidden="true" />
              Assign subject
            </button>
          </form>
        </section>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Current assignments</h2>
              <p className="mt-1 text-sm text-slate-500">{visibleAllocations.length} assignments</p>
            </div>
            <label className="relative block w-full sm:max-w-xs">
              <span className="sr-only">Search allocations</span>
              <FiSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search subject, class, teacher"
                className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
              />
            </label>
          </div>

          {visibleAllocations.length === 0 ? (
            <div className="border-y border-slate-200 bg-white px-5 py-12 text-center">
              <FiBookOpen aria-hidden="true" className="mx-auto mb-3 text-2xl text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">No subject assignments yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Create an assignment to see it listed here.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-162.5 text-left">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                      <th scope="col" className="px-4 py-3">Subject</th>
                      <th scope="col" className="px-4 py-3">Class</th>
                      <th scope="col" className="px-4 py-3">Teacher</th>
                      <th scope="col" className="px-4 py-3">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleAllocations.map((item) => (
                      <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                        <td className="px-4 py-4">
                          <p className="whitespace-nowrap text-sm font-semibold text-slate-900">
                            {item.subjectName}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">{item.code}</p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                          {item.className}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                          {item.teacherName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                          <span className="inline-flex items-center gap-1.5">
                            <FiCheck aria-hidden="true" className="text-emerald-600" />
                            {item.academicYear}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default SubjectAllocation;