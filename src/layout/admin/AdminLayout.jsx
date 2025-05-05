import React from 'react'
import Header from '../../components/admin/Header'
import Navbar from '../../components/admin/Navbar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1">
        <Navbar />

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
