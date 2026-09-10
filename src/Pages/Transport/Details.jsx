import React, { useState } from "react";
import {
  FaBus,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaRoute,
  FaUserTie,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const [transportFilter, setTransportFilter] = useState("All Transport");

  const savedBuses = JSON.parse(localStorage.getItem("transportBuses")) || [];
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

  
  const handleDeleteBus = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this bus route?"
  );

  if (!confirmDelete) return;

  const savedBuses =
    JSON.parse(localStorage.getItem("transportBuses")) || [];

  const updatedBuses = savedBuses.filter((bus) => bus.id !== id);

  localStorage.setItem(
    "transportBuses",
    JSON.stringify(updatedBuses)
  );

  window.location.reload();
};

  const routes = [...defaultRoutes, ...savedBuses];

  const filteredRoute =
    transportFilter === "All Transport"
      ? routes
      : routes.filter((item) => item.bus === transportFilter);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Transport Details
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage buses, route and drivers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:border-purple-500"
              onChange={(e) => setTransportFilter(e.target.value)}
              value={transportFilter}
            >
              <option value="All Transport">All Transport</option>

              {routes.map((item) => (
                <option key={item.id} value={item.bus}>
                  {item.bus}
                </option>
              ))}
            </select>

            <button
              onClick={() => navigate("/dashboard/trans/add")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
            >
              <FaPlus />
              Add Bus
            </button>
          </div>
        </div>

        {/* Summary  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Total buses */}
          <div className="bg-purple-50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 ">
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <FaBus className="text-purple-600 text-lg" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Buses</p>

                <h2 className="text-2xl text-left font-semibold text-gray-800">
                  12
                </h2>
              </div>
            </div>
          </div>

          {/* Total Routes */}
          <div className="bg-blue-50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 ">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <FaRoute className="text-blue-600 text-lg" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Routes</p>

                <h2 className="text-2xl text-left font-semibold text-gray-800">
                  08
                </h2>
              </div>
            </div>
          </div>

          {/* Drivers */}
          <div className="bg-green-50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 ">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <FaUserTie className="text-green-600 text-lg" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Drivers</p>

                <h2 className="text-2xl text-left font-semibold text-gray-800">
                  12
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Today Route */}
        <div className="mb-4">
          <h2 className="text-2xl text-left font-semibold text-gray-800">
            Today's Route
          </h2>

          <p className="text-xl text-left text-gray-500 mt-1">
            Current School transporation schedule
          </p>
        </div>

        {/* Route cards */}
        <div className="flex flex-col gap-5">
          {filteredRoute.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Bus Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                    <FaBus className="text-purple-600 text-lg" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-left text-lg text-gray-800">
                      {item.bus}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.Route} - {item.driver}
                    </p>
                  </div>
                </div>

                {/* Status */}
                {item.status === "On Route" ? (
                  <span className="flex items-center  gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                    <FaClock size={12} />
                    On Route
                  </span>
                ) : (
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-green-600 text-xs font-medium">
                    <FaCheckCircle size={12} />
                    Completed
                  </span>
                )}
              </div>

              {/* Time */}
              <div className="grid grid-cols-4 gap-3 mb-3">
                {item.times.map((time, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm font-medium text-gray-700">{time}</p>
                  </div>
                ))}
              </div>

              {/* Route Line */}
              <div className="flex items-center px-3">
                {item.stops.map((stop, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === item.stops.length - 1
                            ? "bg-purple-600"
                            : "bg-purple-400"
                        }`}
                      />

                      <span className="text-xs text-gray-500 mt-2 whitespace-nowrap">
                        {stop}
                      </span>
                    </div>

                    {index !== item.stops.length - 1 && (
                      <div className="flex-1 h-0.5 bg-purple-200 mx-2 mb-5" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Students */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                {/* Students */}
                <p className="text-lg font-semibold text-left text-gray-800">
                  {item.students} students
                </p>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteBus(item.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                  title="Delete Bus"
                >
                  <FaTrash size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
