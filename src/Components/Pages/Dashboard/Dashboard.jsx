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
    <>
      <Welcome />

      <Stats1 />

      {/* Row 1 */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-6">
          <ClassRoutine />
        </div>

        <div className="col-span-3">
          <Library />
        </div>

        <div className="col-span-3">
          <CourseStatistics />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-12 gap-6 mt-6">

        <div className="col-span-6 flex flex-col gap-6">
          <StarStudent />
          <Notification />
        </div>

        <div className="col-span-6 grid grid-cols-2 gap-6">

          <TotalExam />

          <NewCourse />

          <div className="col-span-2">
            <BestPerfomer />
          </div>

        </div>
      {/* Row 3 */}
      </div>
       <div className="mt-8">
        <Summary />
      </div>

      {/* Row 4 */}
      <div className="mt-8">
        <div className="mb-8 ml-3">
        <h1 className="text-3xl font-bold text-left text-gray-800">Student Chart</h1>
      </div>

        <StudentChart />
      </div>

      {/* Row 5 */}
      <div className="mt-8">
        <div className="mb-8 ml-3">
        <h1 className="text-3xl font-bold text-left text-gray-800">Fees & Admission Chart</h1>
      </div>

        <Admission />
      </div>

        {/* Row 6 */}
       <div className="mt-8">
        <div className="mb-8 ml-3">
        <h1 className="text-3xl font-bold text-left text-gray-800">Subject Chart</h1>
      </div>
        <Subject />
      </div>

       {/* Row 7 */}
       <div className="mt-8">
        <div className="mb-8 ml-3">
        <h1 className="text-3xl font-bold text-left text-gray-800">Teacher & Library Chart</h1>
      </div>
        <TeacherChart />
      </div>

      {/* Row 8 */}
      <div className="mt-8">
        <div className="mb-8 ml-3">
        <h1 className="text-3xl font-bold text-left text-gray-800">Transport & Income-Expense Chart</h1>
      </div>
        <Transport />
      </div>

      {/* Row 9 */}
      <div className="mt-8">
        <div className="mb-8 ml-3">
        <h1 className="text-3xl font-bold text-left text-gray-800">Exam Result Chart</h1>
      </div>
        <ExamChart />
      </div>

      {/* Row 9 */}
      <div className="mt-8">
        <div className="mb-8 ml-3">
        <h1 className="text-3xl font-bold text-left text-gray-800">Top 10 Students & Growth</h1>
      </div>
        <Growth />
      </div>
    </>
  );
};

export default Dashboard;