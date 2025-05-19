import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuOpen } from "@mui/icons-material";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <>
      <div className="flex fixed top-0 left-0 right-0 z-99 bg-primary shadow-xs">
        <div className="flex items-center justify-center">
          <button
            onClick={toggleSidebar}
            type="button"
            className="flex items-center justify-center ms-3 w-10 h-10 text-sm text-white bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary hover:bg-dark-primary"
          >
            {isSidebarOpen ? <Menu /> : <MenuOpen />}
          </button>
        </div>

        <nav className="z-99">
          <div className="flex flex-wrap justify-between items-center max-w-screen-xl py-4 pl-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ">
                LMS
              </span>
            </Link>{" "}
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              {/* <a href="tel:5541251234" class="text-sm  text-gray-500 dark:text-white hover:underline">(555) 412-1234</a>
            <a href="#" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
