import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  School,
  Users,
  ClipboardCheck,
  Library,
  HeartHandshake,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";

import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";

const testimonialData = [
  {
    id: 1,
    logo: GraduationCap,
    image: user1,
    name: " Principal",
    role: "School Administrator",
    feedback:
      "Sample testimonial for UI development: The dashboard brings daily school tasks into one view and makes communication much simpler.",
  },
  {
    id: 2,
    logo: BookOpen,
    image: user2,
    name: " Teacher",
    role: "Class Coordinator",
    feedback:
      "Sample feedback for demo purposes: Attendance and reporting are easier to manage when everything is connected in one place.",
  },
  {
    id: 3,
    logo: Users,
    image: user3,
    name: " Parent",
    role: "Parent Liaison",
    feedback:
      "Sample review for prototype testing: Updates and announcements are clearer, and follow-up is much more organized.",
  },
  {
    id: 4,
    logo: School,
    image: user1,
    name: " Admin",
    role: "Operations Lead",
    feedback:
      "Sample testimonial for design review: The system helps reduce manual admin work without creating extra complexity.",
  },
  {
    id: 5,
    logo: ClipboardCheck,
    image: user2,
    name: " Office Staff",
    role: "Admissions Team",
    feedback:
      "Sample content only: It is easier to keep student records consistent when core forms and schedules live in one place.",
  },
  {
    id: 6,
    logo: BriefcaseBusiness,
    image: user3,
    name: " Manager",
    role: "Academic Support",
    feedback:
      "Sample feedback for prototype review: Task tracking and communication feel more streamlined, especially for busy school teams.",
  },
  {
    id: 7,
    logo: Library,
    image: user1,
    name: " Librarian",
    role: "Library Team",
    feedback:
      "Sample testimonial for demo purposes: Managing requests and records is more organized when the workflow is centralized.",
  },
  {
    id: 8,
    logo: HeartHandshake,
    image: user2,
    name: " Counselor",
    role: "Student Support",
    feedback:
      "Sample review: The interface makes it easier to keep updates visible and follow through quickly on important tasks.",
  },
  {
    id: 9,
    logo: UserRound,
    image: user3,
    name: " Supervisor",
    role: "School Operations",
    feedback:
      "Sample content only: The product helps teams move faster when records, scheduling, and notifications are connected.",
  },
];

const Test = () => {
  const [active, setActive] = useState(
    testimonialData.findIndex((item) => item.id === 5),
  );

  return (
    <section id="test" className="w-full overflow-hidden bg-slate-50 py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center lg:mb-12">
          <p className="inline-flex self-start rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
            Sample feedback for development
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
            What schools say about the platform
          </h2>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          <article className="flex min-h-80 flex-col justify-between rounded-2xl bg-gradient-to-br from-violet-700 to-purple-800 p-6 text-white shadow-xl shadow-purple-900/10 sm:p-8 lg:min-h-96">
            <div>
              <div className="text-7xl leading-none text-purple-200/60" aria-hidden="true">
                “
              </div>
              <p className="mt-3 max-w-2xl text-left text-lg leading-8 text-purple-50 sm:text-xl">
                {testimonialData[active].feedback}
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-white/20 pt-6">
              <img
                src={testimonialData[active].image}
                className="h-14 w-14 rounded-full border-2 border-white/70 object-cover"
                alt=""
              />
              <div>
                <h3 className="font-bold text-left text-white">{testimonialData[active].name}</h3>
                <p className="mt-1 text-sm text-left text-purple-200">{testimonialData[active].role}</p>
              </div>
            </div>
          </article>

          <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid w-full grid-cols-3 justify-items-center gap-3 sm:gap-4">
          {testimonialData.map((item, index) => {
            const Icon = item.logo;

            return (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                aria-label={`View testimonial from ${item.name}`}
                aria-pressed={active === index}
                className={`flex aspect-square w-full max-w-28 items-center justify-center rounded-xl border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                  active === index
                    ? "border-purple-300 bg-purple-100 text-purple-700 shadow-lg shadow-purple-100"
                    : "border-gray-200 bg-white text-gray-400 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                <Icon size={32} strokeWidth={1.7} aria-hidden="true" />
              </button>
            );
          })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Test;
