import React from "react";
import { IoClose } from "react-icons/io5";

 export const Model = ({ isOpen, onClose, children }) => {
    
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm  duration-100 bg-black/60 px-5">
      <div className="relative w-full max-w-5xl bg-[#7422B7] rounded-[35px] shadow-2xl animate-modal overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-gray-900 transition"
        >
          <IoClose size={30} />
        </button>

        {/* Modal */}
        {children}
      </div>
    </div>
  );
};

export default Model;
