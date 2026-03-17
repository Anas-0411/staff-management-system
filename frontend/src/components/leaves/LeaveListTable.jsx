import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "./LeaveColumns";

const LeaveListTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/leave", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);

        if (response.data.success) {
          const leavesData = response.data.leaves.map((leave, index) => ({
            _id: leave._id,
            sno: index + 1,
            staffId: leave.staffId?.staffId || "N/A",
            name: leave.staffId?.userId?.name || "N/A",
            department: leave.staffId?.department?.dep_name || "N/A",
            leaveType: leave.leaveType,
            days:
              Math.ceil(
                (new Date(leave.endDate) - new Date(leave.startDate)) /
                  (1000 * 60 * 60 * 24),
              ) || 0,
            status: leave.status,
          }));
          setLeaves(leavesData);
          setFilteredLeaves(leavesData);
        }
      } catch (error) {
        console.error(
          error.response?.data?.message || "Error fetching leaves.",
        );
      }
    };
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = leaves.filter((leave) =>
      leave.staffId.toLowerCase().includes(query),
    );
    setFilteredLeaves(filtered);
  };
  const filterByButton = (status) => {
    const query = status.toLowerCase();
    const filtered = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(query),
    );
    setFilteredLeaves(filtered);
  };
  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-2xl text-teal-600 font-bold">Manage Leaves</h2>
          </div>

          <div className="flex justify-between items-center px-4 py-2">
            <input
              type="text"
              placeholder="Search By Employee ID..."
              className="border-2 border-teal-600 rounded px-4 py-2 outline-0 bg-white"
              onChange={filterByInput}
            />

            <div className="space-x-2">
              <button
                className="px-4 py-2 bg-yellow-600 text-white rounded font-bold cursor-pointer"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded font-bold cursor-pointer"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded font-bold cursor-pointer"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          <DataTable columns={columns} data={filteredLeaves} pagination />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default LeaveListTable;
