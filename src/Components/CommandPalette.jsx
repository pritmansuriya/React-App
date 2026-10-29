import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaTimes,
  FaKeyboard,
  FaLevelDownAlt,
} from "react-icons/fa";
import "./CommandPalette.css";

const commands = [
  { title: "Home", category: "Main", path: "/" },
  { title: "Sign In", category: "Main", path: "/signin" },
  { title: "Register", category: "Main", path: "/register" },

  { title: "Dashboard", category: "Dashboard", path: "/dashboard" },

  // Students
  { title: "All Students", category: "Students", path: "/dashboard/students" },
  {
    title: "Add Student",
    category: "Students",
    path: "/dashboard/students/add",
  },

  // Teachers
  { title: "All Teachers", category: "Teachers", path: "/dashboard/teachers" },
  {
    title: "Apply Leave",
    category: "Teachers",
    path: "/dashboard/teachers/leave",
  },

  // Library
  { title: "All Books", category: "Library", path: "/dashboard/library" },
  { title: "Add Book", category: "Library", path: "/dashboard/library/add" },

  // Account
  { title: "My Profile", category: "Account", path: "/dashboard/account" },
  {
    title: "Security Settings",
    category: "Account",
    path: "/dashboard/account/security",
  },

  // Class
  { title: "Class Details", category: "Class", path: "/dashboard/class" },
  { title: "Add Class", category: "Class", path: "/dashboard/class/add" },

  // Subjects
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

  // Routine
  { title: "Timetable", category: "Routine", path: "/dashboard/routine" },
  {
    title: "Lunch Schedule",
    category: "Routine",
    path: "/dashboard/routine/lunch",
  },

  // Attendance
  { title: "Attendance", category: "Attendance", path: "/dashboard/atte" },
  {
    title: "Attendance Report",
    category: "Attendance",
    path: "/dashboard/atte/report",
  },

  // Exams
  { title: "Exam Timetable", category: "Exams", path: "/dashboard/exam" },
  { title: "Exam Grades", category: "Exams", path: "/dashboard/exam/grade" },

  // Notices
  { title: "Notices", category: "Notice", path: "/dashboard/notice" },
  { title: "Notice Details", category: "Notice", path: "/dashboard/notice/2" },

  // Transport
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

  // Hostel
  { title: "Hostel Rules", category: "Hostel", path: "/dashboard/hostel" },
  { title: "Hostel Fees", category: "Hostel", path: "/dashboard/hostel/fee" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Filter commands based on the search text
  const filteredCommands = commands.filter((command) =>
    `${command.title} ${command.category} ${command.path}`
      .toLowerCase()
      .includes(search.toLowerCase().trim()),
  );

  // Open with Ctrl+K or Cmd+K; close with Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((previous) => !previous);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Focus the search input whenever the palette opens
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Reset selection whenever the search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Keep the selected index within the available results
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [selectedIndex, filteredCommands.length]);

  // Navigate to the selected page
  const executeCommand = (command) => {
    if (!command) return;

    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
    navigate(command.path);
  };

  // Keyboard navigation inside the search input
  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedIndex((index) =>
        filteredCommands.length ? (index + 1) % filteredCommands.length : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex((index) =>
        filteredCommands.length
          ? (index - 1 + filteredCommands.length) % filteredCommands.length
          : 0,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
    }
  };

  return (
    <>
      {/* Command Palette Modal */}
      {isOpen && (
        <div
          className="command-palette-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section
            className="command-palette-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Search pages and commands"
          >
            {/* Search Input */}
            <div className="command-palette-search">
              <span className="command-search-icon">
                <FaSearch />
              </span>

              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search students, teachers, exams..."
                aria-label="Search pages"
              />

              <button
                type="button"
                className="command-escape"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Results Heading */}
            <div className="command-palette-heading">QUICK NAVIGATION</div>

            {/* Search Results */}
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

            {/* Keyboard Shortcuts */}
            <footer className="command-palette-footer">
              <span>
                <FaArrowUp /> <FaArrowDown /> Navigate
              </span>
              <span>
                <FaLevelDownAlt /> Open page
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
