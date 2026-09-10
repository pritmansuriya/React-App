// src/hooks/useStudents.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'allStudentsData';

export const useStudents = () => {
  const [students, setStudents] = useState([]);

  // Load students from localStorage
  const loadStudents = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  // Save students to localStorage
  const saveStudents = (newStudents) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStudents));
    setStudents(newStudents);
    // Trigger storage event for other tabs/windows
    localStorage.setItem('_trigger', Date.now());
  };

  // Add student with all fields
  const addStudent = (studentData) => {
    const { name, class: className, rollNo, mobileNo, birthDate } = studentData;
    
    // Validation
    if (!name?.trim()) {
      alert('Please enter student name!');
      return false;
    }
    if (!className?.trim()) {
      alert('Please enter class!');
      return false;
    }
    if (!rollNo?.trim()) {
      alert('Please enter roll number!');
      return false;
    }
    if (!mobileNo?.trim() || mobileNo.length < 10) {
      alert('Please enter valid 10-digit mobile number!');
      return false;
    }
    if (!birthDate) {
      alert('Please select birth date!');
      return false;
    }

    const currentStudents = loadStudents();
    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      class: className.trim(),
      rollNo: rollNo.trim(),
      mobileNo: mobileNo.trim(),
      birthDate: birthDate
    };
    
    const updatedStudents = [...currentStudents, newStudent];
    saveStudents(updatedStudents);
    return true;
  };

  // Delete student
  const deleteStudent = (id) => {
    const currentStudents = loadStudents();
    const updatedStudents = currentStudents.filter(student => student.id !== id);
    saveStudents(updatedStudents);
    return true;
  };

  // Update student
  const updateStudent = (id, updatedData) => {
    const currentStudents = loadStudents();
    const index = currentStudents.findIndex(student => student.id === id);
    if (index !== -1) {
      currentStudents[index] = { ...currentStudents[index], ...updatedData };
      saveStudents(currentStudents);
      return true;
    }
    return false;
  };

  // Initial load and sync
  useEffect(() => {
    setStudents(loadStudents());

    // Listen for changes from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY || e.key === '_trigger') {
        setStudents(loadStudents());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Polling for changes (for same tab updates)
    const interval = setInterval(() => {
      const currentData = loadStudents();
      setStudents(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(currentData)) {
          return currentData;
        }
        return prev;
      });
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return { students, addStudent, deleteStudent, updateStudent };
};