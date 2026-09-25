import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Dashboard/Navbar";
import Sidebar from "../pages/Dashboard/Sidebar";

const DashBoardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#fcfbf9] lg:flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}
      <div className="min-w-0 flex-1">
        <Navbar onMenu={() => setSidebarOpen(true)} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashBoardLayout;
