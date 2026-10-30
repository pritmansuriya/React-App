import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaTimes,
  FaLevelDownAlt,
} from "react-icons/fa";
import "./CommandPalette.css";

const publicCommands = [
  { title: "Home", category: "Main", path: "/", section: null },
  { title: "Features", category: "Website", path: "/#feature2", section: "feature2" },
  { title: "Testimonials", category: "Website", path: "/#test", section: "test" },
  { title: "Pricing", category: "Website", path: "/#price", section: "price" },
  { title: "News & Events", category: "Website", path: "/#news-events", section: "news-events" },
  { title: "About", category: "Website", path: "/#about", section: "about" },
  { title: "Sign In", category: "Account", path: "/signin" },
  { title: "Register", category: "Account", path: "/register" },
];

export default function PublicCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filteredCommands = publicCommands.filter((command) =>
    `${command.title} ${command.category} ${command.path}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((previous) => !previous);
      }

      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [selectedIndex, filteredCommands.length]);

  const executeCommand = (command) => {
    if (!command) return;

    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);

    if (command.section) {
      const scrollToSection = () => {
        document.getElementById(command.section)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };

      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(scrollToSection, 400);
      } else {
        scrollToSection();
      }
    } else {
      navigate(command.path);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((index) =>
        filteredCommands.length
          ? (index + 1) % filteredCommands.length
          : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((index) =>
        filteredCommands.length
          ? (index - 1 + filteredCommands.length) % filteredCommands.length
          : 0
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="command-palette-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            className="command-palette-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Public website navigation"
          >
            <div className="command-palette-search">
              <span className="command-search-icon"><FaSearch /></span>

              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search features, pricing, about..."
                aria-label="Search website pages"
              />

              <button
                type="button"
                className="command-escape"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="command-palette-heading">
              WEBSITE NAVIGATION
            </div>

            <div className="command-palette-results">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => (
                  <button
                    type="button"
                    key={command.path}
                    className={`command-palette-item ${
                      selectedIndex === index ? "active" : ""
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => executeCommand(command)}
                  >
                    <span className="command-item-symbol">
                      <FaArrowRight />
                    </span>

                    <span className="command-item-info">
                      <span className="command-item-title">
                        {command.title}
                      </span>
                      <span className="command-item-category">
                        {command.category}
                      </span>
                    </span>

                    {selectedIndex === index && (
                      <span className="command-enter-hint">
                        <FaLevelDownAlt /> Enter
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div className="command-palette-empty">
                  <span>⌕</span>
                  <p>No matching pages found</p>
                  <small>Try another keyword.</small>
                </div>
              )}
            </div>

            <footer className="command-palette-footer">
              <span><FaArrowUp /> <FaArrowDown /> Navigate</span>
              <span><FaLevelDownAlt /> Open</span>
              <span><FaTimes /> Close</span>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}