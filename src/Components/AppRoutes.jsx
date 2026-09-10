import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllStudents from "../Pages/Students/AllStudents";
import AddStudent from "../Pages/Students/AddStudent";
import StudentProfile from "../Pages/Students/StudentProfile";
import AllTeachers from "../Pages/Teachers/AllTeacher";
import MainPage from "./MainPage";
import Register from "./Register";
import Contact from "./Contact";
import SignIn2 from "./SignIn2";
import Info from "./Info";
import Notfound from "./Notfound";
import AddTeachers from "../Pages/Teachers/AddTeacher";
import AllBooks from "../Pages/Library/AllBooks";
import AddBooks from "../Pages/Library/AddBooks";
import MyProfile from "../Pages/Account/MyProfile";
import Security from "../Pages/Account/Security";
import ClassDetail from "../Pages/Class/ClassDetail";
import AddClass from "../Pages/Class/AddClass";
import SubjectDetails from "../Pages/Subjects/SubjectDetails";
import AddSubject from "../Pages/Subjects/AddSubject";
import Timetable from "../Pages/Routine/Timetable";
import Lunch from "../Pages/Routine/Lunch";
import AttendanceDetails from "../Pages/Attendance/AttendanceDetails";
import AttendanceReport from "../Pages/Attendance/AttendanceReport";
import ExamTimetable from "../Pages/Exams/ExamTimetable";
import ExamGrade from "../Pages/Exams/ExamGrade";
import Notice1 from "../Pages/Notice/Notice1";
import Notice2 from "../Pages/Notice/Notice2";
import Details from "../Pages/Transport/Details";
import Add from "../Pages/Transport/Add";
import Rule from "../Pages/Hostel/Rule";
import Fees from "../Pages/Hostel/Fees";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignIn2 />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/info1" element={<Info />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<AllStudents />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="students/profile" element={<StudentProfile />} />

        {/* Teacher */}
        <Route path="teachers" element = {<AllTeachers />} />
        <Route path="teachers/add" element = {<AddTeachers />} />

        {/* Library */}
        <Route path = 'library' element = {<AllBooks />} />
        <Route path="library/add" element = {<AddBooks />} />

        {/* Account */}
        <Route path="account" element = {<MyProfile />} />
        <Route path = 'account/security' element = {<Security />} />

        {/* Class */}
        <Route path = 'class' element = {<ClassDetail />} />
        <Route path="class/add" element = {<AddClass />} />

        {/* Subject */}
        <Route path="subject" element = {<SubjectDetails />} />
        <Route path = "subject/add" element = {<AddSubject />} />

        {/* Routine */}
        <Route path="routine" element = {<Timetable />} />
        <Route path="routine/lunch" element = {<Lunch />} />
        
        {/* Attendance */}
        <Route path="atte" element = {<AttendanceDetails />} />
        <Route path="atte/report" element = {<AttendanceReport />} />

        {/* Exam */}
        <Route path="exam" element = {<ExamTimetable />} />
        <Route path="exam/grade" element= {<ExamGrade />} />

        {/* Notice */}
        <Route path="notice" element = {<Notice1 />} />
        <Route path="notice/2" element = {<Notice2 />} />

        {/* Transport */}
        <Route path="trans" element = {<Details />} />
        <Route path="trans/add" element = {<Add />} />

        {/* Hostel */}
        <Route path="hostel" element = {<Rule />} />
        <Route path="hostel/fee" element = {<Fees />} />
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default AppRoutes;