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
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <h2 className="text-7xl font-bold text-gray-800 text-center">
          <span className="text-gray-500">Quisque ut</span> Metus
        </h2>

        <img
          src={activePurple}
          alt="Purple Active"
          className="w-14 mt-4 mb-6 mx-auto"
        />

        {/* Buttons */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex gap-12 border-b">
            {tabsData.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActive(index)}
                className={`pb-4 font-semibold transition-all relative ${
                  active === index
                    ? "text-purple-600"
                    : "text-gray-500"
                }`}
              >
                {tab.title}

                {active === index && (
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-purple-600 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="text-center mt-14">
          <h3 className="text-gray-700 mt-6 max-w-7xl text-5xl leading-13 mx-auto">
            {tabsData[active].description}
          </h3>

          <img
            src={tabsData[active].image}
            alt={tabsData[active].title}
            className="mx-auto mt-14 hover:scale-110 transition-transform duration-300 rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Feature3;