import { useEffect, useState } from "react";
import { FiCalendar, FiCheckCircle, FiClock, FiSend, FiUsers } from "react-icons/fi";
import { useTeachers } from "./useTeachers";
import { saveActivity } from "../hooks/useMessages";

const STORAGE_KEY = "teacherLeaveApplications";

const emptyForm = {
  teacherId: "",
  leaveType: "",
  startDate: "",
  endDate: "",
  reason: "",
};

const readApplications = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const applications = saved ? JSON.parse(saved) : [];
    return Array.isArray(applications) ? applications : [];
  } catch {
    return [];
  }
};

const formatDate = (dateString) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getLeaveDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const firstDay = new Date(`${startDate}T00:00:00`);
  const lastDay = new Date(`${endDate}T00:00:00`);
  return Math.floor((lastDay - firstDay) / 86400000) + 1;
};

const ApplyLeave = () => {
  const { teachers } = useTeachers();
  const activeTeachers = teachers.filter((teacher) => teacher.status === "Active");
  const [applications, setApplications] = useState(readApplications);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const syncApplications = (event) => {
      if (event.key === STORAGE_KEY) setApplications(readApplications());
    };
    window.addEventListener("storage", syncApplications);
    return () => window.removeEventListener("storage", syncApplications);
  }, []);

  const pendingCount = applications.filter((application) => application.status === "Pending").length;
  const approvedCount = applications.filter((application) => application.status === "Approved").length;

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.endDate < form.startDate) {
      setError("The end date must be on or after the start date.");
      return;
    }

    const teacher = activeTeachers.find((item) => item.id === form.teacherId);
    if (!teacher) {
      setError("Choose a teacher before submitting the request.");
      return;
    }

    const application = {
      id: globalThis.crypto?.randomUUID?.() ?? `leave-${Date.now()}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      subject: teacher.subject,
      leaveType: form.leaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      days: getLeaveDays(form.startDate, form.endDate),
      reason: form.reason.trim(),
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    const updatedApplications = [application, ...applications];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApplications));
    setApplications(updatedApplications);
    saveActivity(
      "Leave request submitted",
      `${teacher.name} requested ${form.leaveType} from ${form.startDate} to ${form.endDate}.`,
    );
    setForm(emptyForm);
    setError("");
    setSuccess(`Leave request submitted for ${teacher.name}.`);
  };

  const fieldClassName =
    "mt-1.5 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";

  return (
    <section className="mx-auto max-w-7xl text-left text-slate-900">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
            Teacher services
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Apply to leave</h1>
          <p className="mt-2 text-sm text-slate-500">
            Submit a leave request and review its current status.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FiUsers aria-hidden="true" className="text-teal-700" />
          {activeTeachers.length} active teachers
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex items-center gap-3 py-4 sm:pr-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-amber-50 text-amber-700">
            <FiClock aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Pending requests</p>
            <p className="text-xl font-semibold text-slate-900">{pendingCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:px-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-50 text-emerald-700">
            <FiCheckCircle aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Approved requests</p>
            <p className="text-xl font-semibold text-slate-900">{approvedCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 sm:pl-6">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-sky-50 text-sky-700">
            <FiCalendar aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-500">Total applications</p>
            <p className="text-xl font-semibold text-slate-900">{applications.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="border-y border-slate-200 bg-white px-5 py-6 sm:px-7">
          <div className="mb-6 border-b border-slate-200 pb-5">
            <h2 className="text-lg font-semibold text-slate-900">New leave request</h2>
            <p className="mt-1 text-sm text-slate-500">Complete the details below for review.</p>
          </div>

          {activeTeachers.length === 0 ? (
            <p className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              There are no active teachers to select.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} · {teacher.subject}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Leave type <span className="text-rose-600">*</span>
                <select
                  required
                  name="leaveType"
                  value={form.leaveType}
                  onChange={updateField}
                  className={fieldClassName}
                >
                  <option value="">Select leave type</option>
                  <option value="Casual leave">Casual leave</option>
                  <option value="Sick leave">Sick leave</option>
                  <option value="Earned leave">Earned leave</option>
                  <option value="Unpaid leave">Unpaid leave</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  From <span className="text-rose-600">*</span>
                  <input
                    required
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={updateField}
                    className={fieldClassName}
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Through <span className="text-rose-600">*</span>
                  <input
                    required
                    type="date"
                    name="endDate"
                    min={form.startDate || undefined}
                    value={form.endDate}
                    onChange={updateField}
                    className={fieldClassName}
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Reason <span className="text-rose-600">*</span>
                <textarea
                  required
                  minLength={8}
                  maxLength={500}
                  name="reason"
                  value={form.reason}
                  onChange={updateField}
                  placeholder="Add a brief reason for this request"
                  rows={4}
                  className="mt-1.5 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
                />
              </label>

              {error && <p role="alert" className="text-sm font-medium text-rose-700">{error}</p>}
              {success && <p role="status" className="text-sm font-medium text-emerald-700">{success}</p>}

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 sm:w-auto"
              >
                <FiSend aria-hidden="true" />
                Submit request
              </button>
            </form>
          )}
        </section>

        <section className="min-w-0">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Leave requests</h2>
              <p className="mt-1 text-sm text-slate-500">Most recent applications first</p>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="border-y border-slate-200 bg-white px-5 py-12 text-center">
              <FiCalendar aria-hidden="true" className="mx-auto mb-3 text-2xl text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">No leave requests yet</p>
              <p className="mt-1 text-sm text-slate-500">Submitted applications will appear here.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-162.5 text-left">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                      <th scope="col" className="px-4 py-3">Teacher</th>
                      <th scope="col" className="px-4 py-3">Leave</th>
                      <th scope="col" className="px-4 py-3">Dates</th>
                      <th scope="col" className="px-4 py-3">Days</th>
                      <th scope="col" className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((application) => (
                      <tr key={application.id} className="align-top">
                        <td className="px-4 py-4">
                          <p className="whitespace-nowrap text-sm font-semibold text-slate-900">
                            {application.teacherName}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">{application.subject}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">{application.leaveType}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-xs leading-5 text-slate-600">
                          {formatDate(application.startDate)}
                          <br />
                          to {formatDate(application.endDate)}
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">{application.days}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              application.status === "Approved"
                                ? "bg-emerald-50 text-emerald-700"
                                : application.status === "Rejected"
                                  ? "bg-rose-50 text-rose-700"
                                  : "bg-amber-50 text-amber-800"
                            }`}
                          >
                            {application.status}
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

export default ApplyLeave;