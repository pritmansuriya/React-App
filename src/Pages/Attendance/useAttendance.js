import { useEffect, useState } from "react";

const STORAGE_KEY = "attendanceData";

const sampleAttendance = [
  { id: "attendance-1", name: "Evelyn Harper", studentId: "ST001", present: 18, absent: 2 },
  { id: "attendance-2", name: "Diana Plenty", studentId: "ST002", present: 20, absent: 0 },
  { id: "attendance-3", name: "John Millar", studentId: "ST003", present: 17, absent: 3 },
  { id: "attendance-4", name: "Maya Patel", studentId: "ST004", present: 15, absent: 5 },
  { id: "attendance-5", name: "Noor Ali", studentId: "ST005", present: 19, absent: 1 },
];

const readAttendance = () => {
  if (typeof window === "undefined") return sampleAttendance;

  const savedAttendance = window.localStorage.getItem(STORAGE_KEY);
  if (!savedAttendance) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleAttendance));
    return sampleAttendance;
  }

  try {
    const parsedAttendance = JSON.parse(savedAttendance);
    return Array.isArray(parsedAttendance) ? parsedAttendance : sampleAttendance;
  } catch {
    return sampleAttendance;
  }
};

export const useAttendance = () => {
  const [students, setStudents] = useState(readAttendance);

  useEffect(() => {
    const syncAttendance = (event) => {
      if (event.key === STORAGE_KEY) setStudents(readAttendance());
    };

    window.addEventListener("storage", syncAttendance);
    return () => window.removeEventListener("storage", syncAttendance);
  }, []);

  const addAttendance = (record) => {
    const updatedStudents = [...readAttendance(), record];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
  };

  return { students, addAttendance };
};