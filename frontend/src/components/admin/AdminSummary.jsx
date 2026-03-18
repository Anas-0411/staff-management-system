import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import axios from "axios";
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
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        // console.log(response.data);
        setSummary(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <h3 className="text-2xl text-teal-600 font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          title="Total Staff"
          value={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          title="Total Departments"
          value={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillAlt />}
          title="Monthly Salary"
          value={summary.totalSalary}
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
            value={summary.leaveSummary.appliedFor}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            title="Leave Approved"
            value={summary.leaveSummary.approved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            title="Leave Pending"
            value={summary.leaveSummary.pending}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            title="Leave Rejected"
            value={summary.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
