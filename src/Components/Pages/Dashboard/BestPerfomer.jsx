import React from "react";
import { IoChevronDown } from "react-icons/io5";

const perfomer = [
  {
    id: 1,
    className: "Class 06",
    subject: "Math",
    color: "from-violet-600 to-purple-500",
    width: "180px",
    percent: "60%",
    left : "80px",
    avatars: [
      "src/assets/user1.png",
      "src/assets/user2.png",
      "src/assets/user3.png",
    ],
  },
  {
    id: 2,
    className: "Class 04",
    subject: "GK",
    color: "from-orange-500 to-yellow-400",
    width: "150px",
    percent: "70%",
    left : "0px",
    avatars: [
      "src/assets/user3.png",
      "src/assets/user2.png",
      "src/assets/user1.png",
    ],
  },
  {
    id: 3,
    className: "Class 03",
    subject: "Science",
    color: "from-indigo-500 to-cyan-400",
    width: "230px",
    percent: "72%",
    left : "110px",
    avatars: [
      "src/assets/user1.png",
      "src/assets/user3.png",
      "src/assets/user2.png",
    ],
  },
  {
    id: 4,
    className: "Class 08",
    subject: "English",
    color: "from-red-500 to-orange-500",
    width: "160px",
    percent: "47%",
    left : "190px",
    avatars: [
      "src/assets/user2.png",
      "src/assets/user3.png",
      "src/assets/user1.png",
    ],
  },
];
const BestPerfomer = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm h-94 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Best Performers</h2>

        <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-500 hover:border-purple-500 transition">
          <span>Weekly</span>
          <IoChevronDown className="text-base" />
        </button>
      </div>
      {/* Rows */}
      <div className="space-y-7">
        {perfomer.map((item) => (
          <div key={item.id} className="flex items-center gap-5">
            <p className = 'w-20 text-gray-500 font-medium'>
                {item.className}
            </p>

            <div className = 'relative flex-1 h-8 rounded-full bg-gray-100'>
                <div 
                    className = {`h-full rounded-full bg-linear-to-r ${item.color} flex items-center justify-between px-2`}
                    style={{ width: item.width,
                             left : item.left
                     }}
                >
                    <div className = 'flex -space-x-2'>
                        {item.avatars.map((img,index) => (
                            <img
                                key={index}
                                src = {img}
                                alt = ''
                                className = 'w-6 h-6 rounded-full border-2 border-white object-cover'
                    />
                        ))}
                    </div>
                    <span className = 'text-xs text-white font-medium'>
                        {item.subject}
                    </span>
                </div>

                <div className = 'absolute right-1 top-1/2 -translate-y-1/2 bg-white rounded-full px-2 py-0.5 text-xs font-semibold text-gray-500'>
                {item.percent}
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className = 'ml-28 flex justify-around mt-10 text-sm text-gray-400'>
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
      </div>
    </div>
  );
};

export default BestPerfomer;
