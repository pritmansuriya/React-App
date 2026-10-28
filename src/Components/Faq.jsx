import React from "react";
import parents from "../assets/parents.png";
import admission from "../assets/admission.png";
import week from "../assets/week.png";

const eventData = [
  {
    image: admission,
    tag: "Event",
    title: "Admissions Open 2026",
    date: "14 Oct 2026",
    description:
      "School tours and registration support begin this month for new families planning the academic year ahead.",
  },
  {
    image: week,
    tag: "News",
    title: "Wellbeing Week Highlights",
    date: "22 Oct 2026",
    description:
      "Our community initiatives focused on student wellbeing, teacher support, and healthier daily routines across campus.",
  },
  {
    image: parents,
    tag: "Event",
    title: "Parent Workshop Series",
    date: "05 Nov 2026",
    description:
      "A practical series covering student success habits, communication, and school planning for the new term.",
  },
];

const NewsEvents = () => {
  return (
    <section
      id="news-events"
      className="overflow-hidden bg-slate-50 py-14 transition-colors duration-300 dark:bg-slate-950 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mb-10 text-center lg:mb-12">
          <p className="inline-flex rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm transition-colors duration-300 dark:border-violet-400/30 dark:bg-slate-800 dark:text-blue-300">
            News &amp; Events
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900 transition-colors duration-300 dark:text-white sm:text-5xl">
            Stay connected with the school community.
          </h2>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {eventData.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                {/* Tag and Date */}
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                    {item.tag}
                  </span>

                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.date}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="mt-4 text-xl font-bold text-slate-900 transition-colors duration-300 dark:text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-slate-600 transition-colors duration-300 dark:text-slate-300">
                  {item.description}
                </p>

                {/* Read More Button */}
                <button
                  type="button"
                  onClick={() =>
                    window.alert(`${item.title}\n\n${item.description}`)
                  }
                  className="mt-5 text-sm font-semibold text-blue-700 transition hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-slate-900"
                >
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
