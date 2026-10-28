import React from "react";

const features = [
  {
    title: "Student Management",
    description:
      "Track admissions, profiles, family details, and academic progress in one place.",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    title: "Attendance",
    description:
      "Monitor daily attendance across classes and generate instant reports effortlessly.",
    accent: "from-violet-500 to-purple-600",
  },
  {
    title: "Performance Reports",
    description:
      "Review marks, trends, and analytics to support student achievement and growth.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Library Management",
    description:
      "Manage book inventory, issue records, and returns with a streamlined workflow.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Class Scheduling",
    description:
      "Plan timetables, allocate faculty, and balance resources across all classes.",
    accent: "from-pink-500 to-rose-500",
  },
  {
    title: "Notifications",
    description:
      "Send announcements, alerts, and reminders to parents, students, and staff instantly.",
    accent: "from-slate-700 to-slate-900",
  },
];

const Feature2 = () => {
  return (
    <section
      id="feature2"
      className="bg-slate-50 py-14 transition-colors duration-300 dark:bg-slate-950 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-center lg:mb-12">
          <p className="inline-flex self-start rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm transition-colors duration-300 dark:border-violet-400/30 dark:bg-slate-800 dark:text-blue-300">
            Core Features
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900 transition-colors duration-300 dark:text-white sm:text-5xl">
            Everything your school needs to run smoothly.
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(37,99,235,0.10)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20 dark:hover:border-slate-600"
            >
              <div
                className={`mb-5 inline-flex rounded-xl bg-gradient-to-r ${feature.accent} p-3 shadow-lg`}
              >
                <div className="h-8 w-8 rounded-lg bg-white/20" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 transition-colors duration-300 dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Administration Section */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.04)] transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20 lg:mt-16 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                How it simplifies administration
              </p>

              <h3 className="mt-4 text-3xl font-black text-slate-900 transition-colors duration-300 dark:text-white">
                One system for daily school operations.
              </h3>
            </div>

            {/* Administration Benefits */}
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-5 text-left transition-colors duration-300 dark:bg-slate-800">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Centralized records
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Student, class, and staff data live in one place, so
                  administrators do not need to update multiple systems for the
                  same information.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5 text-left transition-colors duration-300 dark:bg-slate-800">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Fewer manual tasks
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Attendance, reporting, and scheduling are connected in the
                  same workflow, reducing repetitive admin work and keeping
                  processes consistent.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5 text-left transition-colors duration-300 dark:bg-slate-800">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Clear communication
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Notifications and updates can be sent from the same platform,
                  helping families, students, and staff stay informed without
                  extra coordination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature2;
