import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/dashboard";
import Test from "../pages/home/test";
import Register from "../pages/auth/register";
import NotFound from "./NotFound";
import ProtectedRoutes from "./protectedRoutes";
import AdminLayout from "../layout/admin/AdminLayout";
import Teams from "../pages/admin/teams/teams";

const RoutesComponents = () => {
  return (
    <Routes>
      {/* // if url is not found, redirect to 404 page */}
      <Route path="*" element={<NotFound />} />

      <Route path="/" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teams" element={<Teams />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesComponents;
