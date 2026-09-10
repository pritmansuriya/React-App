// src/components/AddStudent.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStudents } from '../../../../Pages/hooks/useStudent';

const AddStudent = () => {
  const { students, addStudent, deleteStudent } = useStudents();
  const [showForm, setShowForm] = useState(false);

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Student name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    
    class: Yup.string()
      .required('Class is required')
      .min(1, 'Class is required')
      .max(10, 'Class cannot exceed 10 characters'),
    
    rollNo: Yup.string()
      .required('Roll number is required')
      .matches(/^[0-9]+$/, 'Roll number must contain only digits')
      .min(1, 'Roll number is required')
      .max(10, 'Roll number cannot exceed 10 digits'),
    
    mobileNo: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    
    birthDate: Yup.date()
      .required('Birth date is required')
      .max(new Date(), 'Birth date cannot be in the future')
      .min(new Date('1900-01-01'), 'Birth date must be after 1900')
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      name: '',
      class: '',
      rollNo: '',
      mobileNo: '',
      birthDate: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (addStudent(values)) {
        resetForm();
        setShowForm(false);
      }
    }
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-800">Add Student</h2>
            </div>
            
            {/* Students count + Add button */}
            <div className="flex items-center gap-4">
              <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
                {students.length} Students
              </span>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  if (!showForm) {
                    formik.resetForm();
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium"
              >
                {showForm ? '✕ Close' : ' Add New Student'}
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Add Form */}
            {showForm && (
              <form onSubmit={formik.handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter full name"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formik.touched.name && formik.errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-xs text-red-500">{formik.errors.name}</p>
                    )}
                  </div>

                  {/* Class Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="class"
                      value={formik.values.class}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g., 10-A"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formik.touched.class && formik.errors.class
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {formik.touched.class && formik.errors.class && (
                      <p className="mt-1 text-xs text-red-500">{formik.errors.class}</p>
                    )}
                  </div>

                  {/* Roll No Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Roll No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="rollNo"
                      value={formik.values.rollNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter roll number"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formik.touched.rollNo && formik.errors.rollNo
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {formik.touched.rollNo && formik.errors.rollNo && (
                      <p className="mt-1 text-xs text-red-500">{formik.errors.rollNo}</p>
                    )}
                  </div>

                  {/* Mobile No Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={formik.values.mobileNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="9876543210"
                      maxLength="10"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formik.touched.mobileNo && formik.errors.mobileNo
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {formik.touched.mobileNo && formik.errors.mobileNo && (
                      <p className="mt-1 text-xs text-red-500">{formik.errors.mobileNo}</p>
                    )}
                  </div>

                  {/* Birth Date Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Birth Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formik.values.birthDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formik.touched.birthDate && formik.errors.birthDate
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {formik.touched.birthDate && formik.errors.birthDate && (
                      <p className="mt-1 text-xs text-red-500">{formik.errors.birthDate}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formik.isSubmitting ? 'Saving...' : 'Save Student'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Table with Equal Spacing in All Columns */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      {/* 👇 ALL columns with EXACT SAME padding: px-4 py-3 */}
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Index no</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Date</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-gray-400">
                          📭 No students yet. Click "Add New Student" to add!
                        </td>
                      </tr>
                    ) : (
                      students.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3 text-sm text-gray-600 text-center">{index + 1}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800 text-center">{student.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-center">
                            <span className="text-gray-700 px-2 py-1 rounded-lg text-xs font-medium">
                              {student.class}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-center">{student.rollNo}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-center">{student.mobileNo}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-center">{formatDate(student.birthDate)}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => deleteStudent(student.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-1.5 cursor-pointer rounded-lg text-sm font-medium transition"
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