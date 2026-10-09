import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { tr } from "framer-motion/client";


const DashboardLayout = () => {
      const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="h-screen flex bg-[#F3F6F9]">
  {/* Sidebar */}
  <aside
    className={`
      ${collapsed ? "w-24" : "w-72"}
      h-screen
      bg-[#084B83]
      border-r border-[#0A4271]
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
  <main className="flex-1 hide-scrollbar h-screen overflow-y-auto text-[#171A1F]">
    <div className="sticky top-0 z-20 bg-[#F3F6F9] border-b border-slate-200 px-6 py-4">
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