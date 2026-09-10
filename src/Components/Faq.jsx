import React, { useState } from "react";

const faqData = [
  {
    question: "Pellentesque ac bibendum tortor?",
    answer:
      "Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.",
  },
  {
    question: "In mi nulla, fringilla vestibulum?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, fugiat.",
  },
  {
    question: "Quisque lacinia purus ut libero?",
    answer:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.",
  },
  {
    question: "Quisque ut metus sit amet augue?",
    answer: "Donec vitae sapien ut libero venenatis faucibus.",
  },
  {
    question: "Pellentesque ac bibendum tortor?",
    answer:
      "Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.",
  },
];

const blogData = [
  {
    image: "src/assets/News.png",
    title: "EVENT",
    description:
      "Sed imperdiet enim ligula, vitae viverra justo porta vel. Duis eget felis bibendum, pretium mi sed, placerat ante.",
  },
  {
    image: "src/assets/Event.png",
    title: "NEWS",
    description:
      "Sed imperdiet enim ligula, vitae viverra justo porta vel. Duis eget felis bibendum, pretium mi sed, placerat ante.",
  },
];
const Faq = () => {
  const [active, setActive] = useState(0);
  return (
    <section id="faq" className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2 className="text-5xl text-left font-light text-gray-700">FAQ</h2>
            <img
              src="src\assets\Activepurple.png "
              alt="Purple Active"
              className="w-18 mt-14 mb-6 "
            />
            <p className="text-gray-600 leading-8 text-left max-w-sm text-lg">
              Vestibulum sit amet tortor sit amet libero lobortis semper at et
              odio.
            </p>
            <div className="mt-16 flex justify-start">
              <img src="src\assets\decoration.png" alt="" className="w-75" />
            </div>
          </div>
          {/* Right */}
          <div className="bg-white rounded-xl overflow-hidden">
            {faqData.map((item, index) => (
              <div key={index} className=" last:border-none">
                <button
                  onClick={() => setActive(index)}
                  className={`w-full flex justify-between items-center px-8 py-10 transition-all ${
                    active === index
                      ? "bg-lime-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <span className="font-semibold text-left">
                    {item.question}
                  </span>

                  <img
                    src={
                      active === index
                        ? "src/assets/chevron-down (1).png"
                        : "src/assets/chevron-down.png"
                    }
                    alt=""
                    className={`w-4 h-4 transition-transform duration-500 ${
                      active === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    active === index
                      ? "max-h-32 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 py-6 bg-white">
                    <p className="text-gray-600 text-left leading-8">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom */}
        <div className="grid md:grid-cols-2 gap-12 mt-24">
          {blogData.map((item, index) => (
            <div key={index} className="flex gap-5">
              <img
                src={item.image}
                alt=""
                className="w-28 h-26 rounded-lg object-cover"
              ></img>

              <div>
                <p className="text-xs uppercase text-left text-gray-500 tracking-wider">
                  {item.title}
                </p>
                <p className="mt-2 text-gray-700 text-left leading-7">
                  {item.description}
                </p>
                <div className="text-left">
                  <button className="mt-3 text-purple-600 text-sm  cursor-pointer hover:text-gray-950">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
