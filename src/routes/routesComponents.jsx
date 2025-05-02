import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from  '../pages/auth/login'
import Dashboard from '../pages/admin/dashboard'
import Test from '../pages/home/Test'
import Register from '../pages/auth/register'
import NotFound from './notFound' 
import ProtectedRoutes from './protectedRoutes'

const RoutesComponents = () => {
  return (
    <Routes>
          {/* // if url is not found, redirect to 404 page */}
        <Route path="*" element={<NotFound/>}/>

        <Route path="/" element={<Test/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />


        <Route element={<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        
        
    </Routes>
  )
}

export default RoutesComponents
