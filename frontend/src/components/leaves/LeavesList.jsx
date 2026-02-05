import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import axios from "axios";

const LeavesList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leave/list/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          setLeaves(response.data.leaves);
          setFilteredLeaves(response.data.leaves);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      }
    };
    fetchLeaves();
  }, [user._id]);

  const filterLeaves = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = leaves.filter((leave) =>
      leave.leaveType.toLowerCase().includes(query),
    );
    setFilteredLeaves(filtered);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h2 className="text-2xl text-teal-600 font-bold">Manage Leaves</h2>
      </div>

      <div className="flex justify-between items-center px-4 py-2">
        <input
          type="text"
          placeholder="Search Leaves..."
          className="border-2 border-teal-600 rounded px-4 py-2 outline-0 bg-white"
          onChange={filterLeaves}
        />

        <Link
          to="/employee_dashboard/leaves/add"
          className="px-4 py-2 bg-teal-600 text-white rounded font-bold"
        >
          Add Leave
        </Link>
      </div>
      {filteredLeaves.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500 mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, index) => (
              <tr key={leave._id} className="bg-white border-b border-gray-200">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-5 text-gray-500">No leave records found</p>
      )}
    </div>
  );
};

export default LeavesList;
