import { image } from "framer-motion/client";
import React, {useState} from "react";
import LibraryItem from "./LibraryItem";
import { FiChevronDown, FiStar, FiBookOpen } from "react-icons/fi";
import { FaMedal } from "react-icons/fa";

const books = [
  {
    id: 11,
    image: "src/assets/Literature.png",
    title: "Literature",
    files: 302,
  },
  {
    id: 12,
    image: "src/assets/Maths.png",
    title: "Mathematics",
    files: 1872,
  },
  {
    id: 13,
    image: "src/assets/English.png",
    title: "English",
    files: 575,
  },
  {
    id: 14,
    image: "src/assets/Science.png",
    title: "Science",
    files: 249,
  },
];
const Library = () => {
  const [showPopular, setShowPopular] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm h-94 px-3 py-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[28px] font-bold text-gray-800">Library</h2>
        <div className="relative">
          <button
            onClick={() => setShowPopular(!showPopular)}
            className="flex items-center gap-1 text-sm font-medium cursor-pointer text-gray-500 hover:text-purple-600 transition"
          >
            View All
            <FiChevronDown
              className={`transition-transform duration-200 ${
                showPopular ? "rotate-180" : ""
              }`}
            />
          </button>

          {showPopular && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
              <div className="px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FiBookOpen />
                  Popular Books
                </h3>
              </div>

              <div className="py-2">
                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                  <FaMedal className="text-yellow-500" />
                  <span className="text-gray-700">Mathematics</span>
                </button>

                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                  <FaMedal className="text-gray-400" />
                  <span className="text-gray-700">English</span>
                </button>

                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                  <FaMedal className="text-amber-700" />
                  <span className="text-gray-700">Literature</span>
                </button>

                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                  <FiStar className="text-green-500" />
                  <span className="text-gray-700">Science</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Items */}
      <div className="space-y-1">
        {books.map((item) => (
          <LibraryItem
            key={item.id}
            image={item.image}
            title={item.title}
            files={item.files}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
