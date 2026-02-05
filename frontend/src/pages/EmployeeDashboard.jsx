import React from "react";
import StaffSidebar from "../components/employeeDashboard/StaffSidebar";
import Navbar from "../components/admin/Navbar";
import { Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <StaffSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet/>
      </div>
    </div>
    )
};

export default EmployeeDashboard;
