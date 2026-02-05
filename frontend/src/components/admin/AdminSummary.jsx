import React from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillAlt,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl text-teal-600 font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          title="Total Staff"
          value="150"
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          title="Total Departments"
          value="15"
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillAlt />}
          title="Monthly Salary"
          value="$150"
          color="bg-red-600"
        />
      </div>
      <div className="mt-12">
        <h3 className="text-2xl text-center text-teal-600 font-bold">
          Leaves Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            title="Leave Applied"
            value="50"
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            title="Leave Approved"
            value="15"
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            title="Leave Pending"
            value="30"
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            title="Leave Rejected"
            value="5"
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
