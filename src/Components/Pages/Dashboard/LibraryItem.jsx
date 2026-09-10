import React from "react";

 export const LibraryItem = ({ image, title, files }) => {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md transition-all">
      {/* Left */}
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={title}
          className="w-10 h-10 rounded-md object-cover"
        />

        <div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>

          <p className="text-xs text-gray-400">{files} files</p>
        </div>
      </div>
      {/* Right */}
      <button className="text-xs text-gray-400 hover:text-purple-600">
        Read now
      </button>
    </div>
  );
};

export default LibraryItem;
