import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  FaBook,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUsers,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const defaultSubjects = [
  {
    id: 1,
    name: "Mathematics",
    code: "MAT101",
    teacher: "John Smith",
    classes: "8-A, 8-B",
    students: 62,
    status: "Active",
  },
  {
    id: 2,
    name: "Science",
    code: "SCI101",
    teacher: "Sarah Lee",
    classes: "7-A, 8-A",
    students: 58,
    status: "Active",
  },
  {
    id: 3,
    name: "English",
    code: "ENG101",
    teacher: "David Roy",
    classes: "8-A, 9-A",
    students: 55,
    status: "Active",
  },
  {
    id: 4,
    name: "History",
    code: "HIS101",
    teacher: "Emily Brown",
    classes: "7-B, 8-B",
    students: 48,
    status: "Active",
  },
];

const subjectValidation = Yup.object({
  name: Yup.string()
    .min(2, "Subject name must be at least 2 characters")
    .required("Subject name is required"),

  code: Yup.string()
    .min(3, "Subject code must be at least 3 characters")
    .required("Subject code is required"),

  teacher: Yup.string()
    .min(2, "Teacher name must be at least 2 characters")
    .required("Teacher name is required"),

  classes: Yup.string().required("Class is required"),

  students: Yup.number()
    .typeError("Students must be a number")
    .min(1, "Students must be at least 1")
    .required("Number of students is required"),

  status: Yup.string()
    .oneOf(["Active", "Inactive"])
    .required("Status is required"),
});

