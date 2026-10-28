import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { HiOutlineBars3 } from "react-icons/hi2";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-[#F3F6F9]">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden text-[#171A1F]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex shrink-0 items-center gap-3 border-b border-slate-200 bg-[#F3F6F9] px-3 py-3 sm:px-6 sm:py-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-[#084B83] transition hover:bg-blue-100 lg:hidden"
          >
            <HiOutlineBars3 size={26} />
          </button>

          {/* Header Content */}
          <div className="min-w-0 flex-1">
            <Header />
          </div>
        </header>

        {/* Page Content */}
        <div className="min-w-0 flex-1 p-3 sm:p-5 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
