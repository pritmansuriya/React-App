import React, { useState } from "react";

import activePurple from "../assets/Activepurple.png";
import feature4 from "../assets/Feature4.png";
import feature5 from "../assets/Feature5.png";
import feature6 from "../assets/Feature6.png";

const tabsData = [
  {
    id: 101,
    title: "PELLENTESQUE",
    description:
      "Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam.",
    image: feature4,
  },
  {
    id: 102,
    title: "DONEC",
    description:
      "Donec euismod ligula sed lorem vulputate, vitae interdum lacus luctus.",
    image: feature5,
  },
  {
    id: 103,
    title: "VESTIBULUM",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
    image: feature6,
  },
];

const Feature3 = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-white py-16 transition-colors duration-300 dark:bg-slate-950 sm:py-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2 className="text-center text-4xl font-bold text-gray-800 transition-colors duration-300 dark:text-white sm:text-5xl lg:text-7xl">
          <span className="text-gray-500 dark:text-slate-400">
            Quisque ut
          </span>{" "}
          Metus
        </h2>

        <img
          src={activePurple}
          alt="Purple Active"
          className="mx-auto mb-6 mt-4 w-14"
        />

        {/* Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="flex max-w-full gap-6 overflow-x-auto border-b border-gray-200 dark:border-slate-700 sm:gap-10 lg:gap-12">
            {tabsData.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(index)}
                aria-selected={active === index}
                role="tab"
                className={`relative shrink-0 pb-4 text-sm font-semibold transition-colors duration-200 sm:text-base ${
                  active === index
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {tab.title}

                {active === index && (
                  <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-purple-600 dark:bg-purple-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-10 text-center sm:mt-14">
          <h3
            role="tabpanel"
            className="mx-auto mt-6 max-w-5xl text-2xl leading-relaxed text-gray-700 transition-colors duration-300 dark:text-slate-200 sm:text-3xl lg:text-5xl"
          >
            {tabsData[active].description}
          </h3>

          <img
            src={tabsData[active].image}
            alt={tabsData[active].title}
            className="mx-auto mt-10 h-auto max-w-full rounded-3xl transition-transform duration-300 hover:scale-[1.02] sm:mt-14"
          />
        </div>
      </div>
    </section>
  );
};

export default Feature3;
