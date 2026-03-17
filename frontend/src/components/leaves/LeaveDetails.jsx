import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leave/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        console.log(response);
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching leave.");
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response);
      if (response.data.success) {
        navigate("/admin_dashboard/leaves");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching leave.");
    }
  };
  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-6 text-center">
            Leave Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={`http://localhost:3000/${leave.staffId?.userId?.profileImage}`}
                alt="profile"
                className="rounded-full border w-72 h-72 object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{leave.staffId?.userId.name}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Staff ID:</p>
                <p className="font-medium">{leave.staffId?.staffId}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Leave type:</p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium">{leave.reason}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">
                  {leave.staffId?.department?.dep_name}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded font-bold cursor-pointer"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded font-bold cursor-pointer"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      )}
    </>
  );
};

export default LeaveDetails;
