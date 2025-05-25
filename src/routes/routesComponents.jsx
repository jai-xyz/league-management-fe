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
import AddTeams from "../pages/admin/teams/AddTeams";
import EditTeams from "../pages/admin/teams/EditTeams";
import Division from "../pages/admin/division/Division";
import AddDivision from "../pages/admin/division/AddDivision";
import EditDivision from "../pages/admin/division/Editdivision";

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
          <Route path="division" element={<Division />} />
          <Route path="division/add" element={<AddDivision />} />
          <Route path="division/edit/:id" element={<EditDivision />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/add/:divisionId" element={<AddTeams />} />
          <Route path="teams/edit/:id" element={<EditTeams />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesComponents;
