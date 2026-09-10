import React, { useState } from "react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitterSquare,
  FaInstagram,
} from "react-icons/fa";
import { IoGlobeOutline, IoChevronDown } from "react-icons/io5";

const Footer = () => {
  const [language, setLanguage] = useState("English - En");
  const [open, setOpen] = useState(false);

  const socialIcons = [
    {
      icon: <FaFacebookF />,
      bg: "bg-purple-500",
      hover: "hover:bg-blue-600",
    },
    {
      icon: <FaLinkedinIn />,
      bg: "bg-purple-500",
      hover: "hover:bg-blue-700",
    },
    {
      icon: <FaTwitterSquare />,
      bg: "bg-purple-500",
      hover: "hover:bg-sky-500",
    },
    {
      icon: <FaInstagram />,
      bg: "bg-purple-500",
      hover: "hover:bg-pink-500",
    },
  ];

  const languages = [
    "English - En",
    "Hindi - Hi",
    "Gujarati - Gu",
    "French - Fr",
    "German - Gr",
  ];
  return (
    <section id="footer" className="relative bg-purple-600 py-24 overflow-visible">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-white text-5xl font-semibold">
          What are you waiting for?
        </h2>
        <div className="flex justify-center mt-10">
          <button className="bg-lime-500 text-white px-8 py-3 cursor-pointer rounded-full text-sm hover:bg-gray-950 duration-300">
            GET STARTED
          </button>
        </div>
        {/* Footer */}
        <div className="grid lg:grid-cols-5 gap-12 mt-24">
          {/* Logo */}
          <div>
            <img src="src\assets\Luxi-Saas-Logo.png" alt="" className="w-20" />
            <h3 className="text-white font-semibold text-left mt-2">
              Software
            </h3>
            <div className="mt-14">
              <p className="text-white/70 text-left text-sm mt-8">
                © Luvi Theme 2019
              </p>
            </div>
          </div>
          {/* Company */}
          <div className="mt-8">
            <h4 className="text-white text-left font-semibold mb-6">COMPANY</h4>
            <ul className="space-y-3 text-sm text-left text-white/80 cursor-pointer">
              <li className="hover:text-gray-950">Donec dignissim</li>
              <li className="hover:text-gray-950">Curabitur egestas</li>
              <li className="hover:text-gray-950">Nam posuere</li>
              <li className="hover:text-gray-950">Aenean facilisis</li>
            </ul>
          </div>
          {/* Services */}
          <div className="mt-8">
            <h4 className="text-white text-left font-semibold mb-6">
              SERVICES
            </h4>
            <ul className="space-y-3 text-sm text-left text-white/80 cursor-pointer">
              <li className="hover:text-gray-950">Cras convallis</li>
              <li className="hover:text-gray-950">Vestibulum faucibus</li>
              <li className="hover:text-gray-950">Quisque lacinia purus</li>
              <li className="hover:text-gray-950">Aliquam nec ex</li>
            </ul>
          </div>
          {/* Legal */}
          <div className="mt-8">
            <h4 className="text-white text-left font-semibold mb-6">LEGAL</h4>
            <ul className="space-y-3 text-sm text-left text-white/80 cursor-pointer">
              <li className="hover:text-gray-950">Suspendisse porttitor</li>
              <li className="hover:text-gray-950">Nam posuere</li>
              <li className="hover:text-gray-950">Curabitur egestas</li>
            </ul>
          </div>
          {/* Right side */}
          <div className="flex flex-col items-start mt-8">
            {/* Images */}
            <div className="flex items-center justify-center gap-5">
              {socialIcons.map((item, index) => (
                <button
                  key={index}
                  className={` ${item.bg} ${item.hover} w-9 h-9 rounded-full cursor-pointer  flex items-center justify-center transition-all duration-300 hover:scale-110`}
                >
                  <span className="text-white text-2xl">{item.icon}</span>
                </button>
              ))}
            </div>
            {/* Language */}
            <div className="relative mt-12 w-52 overflow-visible">
              <button
                onClick={() => setOpen(!open)}
                className="w-full border h-14  border-white/40 rounded-lg px-5 py-2 flex items-center transition cursor-pointer  justify-between text-gray-950"
              >
                <div className="flex items-center gap-2">
                  <IoGlobeOutline className="text-white text-xl" />
                  <span className="text-white text-lg">{language}</span>
                </div>

                <IoChevronDown
                  className={`text-white text-lg transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open && (
                <div className="absolute left-0 top-full mt-2 w-full bg-[#A020F0] rounded-xl shadow-2xl border border-white/20 overflow-hidden z-9999">
                  {languages.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {  
                        setLanguage(item);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-3 text-white cursor-pointer hover:bg-purple-700 transition-colors"
                    >
                      <IoGlobeOutline className="text-lg" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Footer;
