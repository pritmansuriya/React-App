import { useEffect, useState } from "react";

const STORAGE_KEY = "schoolClasses";

const sampleClasses = [
  {
    id: "class-10-a",
    grade: "Grade 10",
    section: "A",
    classTeacher: "Anita Rao",
    room: "A-204",
    capacity: 35,
    students: 32,
    academicYear: "2026-27",
    status: "Active",
  },
  {
    id: "class-9-a",
    grade: "Grade 9",
    section: "A",
    classTeacher: "Rohan Mehta",
    room: "A-105",
    capacity: 36,
    students: 34,
    academicYear: "2026-27",
    status: "Active",
  },
  {
    id: "class-8-b",
    grade: "Grade 8",
    section: "B",
    classTeacher: "Farah Khan",
    room: "B-202",
    capacity: 35,
    students: 29,
    academicYear: "2026-27",
    status: "Active",
  },
  {
    id: "class-7-a",
    grade: "Grade 7",
    section: "A",
    classTeacher: "Sanjay Iyer",
    room: "A-103",
    capacity: 34,
    students: 31,
    academicYear: "2026-27",
    status: "Active",
  },
  {
    id: "class-6-c",
    grade: "Grade 6",
    section: "C",
    classTeacher: "Meera Das",
    room: "C-106",
    capacity: 32,
    students: 27,
    academicYear: "2026-27",
    status: "Active",
  },
];

const readClasses = () => {
  if (typeof window === "undefined") return sampleClasses;

  const savedClasses = window.localStorage.getItem(STORAGE_KEY);
  if (!savedClasses) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleClasses));
    return sampleClasses;
  }

  try {
    const parsedClasses = JSON.parse(savedClasses);
    return Array.isArray(parsedClasses) ? parsedClasses : sampleClasses;
  } catch {
    return sampleClasses;
  }
};

export const useClasses = () => {
  const [classes, setClasses] = useState(readClasses);

  useEffect(() => {
    const syncClasses = (event) => {
      if (event.key === STORAGE_KEY) setClasses(readClasses());
    };

    window.addEventListener("storage", syncClasses);
    return () => window.removeEventListener("storage", syncClasses);
  }, []);

  const addClass = (classData) => {
    const newClass = {
      ...classData,
      id: globalThis.crypto?.randomUUID?.() ?? `class-${Date.now()}`,
      students: 0,
      status: "Active",
    };
    const updatedClasses = [newClass, ...readClasses()];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedClasses));
    setClasses(updatedClasses);
    return newClass;
  };

  return { classes, addClass };
};