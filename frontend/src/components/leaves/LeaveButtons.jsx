import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveButtons = ({ LeaveId }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/admin_dashboard/leaves/${LeaveId}`)}
      className="px-3 py-1 text-sm font-semibold text-white bg-teal-600 rounded hover:bg-teal-700 transition duration-200 cursor-pointer"
    >
      View
    </button>
  );
};

export default LeaveButtons;
