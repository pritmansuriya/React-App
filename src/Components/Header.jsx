import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

import logo from "../assets/SchoolLogo.png";
import activeIndicator from "../assets/Activepurple.png";

const menuItems = [
  { name: "Home", link: "home" },
  { name: "Features", link: "feature2" },
  { name: "Testimonials", link: "test" },
  { name: "Pricing", link: "price" },
  { name: "News & Events", link: "news-events" },
  { name: "About", link: "about" },
];

const Header = ({ active, setActive, onOpenContact }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNavigation = (item) => {
    setActive(item.name);
    setMenuOpen(false);

    if (item.name === "Contact") {
      onOpenContact?.();
    } else {
      scrollToSection(item.link);
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-100 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}

        <div
          className="flex min-w-0 shrink-0 cursor-pointer items-center gap-2 sm:gap-3"
          onClick={() => {
            setActive("Home");
            setMenuOpen(false);
            scrollToSection("home");
          }}
        >
          <img
            src={logo}
            alt="SchoolFlow logo"
            className="h-9 w-9 object-contain sm:h-12 sm:w-12"
          />

          <div className="leading-tight">
            <p className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
              SchoolFlow
            </p>

            <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-blue-600 sm:text-[10px] sm:tracking-[0.2em]">
              Management
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}

        <nav className="hidden flex-1 md:block">
          <ul className="flex items-center justify-center gap-4 text-sm font-medium text-slate-700 lg:gap-7">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative flex flex-col items-center"
              >
                <button
                  onClick={() => handleNavigation(item)}
                  className={`whitespace-nowrap py-2 transition-colors duration-200 hover:text-blue-700 ${
                    active === item.name
                      ? "font-semibold text-blue-700"
                      : "text-slate-700"
                  }`}
                >
                  {item.name}
                </button>

                {active === item.name && (
                  <img
                    src={activeIndicator}
                    alt=""
                    className="absolute top-full mt-0.5 w-7"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Buttons */}

        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <button
            onClick={() => navigate("/signin")}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-700 hover:to-indigo-700 lg:px-5"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-2xl text-slate-700 transition hover:bg-slate-100 sm:hidden"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg sm:hidden">
          <nav>
            <ul className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${
                      active === item.name
                        ? "bg-blue-50 font-semibold text-blue-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/signin");
              }}
              className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700"
            >
              Login
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/register");
              }}
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
