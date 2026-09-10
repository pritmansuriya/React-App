import React, { useState } from "react";

const plans = [
  {
    title: "Basic",
    price: "Free",
    color: "text-green-600",
    button: "bg-lime-500",
    featured: false,
  },
  {
    title: "Best Value",
    price: "$24",
    color: "text-purple-600",
    button: "bg-purple-600",
    featured: true,
  },
  {
    title: "Pro",
    price: "$54",
    color: "text-purple-600",
    button: "bg-purple-600",
    featured: false,
  },
  {
    title: "Enterprise",
    price: "$99",
    color: "text-purple-600",
    button: "bg-purple-600",
    featured: false,
  },
];
const Price = () => {
  const [active, setActive] = useState(1);
  const [hovered, setHovered] = useState(null);
  return (
    <section id="price" className="relative overflow-hidden  bg-white py-24">
      {/* Background Blur */}
      {/* <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-200 opacity-40 blur-3xl"></div>

       <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-300 opacity-30 blur-3xl"></div> */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center items-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800">
            <span className="text-gray-500"> Pricing &</span> Plan
          </h2>

          <img
            src="src\assets\Activepurple.png"
            alt="Purple Active"
            className="w-14 mt-4 mb-6 ml-145"
          />
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => {
            const isActive =
              hovered !== null ? hovered === index : active === index;
            return (
              <div
                key={index}
                onClick={() => setActive(index)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`
    rounded-[28px]
    overflow-hidden
    bg-white
    cursor-pointer
    transition-all
    border
    border-white
    duration-500
    shadow-2xl
    ${
      isActive
        ? "-translate-y-5 scale-105 border border-purple-600 z-20 relative"
        : "hover:shadow-2xl"
    }
  `}
              >
                <div
  className={`text-center transition-all duration-500 overflow-hidden ${
    isActive
      ? "bg-linear-to-r from-fuchsia-600 to-purple-700 text-white py-8 rounded-b-[90px]"
      : "py-10 bg-linear-to-r from-lime-500 to-lime-200 text-white rounded-b-[90px]"
  }`}
>
                  <p
                    className={`uppercase font-semibold transition-colors duration-300 ${
                      isActive ? "text-white" : plan.color
                    }`}
                  >
                    {plan.title}
                  </p>

                  <h3
                    className={`text-4xl font-bold mt-2 ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {plan.price}
                  </h3>
                </div>

                {/* Content */}

                <div className="px-8 py-8 text-center">
                  {[
                    "Nam sollicitudin dignissim",
                    "Cras convallis lacus",
                    "Quisque ut metus",
                    "Vivamus sit amet",
                    "Cras convallis lacus orci",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="py-3 border-b border-dashed text-gray-500 text-sm"
                    >
                      {item}
                    </div>
                  ))}

                  <p className="text-xs text-gray-400 mt-8">
                    Interdum et malesuada fames ac ante ipsum primis in
                    faucibus.
                  </p>
                  <button
                    className={`mt-8 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300
  ${
    isActive
      ? "bg-linear-to-r from-fuchsia-600 to-purple-700 hover:bg-none hover:bg-gray-950"
      : index === 0
        ? "bg-lime-500 "
        : "bg-lime-500"
  }`}
                  >
                    CHOOSE PLAN
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Price;
