
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

import { useTheme } from "../Context/ThemeContext";

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
  const { darkMode, toggleTheme } = useTheme();

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

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b
      border-slate-200 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.08)]
      backdrop-blur-md transition-colors duration-300
      dark:border-slate-700 dark:bg-slate-900/95">

      <div className="mx-auto flex max-w-7xl items-center justify-between
        gap-3 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <div
          className="flex min-w-0 shrink-0 cursor-pointer items-center
            gap-2 sm:gap-3"
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
            <p className="text-base font-extrabold tracking-tight
              text-slate-900 dark:text-white sm:text-lg">
              SchoolFlow
            </p>

            <p className="text-[8px] font-semibold uppercase
              tracking-[0.15em] text-blue-600 dark:text-blue-400
              sm:text-[10px] sm:tracking-[0.2em]">
              Management
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 md:block">
          <ul className="flex items-center justify-center gap-4
            text-sm font-medium lg:gap-7">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative flex flex-col items-center"
              >
                <button
                  onClick={() => handleNavigation(item)}
                  className={`whitespace-nowrap py-2 transition-colors
                    duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                      active === item.name
                        ? "font-semibold text-blue-700 dark:text-blue-400"
                        : "text-slate-700 dark:text-slate-300"
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

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={handleThemeToggle}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={darkMode ? "Light Mode" : "Dark Mode"}
            className="flex h-10 w-10 items-center justify-center
              rounded-full border border-slate-200 bg-white
              text-slate-700 transition hover:bg-slate-100
              dark:border-slate-700 dark:bg-slate-800
              dark:text-yellow-300 dark:hover:bg-slate-700"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            onClick={() => navigate("/signin")}
            className="inline-flex items-center justify-center rounded-full
              border border-slate-200 px-4 py-2 text-sm font-semibold
              text-slate-700 transition hover:border-blue-600
              hover:text-blue-700 dark:border-slate-600
              dark:text-slate-200 dark:hover:border-blue-400
              dark:hover:text-blue-400"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center justify-center whitespace-nowrap
              rounded-full bg-gradient-to-r from-blue-600 to-indigo-600
              px-4 py-2.5 text-sm font-semibold text-white shadow-lg
              shadow-blue-500/20 transition hover:from-blue-700
              hover:to-indigo-700 lg:px-5"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex shrink-0 items-center gap-2 sm:hidden">

          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={handleThemeToggle}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex h-10 w-10 items-center justify-center
              rounded-lg border border-slate-200 text-slate-700
              transition hover:bg-slate-100 dark:border-slate-700
              dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center
              rounded-lg border border-slate-200 text-slate-700
              transition hover:bg-slate-100 dark:border-slate-700
              dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4
          pb-5 pt-3 shadow-lg dark:border-slate-700 dark:bg-slate-900
          sm:hidden">

          <nav>
            <ul className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`w-full rounded-lg px-4 py-3 text-left
                      text-sm transition ${
                        active === item.name
                          ? "bg-blue-50 font-semibold text-blue-700 dark:bg-slate-800 dark:text-blue-400"
                          : "text-slate-700 hover:bg-slate-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
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
              className="rounded-full border border-slate-200
                px-4 py-2.5 text-sm font-semibold text-slate-700
                transition hover:border-blue-600 hover:text-blue-700
                dark:border-slate-600 dark:text-slate-200
                dark:hover:border-blue-400 dark:hover:text-blue-400"
            >
              Login
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/register");
              }}
              className="rounded-full bg-gradient-to-r from-blue-600
                to-indigo-600 px-3 py-2.5 text-sm font-semibold
                text-white transition hover:from-blue-700
                hover:to-indigo-700"
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
