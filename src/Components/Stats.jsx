import React from "react";

import androidShare from "../assets/android-share.png";
import personStalker from "../assets/person-stalker.png";
import socialBuffer from "../assets/social-buffer.png";

const stats = [
  {
    id: 21,
    image: androidShare,
    number: "12 Month",
    title: "Free Trial",
  },
  {
    id: 22,
    image: personStalker,
    number: "+80M",
    title: "Active Users",
  },
  {
    id: 23,
    image: socialBuffer,
    number: "+180K",
    title: "Providers",
  },
];

const Stats = () => {
  return (
    <section className="overflow-hidden bg-white py-16 transition-colors duration-300 dark:bg-slate-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {stats.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Statistics Card */}
              <div className="flex w-full flex-col items-center py-6">
                <h2 className="text-4xl font-bold text-purple-700 transition-colors duration-300 dark:text-purple-400">
                  {item.number}
                </h2>

                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 object-contain"
                  />

                  <p className="text-xl text-gray-600 transition-colors duration-300 dark:text-slate-300">
                    {item.title}
                  </p>
                </div>
              </div>

              {/* Vertical Divider */}
              {index !== stats.length - 1 && (
                <div className="hidden h-16 w-px shrink-0 bg-purple-200 transition-colors duration-300 dark:bg-slate-700 md:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
