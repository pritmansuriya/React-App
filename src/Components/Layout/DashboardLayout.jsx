import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { tr } from "framer-motion/client";


const DashboardLayout = () => {
      const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="h-screen flex   bg-[#F7F8FC]">
  {/* Sidebar */}
  <aside
    className={`
      ${collapsed ? "w-24" : "w-72"}
      h-screen
      bg-white
      border-r
      shrink-0
      relative  
      overflow-visible
      transition-all
      duration-300
      z-40
      hide-scrollbar
    `}
  >
    <Sidebar
      collapsed={collapsed}
      setCollapsed={setCollapsed}
    />
  </aside>

  {/* Main */}
  <main className="flex-1 hide-scrollbar h-screen overflow-y-auto">
    <div className="sticky top-0 z-20 bg-[#F7F8FC] border-b border-gray-200 px-6 py-4">
      <Header />
    </div>

    <div className="p-6">
      <Outlet />
    </div>
  </main>
</div>
  );
};

export default DashboardLayout;