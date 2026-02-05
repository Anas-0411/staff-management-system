import React from "react";
import { FaUser } from "react-icons/fa";
import useAuth from "../../context/useAuth";

const EmployeeSummary = () => {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <div className="rounded flex bg-white shadow">
        <div className="text-3xl flex justify-center items-center bg-teal-600 text-white px-4">
          <FaUser />
        </div>
        <div className="pl-4 py-1">
          <p className="text-lg font-bold">Welcome Back</p>
          <p className="text-xl font-bold">{user.name}</p>
          </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;
