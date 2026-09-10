import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaBus, FaPlus } from "react-icons/fa";

const Add = () => {
  const navigate = useNavigate();

  // Default routes from Details.jsx
  const defaultRoutes = [
    {
      id: 1,
      bus: "BUS-01",
      Route: "Route A",
      driver: "Raj Patel",
      students: 25,
      status: "On Route",
      times: ["07:15", "07:30", "07:50", "08:10"],
      stops: ["Home", "Main Road", "Market", "School"],
    },
    {
      id: 2,
      bus: "BUS-02",
      Route: "Route B",
      driver: "Amit Shah",
      students: 30,
      status: "Completed",
      times: ["07:20", "07:35", "07:45", "08:05"],
      stops: ["Home", "Station", "City Center", "School"],
    },
    {
      id: 3,
      bus: "BUS-03",
      Route: "Route C",
      driver: "Ravi Kumar",
      students: 27,
      status: "On Route",
      times: ["07:25", "07:40", "07:55", "08:20"],
      stops: ["Home", "Market", "Main Road", "School"],
    },
  ];

  const formik = useFormik({
    initialValues: {
      bus: "",
      Route: "",
      driver: "",
      students: "",
      status: "On Route",
      times: ["", "", "", ""],
      stops: ["Home", "", "", "School"],
    },

    validationSchema: Yup.object({
      bus: Yup.string()
        .trim()
        .required("Bus name is required")
        .test(
          "unique-bus",
          "This bus already exists.",
          function (value) {
            if (!value) return true;

            const savedBuses =
              JSON.parse(localStorage.getItem("transportBuses")) || [];

            const allBuses = [...defaultRoutes, ...savedBuses];

            const exists = allBuses.some(
              (item) =>
                item.bus?.trim().toLowerCase() === value.trim().toLowerCase()
            );

            return !exists;
          }
        ),

      Route: Yup.string()
        .trim()
        .required("Route name is required")
        .test(
          "unique-route",
          "This route already exists.",
          function (value) {
            if (!value) return true;

            const savedBuses =
              JSON.parse(localStorage.getItem("transportBuses")) || [];

            const allRoutes = [...defaultRoutes, ...savedBuses];

            const exists = allRoutes.some(
              (item) =>
                item.Route?.trim().toLowerCase() ===
                value.trim().toLowerCase()
            );

            return !exists;
          }
        ),

      driver: Yup.string()
        .trim()
        .required("Driver name is required"),

      students: Yup.number()
        .typeError("Students must be a number")
        .required("Student count is required")
        .min(1, "At least 1 student is required"),

      status: Yup.string()
        .required("Status is required"),

      times: Yup.array()
        .of(
          Yup.string().required("Time is required")
        )
        .length(4, "Four times are required"),

      stops: Yup.array()
        .of(
          Yup.string().required("Stop is required")
        )
        .length(4, "Four stops are required"),
    }),

    onSubmit: (values, { resetForm }) => {
      const existingBuses =
        JSON.parse(localStorage.getItem("transportBuses")) || [];

      const newBus = {
        id: Date.now(),
        bus: values.bus.trim(),
        Route: values.Route.trim(),
        driver: values.driver.trim(),
        students: Number(values.students),
        status: values.status,
        times: values.times,
        stops: values.stops,
      };


      localStorage.setItem(
        "transportBuses",
        JSON.stringify([...existingBuses, newBus])
      );

      resetForm();

      navigate("/dashboard/trans");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6 text-left">
          <h1 className="text-3xl font-semibold text-gray-800">
            Add Bus
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Add a new school transportation bus
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >

          {/* Bus Information */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <FaBus className="text-purple-600 text-lg" />
            </div>

            <div>
              <h2 className="text-xl text-left font-semibold text-gray-800">
                Bus Information
              </h2>

              <p className="text-sm text-gray-500">
                Enter bus, route and driver information
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Bus Name */}
            <div>
              <label className="block text-lg text-left font-medium text-gray-700 mb-2">
                Bus Name
              </label>

              <input
                type="text"
                name="bus"
                value={formik.values.bus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Example: BUS-04"
                className={`w-full px-4 py-3 border rounded-xl outline-none ${
                  formik.touched.bus && formik.errors.bus
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-purple-500"
                }`}
              />

              {formik.touched.bus && formik.errors.bus && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.bus}
                </p>
              )}
            </div>

            {/* Route */}
            <div>
              <label className="block text-lg text-left font-medium text-gray-700 mb-2">
                Route
              </label>

              <input
                type="text"
                name="Route"
                value={formik.values.Route}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Example: Route D"
                className={`w-full px-4 py-3 border rounded-xl outline-none ${
                  formik.touched.Route && formik.errors.Route
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-purple-500"
                }`}
              />

              {formik.touched.Route && formik.errors.Route && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.Route}
                </p>
              )}
            </div>

            {/* Driver */}
            <div>
              <label className="block text-lg text-left font-medium text-gray-700 mb-2">
                Driver
              </label>

              <input
                type="text"
                name="driver"
                value={formik.values.driver}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter driver name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
              />

              {formik.touched.driver && formik.errors.driver && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.driver}
                </p>
              )}
            </div>

            {/* Students */}
            <div>
              <label className="block text-left text-lg font-medium text-gray-700 mb-2">
                Number of Students
              </label>

              <input
                type="text"
                name="students"
                value={formik.values.students}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Example: 25"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
              />

              {formik.touched.students && formik.errors.students && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.students}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-left text-lg font-medium text-gray-700 mb-2">
                Status
              </label>

              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
              >
                <option value="On Route">On Route</option>
                <option value="Completed">Completed</option>
              </select>

              {formik.touched.status && formik.errors.status && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.status}
                </p>
              )}
            </div>
          </div>

          {/* Times */}
          <div className="mt-7">
            <h3 className="text-lg text-left font-semibold text-gray-800 mb-4">
              Route Times
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {formik.values.times.map((time, index) => (
                <div key={index}>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time {index + 1}
                  </label>

                  <input
                    type="text"
                    name={`times[${index}]`}
                    value={time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="07:15"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                  />

                  {formik.touched.times?.[index] &&
                    formik.errors.times?.[index] && (
                      <p className="text-sm text-red-500 mt-1">
                        {formik.errors.times[index]}
                      </p>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Stops */}
          <div className="mt-7">
            <h3 className="text-lg text-left font-semibold text-gray-800 mb-4">
              Route Stops
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {formik.values.stops.map((stop, index) => (
                <div key={index}>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stop {index + 1}
                  </label>

                  <input
                    type="text"
                    name={`stops[${index}]`}
                    placeholder={`Stop ${index + 1}`}
                    value={stop}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-500"
                  />

                  {formik.touched.stops?.[index] &&
                    formik.errors.stops?.[index] && (
                      <p className="text-sm text-red-500 mt-1">
                        {formik.errors.stops[index]}
                      </p>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-gray-100">

            <button
              type="button"
              onClick={() => navigate("/dashboard/trans")}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
            >
              <FaPlus />
              Add Bus
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;