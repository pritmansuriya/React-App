import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SchoolLogo.png";
import activeIndicator from "../assets/Activepurple.png";

const menuItems = [
  { name: "Home", link: "home" },
  { name: "Features", link: "feature2" },
  { name: "Testimonials", link: "test" },
  { name: "Pricing", link: "price" },
  { name: "News & Events", link: "faq" },
  { name: "About", link: "footer" },
];

const Header = ({ active, setActive, onOpenContact }) => {
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
    <header className="w-full fixed left-0 top-0 z-50 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <img src={logo} alt="School management logo" className="w-12 h-12 object-contain" />
          <div className="leading-tight">
            <p className="text-lg font-extrabold tracking-tight text-slate-900">SchoolFlow</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              Management
            </p>
          </div>
        </div>

        <nav className="hidden md:block flex-1">
          <ul className="flex items-center justify-center gap-8 text-sm font-medium text-slate-700">
            {menuItems.map((item) => (
              <li key={item.name} className="relative flex flex-col items-center">
                <button
                  onClick={() => {
                    setActive(item.name);

                    if (item.name === "Contact") {
                      onOpenContact();
                    } else {
                      scrollToSection(item.link);
                    }
                  }}
                  className={`cursor-pointer transition-all duration-200 hover:text-blue-700 ${
                    active === item.name ? "text-blue-700" : "text-slate-700"
                  }`}
                >
                  {item.name}
                </button>

                {active === item.name && (
                  <img
                    src={activeIndicator}
                    alt="active navigation indicator"
                    className="absolute w-7 mt-7"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-indigo-700"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
