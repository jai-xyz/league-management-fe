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
        className={`z-98 mt-18 ${
          isSidebarOpen ? "w-16" : "w-60"
        } transition-all duration-300`}
      >
        <div className="scroll-sidebar">
          <div className="px-2 mt-8">
            <nav className="w-full flex flex-col sidebar-nav">
              <ul id="sidebarnav" className="text-sm">
                {/* <li className="text-xs font-bold pb-4">
                  <span className="text-neutral">HOME</span>
                </li> */}

                <li id="sidebar-item">
                  <Link
                    to="/admin/dashboard"
                    className={`sidebar-link p-3 rounded-md w-full flex items-center ${
                      location.pathname === "/admin/dashboard"
                        ? "text-white bg-primary" // Active link styles
                        : "text-gray-500 hover:bg-gray-200" // Default styles
                    }`}
                  >
                    {/* <svg
                      className={`w-5 h-5 transition duration-75 ${
                        location.pathname === "/admin/dashboard"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    > */}
                    <Dashboard
                      className={`w-5 h-5 transition duration-75 ${
                        location.pathname === "/admin/dashboard"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`ms-2 font-semibold 
                      ${
                        isSidebarOpen
                          ? "opacity-0 max-w-0 overflow-hidden transition-all duration-500 ease-in-out"
                          : "opacity-100 max-w-xs transition-all duration-500 ease-in-out"
                      }
                    `}
                    >
                      Dashboard
                    </span>
                  </Link>
                </li>

                <hr className="border-t border-gray-200 mx-2 my-2" />
                {/* <li className="text-xs font-bold my-4">
                  <span className="text-neutral">MANAGE</span>
                </li> */}

                <li id="sidebar-item" className="mb-2">
                  <Link
                    to="/admin/division"
                    className={`sidebar-link p-3 rounded-md w-full flex items-center ${
                      location.pathname === "/admin/division"
                        ? "text-white bg-primary" // Active link styles
                        : "text-gray-500 hover:bg-gray-200" // Default styles
                    }`}
                  >
                    <Workspaces
                      className={`w-5 h-5 transition duration-75 ${
                        location.pathname === "/admin/division"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`ms-2 font-semibold 
                      ${
                        isSidebarOpen
                          ? "opacity-0 max-w-0 overflow-hidden transition-all duration-500 ease-in-out"
                          : "opacity-100 max-w-xs transition-all duration-500 ease-in-out"
                      }
                    `}
                    >
                      Divison
                    </span>
                  </Link>
                </li>

                <li id="sidebar-item">
                  <Link
                    to="/admin/teams"
                    className={`sidebar-link p-3 rounded-md w-full flex items-center ${
                      location.pathname === "/admin/teams"
                        ? "text-white bg-primary" // Active link styles
                        : "text-gray-500 hover:bg-gray-200" // Default styles
                    }`}
                  >
                    <Groups
                      className={`w-5 h-5 transition duration-75 ${
                        location.pathname === "/admin/teams"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`ms-2 font-semibold transition-all duration-500 ease-in-out
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
      {/* Sidebar */}
      {/* <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/division"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Division</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/teams"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Teams</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside> */}
    </>
  );
};

export default Sidebar;
