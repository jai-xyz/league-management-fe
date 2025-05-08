import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav class="bg-gray-50 dark:bg-gray-700">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <Link to="/admin/dashboard" class="text-gray-900 dark:text-white hover:underline">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/teams" class="text-gray-900 dark:text-white hover:underline">Teams</Link>
                </li>
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">Team</a>
                </li>
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">Features</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
  )
}

export default Navbar
