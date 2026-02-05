import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <section className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h2 className="text-2xl text-center font-bold">Staff MS</h2>
      </div>
      <div className="px-4 space-y-2">
        {/* Dashboard */}
        <NavLink
          to="/admin_dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2 px-4 rounded hover:bg-teal-500`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        {/* Departments */}
        <NavLink
          to="/admin_dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2 px-4 rounded hover:bg-teal-500`
          }
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
        {/* Staff */}
        <NavLink
          to="/admin_dashboard/staffs"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2 px-4 rounded hover:bg-teal-500`
          }
        >
          <FaUsers />
          <span>Staff</span>
        </NavLink>
        {/* Leaves */}
        <NavLink
          to="/admin_dashboard"
          className="flex items-center space-x-4 py-2 px-4 rounded hover:bg-gray-500"
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        {/* Salary */}
        <NavLink
          to="/admin_dashboard/salary/add"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2 px-4 rounded hover:bg-teal-500`
          }
        >
          <FaMoneyBillAlt />
          <span>Salary</span>
        </NavLink>
        {/* Settings */}
        <NavLink
          to="/admin_dashboard"
          className="flex items-center space-x-4 py-2 px-4 rounded hover:bg-gray-500"
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </section>
  );
};

export default AdminSidebar;
