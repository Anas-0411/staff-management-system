import React from "react";
import { useNavigate } from "react-router-dom";

const StaffButtons = ({ StaffId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate(`/admin_dashboard/staffs/${StaffId}`)}
        className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
      >
        View
      </button>

      <button
        onClick={() => navigate(`/admin_dashboard/staffs/edit/${StaffId}`)}
        className="px-3 py-1 text-sm font-semibold text-white bg-teal-600 rounded hover:bg-teal-700 transition duration-200 cursor-pointer"
      >
        Edit
      </button>

      <button
        onClick={() => navigate(`/admin_dashboard/staff/salary/${StaffId}`)}
        className="px-3 py-1 text-sm font-semibold text-white bg-yellow-600 rounded hover:bg-yellow-700 transition duration-200 cursor-pointer"
      >
        Salary
      </button>

      <button className="px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700 transition duration-200 cursor-pointer">
        Leaves
      </button>
      <button className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition duration-200 cursor-pointer">
        Delete
      </button>
    </div>
  );
};

export default StaffButtons;
