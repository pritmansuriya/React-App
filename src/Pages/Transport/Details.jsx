
import React, { useState } from "react";
import {
  FaBus,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaRoute,
  FaUserTie,
  FaTrash,
  FaSearch,
  FaUsers,
  FaMapMarkerAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

const Details = () => {
  const navigate = useNavigate();

  // Filters
  const [transportFilter, setTransportFilter] =
    useState("All Transport");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [search, setSearch] = useState("");

  // Load saved buses
  const [savedBuses, setSavedBuses] = useState(() => {
    try {
      const storedBuses = JSON.parse(
        localStorage.getItem("transportBuses") || "[]"
      );

      return Array.isArray(storedBuses) ? storedBuses : [];
    } catch {
      return [];
    }
  });

  // Load deleted default route IDs
  const [removedDefaultRouteIds, setRemovedDefaultRouteIds] =
    useState(() => {
      try {
        const storedIds = JSON.parse(
          localStorage.getItem("removedTransportRouteIds") || "[]"
        );

        return Array.isArray(storedIds) ? storedIds : [];
      } catch {
        return [];
      }
    });

  // Combine default and saved buses
  const routes = [
    ...defaultRoutes.filter(
      (route) => !removedDefaultRouteIds.includes(route.id)
    ),
    ...savedBuses,
  ];

  // Dynamic Statistics
  const totalBuses = routes.length;

  const totalRoutes = new Set(
    routes.map((item) => item.Route).filter(Boolean)
  ).size;

  const totalDrivers = new Set(
    routes.map((item) => item.driver?.trim()).filter(Boolean)
  ).size;

  const totalStudents = routes.reduce(
    (total, item) => total + (Number(item.students) || 0),
    0
  );

  const activeBuses = routes.filter(
    (item) => item.status === "On Route"
  ).length;

  const completedBuses = routes.filter(
    (item) => item.status === "Completed"
  ).length;

  // Search and Filter
  const filteredRoute = routes.filter((item) => {
    const matchesBus =
      transportFilter === "All Transport" ||
      item.bus === transportFilter;

    const matchesSearch = [
      item.bus,
      item.Route,
      item.driver,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      item.status === statusFilter;

    return matchesBus && matchesSearch && matchesStatus;
  });

  // Delete Bus
  const handleDeleteBus = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bus route?"
    );

    if (!confirmDelete) return;

    const updatedBuses = savedBuses.filter(
      (bus) => bus.id !== id
    );

    const isSavedBus = updatedBuses.length !== savedBuses.length;

    if (isSavedBus) {
      setSavedBuses(updatedBuses);

      localStorage.setItem(
        "transportBuses",
        JSON.stringify(updatedBuses)
      );
    } else {
      const updatedRemovedIds = [
        ...new Set([...removedDefaultRouteIds, id]),
      ];

      setRemovedDefaultRouteIds(updatedRemovedIds);

      localStorage.setItem(
        "removedTransportRouteIds",
        JSON.stringify(updatedRemovedIds)
      );
    }

    const deletedBus = routes.find((bus) => bus.id === id);

    if (deletedBus?.bus === transportFilter) {
      setTransportFilter("All Transport");
    }
  };

  // Format time
  const formatTime = (time) => {
    if (!time) return "--:--";

    if (/AM|PM/i.test(time)) return time;

    const [hours, minutes] = time.split(":");
    const hour = Number(hours);

    if (Number.isNaN(hour) || !minutes) return time;

    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${String(formattedHour).padStart(2, "0")}:${minutes} ${period}`;
  };

  // Status Styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "On Route":
        return "bg-green-50 text-green-600";

      case "Completed":
        return "bg-blue-50 text-blue-600";

      case "Delayed":
        return "bg-amber-50 text-amber-600";

      case "Maintenance":
        return "bg-red-50 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Summary Cards
  const stats = [
    {
      title: "Total Buses",
      value: totalBuses,
      icon: FaBus,
      color: "bg-purple-50 text-purple-600",
      description: "Registered buses",
    },
    {
      title: "Total Routes",
      value: totalRoutes,
      icon: FaRoute,
      color: "bg-blue-50 text-blue-600",
      description: "Available routes",
    },
    {
      title: "Total Drivers",
      value: totalDrivers,
      icon: FaUserTie,
      color: "bg-green-50 text-green-600",
      description: "Assigned drivers",
    },
    {
      title: "Total Students",
      value: totalStudents,
      icon: FaUsers,
      color: "bg-orange-50 text-orange-600",
      description: "Transport students",
    },
    {
      title: "Active Buses",
      value: activeBuses,
      icon: FaClock,
      color: "bg-teal-50 text-teal-600",
      description: "Currently on route",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6FC] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl text-left font-bold text-gray-800 sm:text-3xl">
              Transport Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage buses, routes, drivers and students
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/trans/add")}
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md"
          >
            <FaPlus />
            Add New Bus
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon className="text-lg" />
                  </div>

                  <span className="text-2xl font-bold text-gray-800">
                    {item.value}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-semibold text-gray-700">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Route Overview */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl text-left font-bold text-gray-800">
                Today's Routes
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Current school transportation schedule
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-medium">
              <span className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {activeBuses} On Route
              </span>

              <span className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {completedBuses} Completed
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bus, route or driver..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
              />
            </div>

            {/* Bus Filter */}
            <select
              value={transportFilter}
              onChange={(e) => setTransportFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none focus:border-purple-500 focus:bg-white"
            >
              <option value="All Transport">All Transport</option>

              {routes.map((item) => (
                <option key={item.id} value={item.bus}>
                  {item.bus}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none focus:border-purple-500 focus:bg-white"
            >
              <option value="All Status">All Status</option>
              <option value="On Route">On Route</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Filter Information */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredRoute.length}
              </span>{" "}
              of {routes.length} buses
            </p>

            {(search ||
              transportFilter !== "All Transport" ||
              statusFilter !== "All Status") && (
              <button
                onClick={() => {
                  setSearch("");
                  setTransportFilter("All Transport");
                  setStatusFilter("All Status");
                }}
                className="text-xs font-semibold text-purple-600 hover:text-purple-800"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Bus Route Cards */}
        <div className="flex flex-col gap-5">

          {filteredRoute.length > 0 ? (
            filteredRoute.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                {/* Bus Header */}
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                      <FaBus className="text-xl text-purple-600" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg text-left font-bold text-gray-800">
                        {item.bus}
                      </h3>

                      <p className="mt-1 break-words text-sm text-gray-500">
                        {item.Route} · {item.driver}
                      </p>
                    </div>
                  </div>

                  {/* Status and Delete */}
                  <div className="flex items-center justify-between gap-3 sm:justify-end">

                    <span
                      className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${getStatusStyle(item.status)}`}
                    >
                      {item.status === "On Route" ? (
                        <FaClock />
                      ) : item.status === "Completed" ? (
                        <FaCheckCircle />
                      ) : (
                        <FaExclamationCircle />
                      )}

                      {item.status || "Unknown"}
                    </span>

                    <button
                      onClick={() => handleDeleteBus(item.id)}
                      title="Delete Bus"
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Driver and Student Information */}
                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

                  <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                    <FaUserTie className="text-purple-500" />

                    <div>
                      <p className="text-xs text-left text-gray-400">Driver</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {item.driver || "Not assigned"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                    <FaUsers className="text-blue-500" />

                    <div>
                      <p className="text-xs text-left text-gray-400">Students</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {Number(item.students) || 0} Students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                    <FaRoute className="text-green-500" />

                    <div>
                      <p className="text-xs text-left text-gray-400">Route</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {item.Route || "Not assigned"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Route Timeline */}
                <div className="border-t border-gray-100 pt-5">
                  <div className="mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />

                    <h4 className="text-sm font-bold text-gray-700">
                      Route Stops & Schedule
                    </h4>
                  </div>

                  {Array.isArray(item.stops) &&
                  item.stops.length > 0 ? (
                    <div className="overflow-x-auto pb-3">
                      <div className="flex min-w-max items-start px-3 py-3">

                        {item.stops.map((stop, index) => (
                          <React.Fragment key={`${item.id}-${index}`}>

                            <div className="flex w-24 flex-col items-center">

                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                                  index === item.stops.length - 1
                                    ? "bg-purple-600 text-white"
                                    : "bg-purple-100 text-purple-600"
                                }`}
                              >
                                {index + 1}
                              </div>

                              <p className="mt-3 max-w-24 text-center text-xs font-semibold text-gray-700">
                                {stop}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                {formatTime(item.times?.[index])}
                              </p>
                            </div>

                            {index !== item.stops.length - 1 && (
                              <div className="mt-4 h-0.5 w-12 shrink-0 bg-purple-200" />
                            )}

                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-400">
                      No route stops added.
                    </p>
                  )}
                </div>

                {/* Card Footer */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">

                  <p className="text-xs text-gray-400">
                    Bus ID: #{item.id}
                  </p>

                  <span className="rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-600">
                    {item.stops?.length || 0} Route Stops
                  </span>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
                <FaBus className="text-3xl text-purple-400" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-800">
                No transport routes found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setTransportFilter("All Transport");
                  setStatusFilter("All Status");
                }}
                className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Summary */}
        <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-5">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold text-gray-800">
                Transport Overview
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Current registered transport information
              </p>
            </div>

            <p className="text-sm font-semibold text-purple-700">
              {totalBuses} Buses · {totalStudents} Students
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Details;
