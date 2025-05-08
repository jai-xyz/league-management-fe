import React from 'react'
import Header from '../../components/admin/Header'
import Navbar from '../../components/admin/Navbar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="">
      <Header />

      <div className="">
        <Navbar />

        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
