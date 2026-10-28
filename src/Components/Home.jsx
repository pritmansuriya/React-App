import React from "react";
import dashboard from "../assets/home.png";

const Home = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden
        bg-gradient-to-br from-violet-50 via-white to-purple-50
        pt-28 transition-colors duration-300
        dark:from-slate-950 dark:via-slate-900 dark:to-violet-950
        sm:pt-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-14 pt-8 sm:pb-16 lg:px-8 lg:pb-24 lg:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">

          {/* Left Content */}
          <div className="flex w-full flex-col items-start py-2 sm:py-5">

            {/* Platform Badge */}
            <span
              className="inline-flex self-start rounded-full
                border border-violet-200 bg-white/80 px-4 py-2
                text-xs font-semibold uppercase tracking-[0.2em]
                text-violet-700 shadow-sm transition-colors
                dark:border-violet-400/30 dark:bg-slate-800/80
                dark:text-violet-300"
            >
              School Management Platform
            </span>

            {/* Main Heading */}
            <h1
              className="mt-6 w-full max-w-xl text-left text-4xl
                font-black leading-tight text-slate-900
                transition-colors duration-300
                dark:text-white sm:text-5xl lg:text-6xl"
            >
              Manage Your School,
              <span className="block text-violet-700 dark:text-violet-400">
                All in One Place.
              </span>
            </h1>

            {/* Description */}
            <p
              className="mt-6 w-full max-w-lg text-left text-lg
                leading-8 text-slate-600 transition-colors
                dark:text-slate-300"
            >
              Streamline admissions, attendance, classes, exams, and
              communication in a single smart dashboard designed for
              modern schools.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                className="rounded-full bg-violet-700 px-8 py-3
                  text-base font-semibold text-white shadow-lg
                  shadow-violet-700/20 transition-colors duration-200
                  hover:bg-violet-800 dark:bg-violet-600
                  dark:hover:bg-violet-500"
              >
                Get Started
              </button>

              <a
                href="#feature2"
                className="inline-flex items-center text-base
                  font-semibold text-slate-700 transition-colors
                  duration-200 hover:text-violet-700
                  dark:text-slate-200 dark:hover:text-violet-300"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Right Dashboard Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl">

              {/* Background Glow */}
              <div
                className="absolute -left-8 top-10 h-32 w-32
                  rounded-full bg-violet-200/70 blur-3xl
                  dark:bg-violet-700/30"
              />

              <div
                className="absolute -right-6 bottom-10 h-36 w-36
                  rounded-full bg-purple-200/70 blur-3xl
                  dark:bg-purple-700/30"
              />

              {/* Dashboard Preview */}
              <img
                src={dashboard}
                alt="School management dashboard preview"
                className="relative w-full rounded-2xl
                  border border-violet-100 bg-white/80 p-2
                  shadow-[0_24px_60px_rgba(76,29,149,0.12)]
                  transition duration-300
                  hover:shadow-[0_30px_70px_rgba(76,29,149,0.18)]
                  dark:border-slate-700 dark:bg-slate-800/80
                  dark:shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Wave */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1440 220"
          className="block h-24 w-full sm:h-32"
          aria-hidden="true"
        >
          <path
            className="fill-slate-50 transition-colors duration-300 dark:fill-slate-950"
            d="M0,160L80,181.3C160,203,320,245,480,229.3C640,213,800,139,960,138.7C1120,139,1280,213,1360,250.7L1440,288V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Home;
