import { useEffect, useState } from "react";

const STORAGE_KEY = "schoolTeachers";

const sampleTeachers = [
  {
    id: "teacher-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@school.edu",
    phone: "+91 98765 43210",
    subject: "Mathematics",
    qualification: "M.Sc. Mathematics",
    joiningDate: "2021-06-14",
    status: "Active",
  },
  {
    id: "teacher-2",
    name: "Nisha Verma",
    email: "nisha.verma@school.edu",
    phone: "+91 98765 43211",
    subject: "Science",
    qualification: "M.Sc. Physics",
    joiningDate: "2020-08-03",
    status: "Active",
  },
  {
    id: "teacher-3",
    name: "Kabir Khan",
    email: "kabir.khan@school.edu",
    phone: "+91 98765 43212",
    subject: "English",
    qualification: "M.A. English",
    joiningDate: "2019-04-22",
    status: "Active",
  },
  {
    id: "teacher-4",
    name: "Meera Iyer",
    email: "meera.iyer@school.edu",
    phone: "+91 98765 43213",
    subject: "Computer Science",
    qualification: "M.C.A.",
    joiningDate: "2022-01-10",
    status: "Active",
  },
  {
    id: "teacher-5",
    name: "Dev Patel",
    email: "dev.patel@school.edu",
    phone: "+91 98765 43214",
    subject: "History",
    qualification: "M.A. History",
    joiningDate: "2018-07-16",
    status: "On leave",
  },
  {
    id: "teacher-6",
    name: "Ananya Das",
    email: "ananya.das@school.edu",
    phone: "+91 98765 43215",
    subject: "Biology",
    qualification: "M.Sc. Biology",
    joiningDate: "2023-02-06",
    status: "Active",
  },
];

const readTeachers = () => {
  if (typeof window === "undefined") return sampleTeachers;

  const savedTeachers = window.localStorage.getItem(STORAGE_KEY);
  if (!savedTeachers) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTeachers));
    return sampleTeachers;
  }

  try {
    const parsedTeachers = JSON.parse(savedTeachers);
    return Array.isArray(parsedTeachers) ? parsedTeachers : sampleTeachers;
  } catch {
    return sampleTeachers;
  }
};

export const useTeachers = () => {
  const [teachers, setTeachers] = useState(readTeachers);

  useEffect(() => {
    const syncTeachers = (event) => {
      if (event.key === STORAGE_KEY) setTeachers(readTeachers());
    };

    window.addEventListener("storage", syncTeachers);
    return () => window.removeEventListener("storage", syncTeachers);
  }, []);

  const addTeacher = (teacherData) => {
    const teacher = {
      ...teacherData,
      id: globalThis.crypto?.randomUUID?.() ?? `teacher-${Date.now()}`,
      status: "Active",
    };
    const updatedTeachers = [teacher, ...readTeachers()];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTeachers));
    setTeachers(updatedTeachers);
    return teacher;
  };

  return { teachers, addTeacher };
};