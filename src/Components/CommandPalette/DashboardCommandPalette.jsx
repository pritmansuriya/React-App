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

const dashboardCommands = [
  { title: "Dashboard", category: "Dashboard", path: "/dashboard" },

  {
    title: "Add Student",
    category: "Students",
    path: "/dashboard/students/add",
  },
  {
    title: "Student Certificate",
    category: "Students",
    path: "/dashboard/students/certificate",
  },

  { title: "All Teachers", category: "Teachers", path: "/dashboard/teachers" },
  {
    title: "Apply Leave",
    category: "Teachers",
    path: "/dashboard/teachers/leave",
  },

  { title: "All Books", category: "Library", path: "/dashboard/library" },
  { title: "Add Book", category: "Library", path: "/dashboard/library/add" },

  { title: "My Profile", category: "Account", path: "/dashboard/account" },
  {
    title: "Security Settings",
    category: "Account",
    path: "/dashboard/account/security",
  },

  { title: "Class Details", category: "Class", path: "/dashboard/class" },
  { title: "Add Class", category: "Class", path: "/dashboard/class/add" },

  {
    title: "Subject Details",
    category: "Subjects",
    path: "/dashboard/subject",
  },
  {
    title: "Subject Allocation",
    category: "Subjects",
    path: "/dashboard/subject/allocate",
  },

  { title: "Timetable", category: "Routine", path: "/dashboard/routine" },
  {
    title: "Lunch Schedule",
    category: "Routine",
    path: "/dashboard/routine/lunch",
  },

  { title: "Attendance", category: "Attendance", path: "/dashboard/atte" },
  {
    title: "Attendance Report",
    category: "Attendance",
    path: "/dashboard/atte/report",
  },

  { title: "Exam Timetable", category: "Exams", path: "/dashboard/exam" },
  { title: "Exam Grades", category: "Exams", path: "/dashboard/exam/grade" },

  { title: "Notices", category: "Notice", path: "/dashboard/notice" },
  { title: "Notice Details", category: "Notice", path: "/dashboard/notice/2" },

  {
    title: "Transport Details",
    category: "Transport",
    path: "/dashboard/trans",
  },
  {
    title: "Add Transport",
    category: "Transport",
    path: "/dashboard/trans/add",
  },

  { title: "Hostel Rules", category: "Hostel", path: "/dashboard/hostel" },
  { title: "Hostel Fees", category: "Hostel", path: "/dashboard/hostel/fee" },
];

export default function DashboardCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Filter commands
  const filteredCommands = dashboardCommands.filter((command) =>
    `${command.title} ${command.category} ${command.path}`
      .toLowerCase()
      .includes(search.toLowerCase().trim()),
  );

  // Close palette and reset
  const closePalette = () => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
  };

  // Open selected section on FIRST click
  const executeCommand = (command) => {
    if (!command) return;

    const selectedPath = command.path;

    // Close palette
    closePalette();

    // Navigate immediately
    navigate(selectedPath);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl + K or Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((previous) => !previous);
        return;
      }

      if (!isOpen) return;

      // Escape
      if (event.key === "Escape") {
        event.preventDefault();
        closePalette();
        return;
      }

      // Arrow Down
      if (event.key === "ArrowDown") {
        event.preventDefault();

        setSelectedIndex((index) =>
          filteredCommands.length ? (index + 1) % filteredCommands.length : 0,
        );
      }

      // Arrow Up
      if (event.key === "ArrowUp") {
        event.preventDefault();

        setSelectedIndex((index) =>
          filteredCommands.length
            ? (index - 1 + filteredCommands.length) % filteredCommands.length
            : 0,
        );
      }

      // Enter
      if (event.key === "Enter") {
        event.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, filteredCommands, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Reset selection when searching
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Search Trigger */}
      <button
        type="button"
        className="command-palette-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open dashboard command palette"
        aria-expanded={isOpen}
      >
        <FaSearch />
        <span>Search dashboard...</span>
        <kbd>Ctrl K</kbd>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="command-palette-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePalette();
            }
          }}
        >
          <section
            className="command-palette-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard navigation"
          >
            {/* Search */}
            <div className="command-palette-search">
              <span className="command-search-icon">
                <FaSearch />
              </span>

              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students, teachers, exams..."
                aria-label="Search dashboard pages"
              />

              <button
                type="button"
                className="command-escape"
                onClick={closePalette}
                aria-label="Close command palette"
              >
                <FaTimes />
              </button>
            </div>

            {/* Heading */}
            <div className="command-palette-heading">DASHBOARD NAVIGATION</div>

            {/* Results */}
            <div className="command-palette-results">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => (
                  <button
                    type="button"
                    key={command.path}
                    className={`command-palette-item ${
                      selectedIndex === index ? "active" : ""
                    }`}
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

            {/* Footer */}
            <footer className="command-palette-footer">
              <span>
                <FaArrowUp /> <FaArrowDown /> Navigate
              </span>

              <span>
                <FaLevelDownAlt /> Open
              </span>

              <span>
                <FaTimes /> Close
              </span>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
