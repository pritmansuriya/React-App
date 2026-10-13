import React from "react";

import Welcome from "./Welcome";
import Stats1 from "./Stats1";
import ClassRoutine from "./ClassRoutine";
import Library from "./Library";
import CourseStatistics from "./CourseStatistics";
import StarStudent from "./StarStudent";
import TotalExam from "./TotalExam";
import NewCourse from "./NewCourse";
import Notification from "./Notification";
import BestPerfomer from "./BestPerfomer";
import Summary from "./Summary";
import StudentChart from "./StudentChart";
import Admission from "./Admission";
import Subject from "./Subject";
import TeacherChart from "./TeacherChart";
import Transport from "./Transport";
import ExamChart from "./ExamChart";
import Growth from "./Growth";

const Dashboard = () => {
  return (
    <main className="w-full min-w-0 space-y-6 overflow-x-hidden p-3 sm:space-y-8 sm:p-5 lg:p-6 xl:p-8">
      {/* Welcome Section */}
      <section className="w-full min-w-0">
        <Welcome />
      </section>

      {/* Statistics Cards */}
      <section className="w-full min-w-0">
        <Stats1 />
      </section>

      {/* Row 1: Class Routine, Library, Course Statistics */}
      <section className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12 xl:gap-6">
        <div className="min-w-0 md:col-span-2 xl:col-span-6">
          <ClassRoutine />
        </div>

        <div className="min-w-0 xl:col-span-3">
          <Library />
        </div>

        <div className="min-w-0 xl:col-span-3">
          <CourseStatistics />
        </div>
      </section>

      {/* Row 2: Students, Notifications and Performance */}
      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        {/* Left Column */}
        <div className="flex min-w-0 flex-col gap-5 xl:gap-6">
          <StarStudent />
          <Notification />
        </div>

        {/* Right Column */}
        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:gap-6">
          <div className="min-w-0">
            <TotalExam />
          </div>

          <div className="min-w-0">
            <NewCourse />
          </div>

          <div className="min-w-0 sm:col-span-2">
            <BestPerfomer />
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="w-full min-w-0">
        <Summary />
      </section>

      {/* Student Chart */}
      <section className="w-full min-w-0">
        <SectionHeading>Student Chart</SectionHeading>
        <StudentChart />
      </section>

      {/* Fees & Admission Chart */}
      <section className="w-full min-w-0">
        <SectionHeading>Fees & Admission Chart</SectionHeading>
        <Admission />
      </section>

      {/* Subject Chart */}
      <section className="w-full min-w-0">
        <SectionHeading>Subject Chart</SectionHeading>
        <Subject />
      </section>

      {/* Teacher & Library Chart */}
      <section className="w-full min-w-0">
        <SectionHeading>Teacher & Library Chart</SectionHeading>
        <TeacherChart />
      </section>

      {/* Transport & Income-Expense Chart */}
      <section className="w-full min-w-0">
        <SectionHeading>
          Transport & Income-Expense Chart
        </SectionHeading>
        <Transport />
      </section>

      {/* Exam Result Chart */}
      <section className="w-full min-w-0">
        <SectionHeading>Exam Result Chart</SectionHeading>
        <ExamChart />
      </section>

      {/* Top Students & Growth */}
      <section className="w-full min-w-0">
        <SectionHeading>Top 10 Students & Growth</SectionHeading>
        <Growth />
      </section>
    </main>
  );
};

const SectionHeading = ({ children }) => {
  return (
    <h2 className="mb-4 text-xl font-bold leading-tight text-gray-800 sm:mb-6 sm:text-2xl lg:text-3xl">
      {children}
    </h2>
  );
};

export default Dashboard;
