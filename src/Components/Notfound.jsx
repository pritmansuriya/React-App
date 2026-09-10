import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <section className="min-h-screen bg-[#6A1BB1] flex items-center justify-center px-6">
     {/* <div className="relative bg-violet-600 text-white overflow-hidden flex rounded-[30px] flex-col items-center justify-center px-10 py-14"> */}
      <div className="max-w-6xl w-full grid lg:grid-cols-2 items-center animate-modal gap-10">
        {/* Left side */}
        <div className="flex justify-center">
          <div className="relative mt-7 w-[320px] h-60">
            <div className="w-72 h-48 bg-white rounded-[40px]  flex items-center justify-center">
              <h1 className="text-7xl font-bold text-purple-700">404</h1>
            </div>
            {/* Border Shape */}
            {/* <div className="absolute inset-0 border-0 border-purple-300 rounded-[40px] rotate-10"></div> */}
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center">
          {/* Vertical Line */}
          <div className="hidden lg:block w-px h-44 bg-[#5d148d] mr-10"></div>
          <div className=" text-left">
            <h2 className="text-4xl text-white font-bold leading-tight">
              This Page could not be found
            </h2>

            <p className="text-gray-200 text-lg  mt-7 max-w-md leading-8">
              You can either stay and chill page, or go back to the beginning. 
            </p>

            <Link
              to="/"
              className="mt-8 inline-block bg-lime-400 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-full transition duration-300"
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Notfound;
