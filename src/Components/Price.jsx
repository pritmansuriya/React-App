import React, { useState } from "react";
import activepurple from "../assets/Activepurple.png";

const plans = [
  {
    title: "Starter",
    price: "$0",
    description: "For small pilot programs",
    highlight: false,
    features: [
      "Student records",
      "Basic attendance",
      "Single admin user",
      "Email support",
    ],
  },
  {
    title: "School",
    price: "$29",
    description: "Most popular for growing schools",
    highlight: true,
    features: [
      "Everything in Starter",
      "Performance tracking",
      "Class scheduling",
      "Parent notifications",
      "Priority support",
    ],
  },
  {
    title: "Campus",
    price: "$79",
    description: "For multi-department operations",
    highlight: false,
    features: [
      "Everything in School",
      "Advanced reporting",
      "Library tools",
      "Custom roles",
      "Dedicated onboarding",
    ],
  },
];

const Price = () => {
  const [active, setActive] = useState(1);
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="price"
      className="relative overflow-hidden bg-white py-14 transition-colors duration-300 dark:bg-slate-950 lg:py-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mb-10 text-center lg:mb-14">
          <p className="inline-flex rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm transition-colors duration-300 dark:border-violet-400/30 dark:bg-slate-800 dark:text-blue-300">
            Sample pricing
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-800 transition-colors duration-300 dark:text-white sm:text-5xl">
            <span className="text-gray-500 dark:text-slate-400">
              Simple plans
            </span>{" "}
            for every stage
          </h2>

          <img
            src={activepurple}
            alt="Active pricing indicator"
            className="mx-auto mb-6 mt-4 w-14"
          />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, index) => {
            const isActive =
              hovered !== null ? hovered === index : active === index;

            return (
              <article
                key={plan.title}
                onClick={() => setActive(index)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`cursor-pointer rounded-2xl border bg-white p-1 shadow-xl transition-all duration-300 dark:bg-slate-900 dark:shadow-black/20 ${
                  isActive
                    ? " -translate-y-1 border-purple-600 dark:border-purple-400"
                    : "border-slate-200 hover:border-blue-200 dark:border-slate-700 dark:hover:border-blue-500"
                }`}
              >
                {/* Plan Header */}
                <div
                  className={`rounded-xl border p-6 transition-colors duration-300 ${
                    isActive
                      ? "border-purple-600 bg-gradient-to-br from-violet-700 to-purple-700 text-white dark:border-purple-500"
                      : "border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                        isActive
                          ? "text-purple-100"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {plan.title}
                    </p>

                    {plan.highlight && (
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                        Best value
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-4xl font-black">
                      {plan.price}
                    </span>

                    <span
                      className={
                        isActive
                          ? "text-purple-100"
                          : "text-slate-500 dark:text-slate-400"
                      }
                    >
                      {plan.price === "$0" ? "" : "/mo"}
                    </span>
                  </div>

                  <p
                    className={`mt-3 text-left text-sm ${
                      isActive
                        ? "text-purple-100"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Plan Features */}
                <div className="px-6 pb-6 pt-5">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Plan Button */}
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActive(index);
                    }}
                    className={`mt-7 w-full rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                      isActive
                        ? "bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white hover:from-fuchsia-700 hover:to-purple-800"
                        : "bg-slate-900 text-white hover:bg-blue-700 dark:bg-slate-700 dark:hover:bg-blue-600"
                    }`}
                  >
                    {plan.price === "$0" ? "Start free" : "Choose plan"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Price;
