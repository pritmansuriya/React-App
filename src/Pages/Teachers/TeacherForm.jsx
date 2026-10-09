import { useState } from "react";
import { FiArrowRight, FiX } from "react-icons/fi";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  qualification: "",
  joiningDate: "",
};

const fields = [
  { name: "name", label: "Full name", placeholder: "e.g. Priya Mehta", required: true },
  { name: "email", label: "Work email", type: "email", placeholder: "name@school.edu", required: true },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "+91 98765 43210", required: true },
  { name: "subject", label: "Teaching subject", placeholder: "e.g. Mathematics", required: true },
  { name: "qualification", label: "Highest qualification", placeholder: "e.g. M.Sc. Mathematics" },
  { name: "joiningDate", label: "Joining date", type: "date" },
];

const inputClassName =
  "mt-1.5 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";

const TeacherForm = ({ onSubmit, onCancel, submitLabel = "Save teacher" }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    setValues((currentValues) => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      subject: values.subject.trim(),
      qualification: values.qualification.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block text-sm font-medium text-slate-700">
            {field.label}
            {field.required && <span className="ml-1 text-rose-600">*</span>}
            <input
              className={inputClassName}
              name={field.name}
              type={field.type ?? "text"}
              value={values[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              autoComplete={field.name === "name" ? "name" : field.name === "email" ? "email" : "off"}
            />
          </label>
        ))}
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FiX aria-hidden="true" />
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
        >
          {submitLabel}
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;