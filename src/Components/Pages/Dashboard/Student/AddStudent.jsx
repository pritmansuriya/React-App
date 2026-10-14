import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStudents } from "../../../../Pages/hooks/useStudent";
import { saveActivity } from "../../../../Pages/hooks/useMessages";

const AddStudent = () => {
  const { students = [], addStudent, deleteStudent } = useStudents();
  const [showForm, setShowForm] = useState(false);

  // Form validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Student name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

    class: Yup.string()
      .trim()
      .required("Class is required")
      .max(10, "Class cannot exceed 10 characters"),

    rollNo: Yup.string()
      .required("Roll number is required")
      .matches(/^[0-9]{1,10}$/, "Roll number must contain 1 to 10 digits"),

    mobileNo: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

    birthDate: Yup.date()
      .typeError("Please enter a valid birth date")
      .required("Birth date is required")
      .min(new Date("1900-01-01"), "Birth date must be after 1900")
      .max(new Date(), "Birth date cannot be in the future"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      class: "",
      rollNo: "",
      mobileNo: "",
      birthDate: "",
    },
    validationSchema,

    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        const student = {
          ...values,
          name: values.name.trim(),
          class: values.class.trim(),
          rollNo: values.rollNo.trim(),
          mobileNo: values.mobileNo.trim(),
        };

        // Assumes addStudent returns false if adding fails.
        const result = addStudent(student);

        if (result === false) {
          return;
        }

        saveActivity(
          "Student added",
          `${student.name} was added to class ${student.class}.`,
        );

        resetForm();
        setShowForm(false);
      } catch (error) {
        console.error("Error adding student:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Display validation errors after submission or blur
  const fieldClass = (field) =>
    `w-full min-w-0 rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
    }`;

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    // Avoid displaying an invalid date.
    const date = new Date(`${dateString}`.slice(0, 10) + "T00:00:00");

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`,
    );

    if (!confirmed) return;

    deleteStudent(student.id);
  };

  return (
    <div className="min-h-full w-full min-w-0 bg-[#EAF1FF] p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        {/* Main Card */}
        <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-xl text-left font-semibold text-gray-800">
                Add Student
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage student information
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                {students.length} Students
              </span>

              <button
                type="button"
                onClick={() => {
                  if (showForm) {
                    setShowForm(false);
                    formik.resetForm();
                  } else {
                    formik.resetForm();
                    setShowForm(true);
                  }
                }}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {showForm ? "✕ Close" : "+ Add New Student"}
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="min-w-0 p-3 sm:p-5 lg:p-6">
            {/* Add Student Form */}
            {showForm && (
              <form
                onSubmit={formik.handleSubmit}
                noValidate
                className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5"
              >
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Student Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Fill in all required fields.
                  </p>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {/* Student Name */}
                  <div className="min-w-0">
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Student Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter full name"
                      className={fieldClass("name")}
                    />

                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  {/* Class */}
                  <div className="min-w-0">
                    <label
                      htmlFor="class"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Class <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="class"
                      type="text"
                      name="class"
                      value={formik.values.class}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g. 10-A"
                      className={fieldClass("class")}
                    />

                    {formik.touched.class && formik.errors.class && (
                      <p className="mt-1 text-xs text-red-500">
                        {formik.errors.class}
                      </p>
                    )}
                  </div>

                  {/* Roll Number */}
                  <div className="min-w-0">
                    <label
                      htmlFor="rollNo"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Roll Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="rollNo"
                      type="text"
                      inputMode="numeric"
                      name="rollNo"
                      value={formik.values.rollNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter roll number"
                      maxLength={10}
                      className={fieldClass("rollNo")}
                    />

                    {formik.touched.rollNo && formik.errors.rollNo && (
                      <p className="mt-1 text-xs text-red-500">
                        {formik.errors.rollNo}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="min-w-0">
                    <label
                      htmlFor="mobileNo"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Mobile Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="mobileNo"
                      type="tel"
                      inputMode="numeric"
                      name="mobileNo"
                      value={formik.values.mobileNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={fieldClass("mobileNo")}
                    />

                    {formik.touched.mobileNo && formik.errors.mobileNo && (
                      <p className="mt-1 text-xs text-red-500">
                        {formik.errors.mobileNo}
                      </p>
                    )}
                  </div>

                  {/* Birth Date */}
                  <div className="min-w-0">
                    <label
                      htmlFor="birthDate"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Birth Date <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="birthDate"
                      type="date"
                      name="birthDate"
                      value={formik.values.birthDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      max={new Date().toISOString().slice(0, 10)}
                      min="1900-01-01"
                      className={fieldClass("birthDate")}
                    />

                    {formik.touched.birthDate && formik.errors.birthDate && (
                      <p className="mt-1 text-xs text-red-500">
                        {formik.errors.birthDate}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex min-w-0 items-end gap-3 sm:col-span-2 xl:col-span-1">
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {formik.isSubmitting ? "Saving..." : "Save Student"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        formik.resetForm();
                        setShowForm(false);
                      }}
                      className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Students Table */}
            <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200">
              <div className="max-h-[500px] overflow-auto">
                <table className="w-full min-w-[850px] table-auto">
                  <thead className="sticky top-0 z-10 bg-gray-50">
                    <tr>
                      {[
                        "Index No",
                        "Name",
                        "Class",
                        "Roll No",
                        "Mobile No",
                        "Birth Date",
                        "Action",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {students.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-10 text-center text-sm text-gray-400"
                        >
                          No students yet. Click "Add New Student" to add one.
                        </td>
                      </tr>
                    ) : (
                      students.map((student, index) => (
                        <tr
                          key={student.id}
                          className="transition hover:bg-blue-50/50"
                        >
                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-600">
                            {index + 1}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-800">
                            {student.name}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-600">
                            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                              {student.class}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-600">
                            {student.rollNo}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-600">
                            {student.mobileNo}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-600">
                            {formatDate(student.birthDate)}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleDelete(student)}
                              className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
