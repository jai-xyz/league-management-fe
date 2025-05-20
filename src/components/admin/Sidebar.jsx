import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dashboard, Groups, Workspaces } from "@mui/icons-material";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  return (
    <>
      {/* Sidebar Toggle Button */}
      <aside
        id="main-sidebar"
        className={`z-98 mt-18 ${isSidebarOpen ? "w-16" : "w-60"} `}
      >
        <div className="scroll-sidebar">
          <div className="px-2 mt-8">
            <nav className="w-full flex flex-col sidebar-nav">
              <ul id="sidebarnav" className="text-sm">
                <li id="sidebar-item">
                  <Link
                    to="/admin/dashboard"
                    className={`sidebar-link p-3 rounded-md w-full flex items-center ${
                      location.pathname === "/admin/dashboard"
                        ? "text-white bg-primary"
                        : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <Dashboard
                      className={`w-5 h-5 ${
                        location.pathname === "/admin/dashboard"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`ms-2 font-semibold uppercase
                      ${
                        isSidebarOpen
                          ? "opacity-0 max-w-0"
                          : "opacity-100 max-w-xs"
                      }
                    `}
                    >
                      Dashboard
                    </span>
                  </Link>
                </li>

                <hr className="border-t border-gray-200 mx-2 my-2" />

                <li id="sidebar-item" className="mb-2">
                  <Link
                    to="/admin/division"
                    className={`sidebar-link p-3 rounded-md w-full flex items-center ${
                      location.pathname === "/admin/division"
                        ? "text-white bg-primary"
                        : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <Workspaces
                      className={`w-5 h-5  ${
                        location.pathname === "/admin/division"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`ms-2 font-semibold uppercase
                      ${
                        isSidebarOpen
                          ? "opacity-0 max-w-0"
                          : "opacity-100 max-w-xs "
                      }
                    `}
                    >
                      Divison
                    </span>
                  </Link>
                </li>

                <hr className="border-t border-gray-200 mx-2 my-2" />

                <li id="sidebar-item">
                  <Link
                    to="/admin/teams"
                    className={`sidebar-link p-3 rounded-md w-full flex items-center ${
                      location.pathname === "/admin/teams"
                        ? "text-white bg-primary"
                        : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <Groups
                      className={`w-5 h-5  ${
                        location.pathname === "/admin/teams"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`ms-2 font-semibold uppercase
                      ${
                        isSidebarOpen
                          ? "opacity-0 max-w-0 overflow-hidden"
                          : "opacity-100 max-w-xs"
                      }
                    `}
                    >
                      Teams
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
