import React, { useState } from "react";

const testimonialData = [
  {
    id: 1,
    logo: "src/assets/Chrome.png",
    image: "src/assets/user1.png",
    name: "Prit Patel",
    role: "CEO, UX Maestro",
    feedback:
      "Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.",
  },
  {
    id: 2,
    logo: "src/assets/Facebook.png",
    image: "src/assets/user2.png",
    name: "Nancy Patel",
    role: "GM, UX Maestro",
    feedback:
      "Donec feugiat nisi vitae mauris vulputate, sed tincidunt magna gravida.",
  },
  {
    id: 3,
    logo: "src/assets/Firefox.png",
    image: "src/assets/user3.png",
    name: "Aryan Patel",
    role: "HR, UX Maestro",
    feedback:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.",
  },
  {
    id: 4,
    logo: "src/assets/Git.png",
    image: "src/assets/user1.png",
    name: "Pal Patel",
    role: "DA, UX Maestro",
    feedback:
      "Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.",
  },
  {
    id: 5,
    logo: "src/assets/Insta.png",
    image: "src/assets/user2.png",
    name: "Komal Patel",
    role: "SEO, UX Maestro",
    feedback:
      "Donec feugiat nisi vitae mauris vulputate, sed tincidunt magna gravida.",
  },
  {
    id: 6,
    logo: "src/assets/Linkden.png",
    image: "src/assets/user3.png",
    name: "Jeel Patel",
    role: "Tester, UX Maestro",
    feedback:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.",
  },
  {
    id: 7,
    logo: "src/assets/Twitter.png",
    image: "src/assets/user1.png",
    name: "Dhyey Patel",
    role: "Sales, UX Maestro",
    feedback:
      "Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor",
  },
  {
    id: 8,
    logo: "src/assets/whstapp.png",
    image: "src/assets/user2.png",
    name: "Vishva Patel",
    role: "Tester, UX Maestro",
    feedback:
      "Donec feugiat nisi vitae mauris vulputate, sed tincidunt magna gravida.",
  },
  {
    id: 9,
    logo: "src/assets/Youtube.png",
    image: "src/assets/user3.png",
    name: "Khush Patel",
    role: "BDE, UX Maestro",
    feedback:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.",
  },
];
const Test = () => {
  const [active, setActive] = useState(
    testimonialData.findIndex((item) => item.id === 5),
  );
  return (
    <section id="test" className="bg-white w-full overflow-hidden py-28">
      <div className="mx-auto grid lg:grid-cols-2 ml-2 items-center ">
        {/* Left */}
        <div className="relative max-w-7xl h-full">
          <svg
            className="absolute inset-0 max-w-7xl h-full"
            viewBox="0 0 720 520"
            preserveAspectRatio="none"
          >
            <path
              d="
              M15,70
              C120,20 210,70 340,55
              C520,30 630,90 700,240
              C735,340 720,470 620,470
              C500,470 390,420 260,485
              C140,535 30,470 0,420
              C-15,320 -10,170 15,70
              "
              fill="url(#grad)"
            />
            <defs>
              <linearGradient id="grad">
                <stop offset="0%" stopColor="#B51CFF" />
                <stop offset="100%" stopColor="#6817C8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative z-10 py-14 px-10 ml-7  text-white">
            <div className="mt-12">
              <h2 className="text-4xl text-left leading-tight">
                What Our Customers
                <br />
                <span className="font-bold text-4xl">Testimonial</span>
              </h2>
            </div>

            <div className="flex items-start gap-10 mt-24">
              <div className="flex flex-col items-center mt-18 w-30">
                <img
                  src={testimonialData[active].image}
                  className="w-16 h-16 rounded-full object-cover"
                  alt=""
                />
                <h4 className="mt-3 text-[22px] text-white text-left font-bold">
                  {testimonialData[active].name}
                </h4>

                <p className="text-purple-200 text-sm text-left">
                  {testimonialData[active].role}
                </p>
              </div>
              <div className="max-w-75">
                <div className="text-7xl text-purple-300 items-start opacity-30 leading-none">
                  "
                </div>

                <p className="text-xl leading-8 text-left mt-3 text-purple-100 ">
                  {testimonialData[active].feedback}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="grid grid-cols-3 gap-10 place-items-center">
          {testimonialData.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              className={`p-5 rounded-xl transition-all duration-300
                  ${
                    active == index
                      ? "bg-white scale-110"
                      : "opacity-40 hover:opacity-100"
                  }`}
            >
              <img src={item.logo} className="w-24 hover:scale-105 object-contain" alt="" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Test;
