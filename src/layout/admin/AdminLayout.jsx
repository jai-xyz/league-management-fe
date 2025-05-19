import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header at the top */}
      <Header
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        className="shadow-lg"
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform ${
            isSidebarOpen ? "w-16" : "w-60"
          } transition-all duration-300 `}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Overlay for Sidebar on small screens */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col  bg-secondary transition-all duration-300 ${
            isSidebarOpen ? "ml-16" : "ml-60"
          }`}
        >
          <div className="flex-1 flex justify-center items-center">
            <main className="w-full max-w-4xl p-4">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
