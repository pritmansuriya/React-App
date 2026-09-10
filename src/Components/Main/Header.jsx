import React from "react";
import { FiSearch, FiBell, FiMessageSquare } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import  userImage from "E:/Software/src/assets/user1.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-r border-gray-200 px-2 ">

      {/* Search */}
      <div className="relative w-80">

        <input
          type="text"
          placeholder="Search anything here"
          className="w-full h-9 rounded-md border border-gray-100 pl-4 pr-12 text-sm outline-none"
        />

        <FiSearch
          className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500"
          size={20}
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <button className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
          <FiBell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        <button className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
          <FiMessageSquare size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500"></span>
        </button>

        <div className="flex items-center gap-2">
          
          <img
            src={userImage}
            className="w-10 h-10 rounded-full object-cover"
            alt="Image"
          />

          <div>
            <h2 className="text-base font-semibold">Luke J R</h2>
            <p className="text-xs text-left text-gray-500">Admin</p>
          </div>

          <IoChevronDown className="text-gray-500 text-lg" />
        </div>

      </div>

    </header>
  );
};

export default Header;