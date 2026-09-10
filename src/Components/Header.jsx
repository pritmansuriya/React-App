import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Home", link: "home" },
  { name: "Feature", link: "feature2" },
  { name: "Testimonial", link: "test" },
  { name: "Pricing", link: "price" },
  { name: "News & Event", link: "faq" },
  { name: "About us", link: "footer" },
  { name: "Contact"},
];
const Header = ({active, setActive, onOpenContact}) => { 
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <header className="w-full fixed left-0 top-0 z-50 bg-purple-700">
      <div className="max-w-full mx-auto flex items-center justify-between px-8 mr-24">
        {/* Logo */}
        <div className=" items-center ml-8 gap-8">
          <img
            src="src\assets\Luxi-Saas-Logo.png"
            alt="Logo"
            className="w-14 h-14 object-contain"
          ></img>

          <div>
            <p className="text-gray-200 text-xs">Software</p>
          </div>
        </div>
        {/* Menu */}
        <nav>
          <ul className="flex items-center gap-10 text-white text-sm">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative flex flex-col items-center"
              >
                <button
                  onClick={() => {
                    setActive(item.name);

                    if (item.name === "Contact") {
                      onOpenContact();
                    } else {
                      scrollToSection(item.link);
                    }
                  }}
                  className={`hover:text-gray-950 cursor-pointer ${
                    active === item.name ? "text-white" : ""
                  }`}
                >
                  {item.name}
                </button>

                {active === item.name && (
                  <img
                    src="src/assets/Active Indicator.png"
                    alt="active"
                    className="absolute w-7  mt-7"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Right Side */}
        <div className="flex items-center gap-8 mr-5 cursor-pointer">
          <button
            onClick={() => navigate("/signin")}
            className="text-white cursor-pointer hover:text-gray-950"
          >
            SIGN IN
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-lime-400 px-6 py-1 hover:bg-gray-950 cursor-pointer rounded-full text-white"
          >
            REGISTER
          </button>

          <img src="src\assets\Setting.png" alt="setting" className="w-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
