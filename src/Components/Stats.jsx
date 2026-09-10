import React from "react";

const stats = [
  {
    id: 21,
    image: "src/assets/android-share.png",
    number: "12 Month",
    title: "Free Trial",
  },
  {
    id: 22,
    image: "src/assets/person-stalker.png",
    number: "+80M",
    title: "Active Users",
  },
  {
    id: 23,
    image: "src/assets/social-buffer.png",
    number: "+180K",
    title: "Providers",
  },
];
const Stats = () => {
  return (
    <section className="bg-white overflow-hidden py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {stats.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Card */}
              <div className="flex flex-col items-center w-full py-6">
                <h2 className="text-4xl font-bold text-purple-700">
                  {item.number}
                </h2>

                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-6 h-6 object-contain"
                  />

                  <p className="text-gray-600 text-xl">{item.title}</p>
                </div>
              </div>

              {/* Vertical Line */}
              {index !== stats.length - 1 && (
                <div className="hidden md:block h-16 w-px bg-purple-200"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
