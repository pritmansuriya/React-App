import React from "react";

const Feature2 = () => {
  return (
    <section id="feature2" className="relative overflow-hidden bg-white py-20">
      {/* Top Right Curve */}

      {/* Background Shape */}
      <div className="absolute bottom-0 right-0 w-[45%] h-55 bg-white rounded-tl-[220px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          {/* Left Image */}

          <div className="relative w-full lg:w-1/2">
            {/* Dashboard */}

            <img
              src="src\assets\Feature 1.png"
              alt=""
              className="w-full max-w-2xl hover:scale-110  rounded-xl"
            />
          </div>

          {/* Right Content */}

          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-[42px] leading-tight font-light text-gray-500">
              Vivamus sit
              <br />
              amet <span className="font-bold text-gray-900">interdum</span>
            </h2>

            <img
              src="src\assets\Activepurple.png"
              alt="underline"
              className="mt-2 mb-6  w-14"
            />

            <p className="text-gray-700 leading-9 text-[26px] max-w-md mt-3.5">
              Vivamus et luctus mauris.
              <br />
              Maecenas nisl libero, tincidunt id odio id, feugiat vulputate
              quam.
            </p>

            <button className="mt-8 bg-purple-600 hover:bg-gray-950 transition cursor-pointer text-white text-xs font-semibold px-11 py-3 rounded-full">
              SEE DETAIL
            </button>
          </div>
        </div>
      </div>

      {/* White Curve */}
      <div className="absolute -bottom-20 -left-24 w-112.5 h-75 bg-white rounded-tr-[250px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto mt-48 px-6 lg:px-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-20">
          {/* Left Content */}

          <div className="w-full lg:w-5/12 text-center  lg:text-right">
            <h2 className="text-[42px] leading-tight font-light text-gray-500">
              Lorem ipsum
              <br />
              dolor <span className="font-bold text-gray-900">sit amet</span>
            </h2>

            {/* Purple Line */}

            <img
              src="src\assets\Activepurple.png"
              alt="underline"
              className="mt-2 ml-110 mb-6 w-14"
            />

            <p className="text-gray-700 text-[26px] leading-9">
              Vivamus et luctus mauris.
              <br />
              Maecenas nisl libero, tincidunt id odio id, feugiat vulputate
              quam.
            </p>

            <button className="mt-8 bg-purple-600 hover:bg-gray-950 transition cursor-pointer text-white text-xs px-11 py-3 rounded-full">
              SEE DETAIL
            </button>
          </div>

          {/* Right Image */}

          <div className="relative w-full lg:w-6/12">
            {/* Dashboard Image */}

            <img
              src="src\assets\Feature2.png"
              alt=""
              className="w-full hover:scale-110 rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature2;