const SubjectDetails = () => {
 
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem("schoolSubjects");

    return savedSubjects 
    ? JSON.parse(savedSubjects) 
    : defaultSubjects;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      teacher: "",
      classes: "",
      students: "",
      status: "Active",
    },

    validationSchema: subjectValidation,

    onSubmit: (values) => {
      if (showEditModal) {
        const updatedSubjects = subjects.map((subject) => {
          if (subject.id === selectedSubject.id) {
            return {
              ...subject,
              name: values.name,
              code: values.code,
              teacher: values.teacher,
              classes: values.classes,
              students: Number(values.students),
              status: values.status,
            };
          }

          return subject;
        });

        setSubjects(updatedSubjects);

        localStorage.setItem("schoolSubjects", JSON.stringify(updatedSubjects));

        setShowEditModal(false);
        setSelectedSubject(null);

        formik.resetForm();

        return;
      }

      const newSubject = {
        id: Date.now(),
        name: values.name,
        code: values.code,
        teacher: values.teacher,
        classes: values.classes,
        students: Number(values.students),
        status: values.status,
      };

      const updatedSubjects = [...subjects, newSubject];

      setSubjects(updatedSubjects);

      localStorage.setItem("schoolSubjects", JSON.stringify(updatedSubjects));

      setShowAddModal(false);

      formik.resetForm();
    },
  });

  const handleOpenAdd = () => {
    formik.resetForm();

    setSelectedSubject(null);

    setShowAddModal(true);
  };

  const handleCloseAdd = () => {
    formik.resetForm();

    setShowAddModal(false);
  };

  const handleEdit = (subject) => {
    setSelectedSubject(subject);

    formik.setValues({
      name: subject.name,
      code: subject.code,
      teacher: subject.teacher,
      classes: subject.classes,
      students: subject.students,
      status: subject.status,
    });

    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    formik.resetForm();

    setSelectedSubject(null);

    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?",
    );

    if (!confirmDelete) {
      return;
    }

    const updatedSubjects = subjects.filter((subject) => subject.id !== id);

    setSubjects(updatedSubjects);

    localStorage.setItem("schoolSubjects", JSON.stringify(updatedSubjects));
  };

  const totalSubjects = subjects.length;

  const totalTeachers = new Set(subjects.map((subject) => subject.teacher))
    .size;

  const totalClasses = new Set(
    subjects.flatMap((subject) =>
      subject.classes.split(",").map((item) => item.trim()),
    ),
  ).size;

  const InputError = ({ name }) => {
    if (formik.touched[name] && formik.errors[name]) {
      return (
        <p className="text-xs text-red-500 mt-1 text-left">
          {formik.errors[name]}
        </p>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-6 text-left">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 text-left">
              Subject Details
            </h1>

            <p className="text-sm text-gray-500 mt-1 text-left">
              Manage subjects, teachers and classes
            </p>
          </div>

          {/* ADD BUTTON */}
    
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <FaPlus className="text-xs" />
            Add Subject
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
          {/* SUBJECTS */}

          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <FaBook className="text-purple-600 text-xl" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800 text-left">
                {totalSubjects}
              </p>

              <p className="text-sm text-gray-500 text-left">Subjects</p>
            </div>
          </div>

          {/* TEACHERS */}

          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <FaChalkboardTeacher className="text-blue-600 text-xl" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800 text-left">
                {totalTeachers}
              </p>

              <p className="text-sm text-gray-500 text-left">Teachers</p>
            </div>
          </div>

          {/* CLASSES */}

          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <FaGraduationCap className="text-green-600 text-xl" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800 text-left">
                {totalClasses}
              </p>

              <p className="text-sm text-gray-500 text-left">Classes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              {/* SUBJECT HEADER */}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                    <FaBook className="text-purple-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 text-left">
                      {subject.name}
                    </h2>

                    <p className="text-sm text-gray-400 text-left">
                      {subject.code}
                    </p>
                  </div>
                </div>

                {/* STATUS */}

                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600">
                  {subject.status}
                </span>
              </div>


              <div className="mt-6 space-y-4">

                {/* TEACHER */}

                <div className="flex items-center gap-3">
                  <FaChalkboardTeacher className="text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-400 text-left">Teacher</p>

                    <p className="text-sm font-medium text-gray-700 text-left">
                      {subject.teacher}
                    </p>
                  </div>
                </div>

                {/* CLASSES */}

                <div className="flex items-center gap-3">
                  <FaGraduationCap className="text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-400 text-left">Classes</p>

                    <p className="text-sm font-medium text-gray-700 text-left">
                      {subject.classes}
                    </p>
                  </div>
                </div>

                {/* STUDENTS */}

                <div className="flex items-center gap-3">
                  <FaUsers className="text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-400 text-left">Students</p>

                    <p className="text-sm font-medium text-gray-700 text-left">
                      {subject.students} Students
                    </p>
                  </div>
                </div>
              </div>


              <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                
                <button
                  onClick={() => handleEdit(subject)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                >
                  <FaEdit />
                  Edit
                </button>

                {/* DELETE */}

                <button
                  onClick={() => handleDelete(subject.id)}
                  className="flex items-center justify-center w-9 h-9 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

    
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">
              {/* HEADER */}

              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 text-left">
                    Add Subject
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 text-left">
                    Add a new school subject
                  </p>
                </div>

                <button
                  onClick={handleCloseAdd}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>

              {/* FORM */}

              <form onSubmit={formik.handleSubmit} className="px-6 py-5">
                {/* NAME */}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Subject Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter subject name"
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  <InputError name="name" />
                </div>

                {/* CODE */}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Subject Code
                  </label>

                  <input
                    type="text"
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Example: MAT101"
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                      formik.touched.code && formik.errors.code
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  <InputError name="code" />
                </div>

                {/* TEACHER */}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Teacher
                  </label>

                  <input
                    type="text"
                    name="teacher"
                    value={formik.values.teacher}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter teacher name"
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                      formik.touched.teacher && formik.errors.teacher
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  <InputError name="teacher" />
                </div>

                {/* CLASSES + STUDENTS */}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* CLASSES */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Classes
                    </label>

                    <input
                      type="text"
                      name="classes"
                      value={formik.values.classes}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="8-A, 8-B"
                      className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                        formik.touched.classes && formik.errors.classes
                          ? "border-red-500"
                          : "border-gray-200 focus:border-purple-500"
                      }`}
                    />

                    <InputError name="classes" />
                  </div>

                  {/* STUDENTS */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Students
                    </label>

                    <input
                      type="number"
                      name="students"
                      value={formik.values.students}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="62"
                      className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                        formik.touched.students && formik.errors.students
                          ? "border-red-500"
                          : "border-gray-200 focus:border-purple-500"
                      }`}
                    />

                    <InputError name="students" />
                  </div>
                </div>

                {/* STATUS */}

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-purple-500"
                  >
                    <option value="Active">Active</option>

                    <option value="Inactive">Inactive</option>
                  </select>

                  <InputError name="status" />
                </div>

                {/* BUTTONS */}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseAdd}
                    className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                  >
                    Add Subject
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

       {/* Edit Modal*/}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">
              {/* HEADER */}

              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 text-left">
                    Edit Subject
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 text-left">
                    Update subject information
                  </p>
                </div>

                <button
                  onClick={handleCloseEdit}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>

              {/* EDIT FORM */}

              <form onSubmit={formik.handleSubmit} className="px-6 py-5">
                {/* NAME */}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Subject Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  <InputError name="name" />
                </div>

                {/* Subject CODE */}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Subject Code
                  </label>

                  <input
                    type="text"
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                      formik.touched.code && formik.errors.code
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  <InputError name="code" />
                </div>

                {/* TEACHER */}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Teacher
                  </label>

                  <input
                    type="text"
                    name="teacher"
                    value={formik.values.teacher}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                      formik.touched.teacher && formik.errors.teacher
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  <InputError name="teacher" />
                </div>

                {/* CLASSES + STUDENTS */}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Classes
                    </label>

                    <input
                      type="text"
                      name="classes"
                      value={formik.values.classes}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                        formik.touched.classes && formik.errors.classes
                          ? "border-red-500"
                          : "border-gray-200 focus:border-purple-500"
                      }`}
                    />

                    <InputError name="classes" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Students
                    </label>

                    <input
                      type="number"
                      name="students"
                      value={formik.values.students}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-100 ${
                        formik.touched.students && formik.errors.students
                          ? "border-red-500"
                          : "border-gray-200 focus:border-purple-500"
                      }`}
                    />

                    <InputError name="students" />
                  </div>
                </div>

                {/* STATUS */}

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-purple-500"
                  >
                    <option value="Active">Active</option>

                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* BUTTONS */}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseEdit}
                    className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                  >
                    Update Subject
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetails;
