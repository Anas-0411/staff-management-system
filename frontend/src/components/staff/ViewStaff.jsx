import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ViewStaff = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/staff/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response)
        if (response.data.success) {
          setStaff(response.data.staff);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching staff");
      }
    };

    fetchStaffs();
  }, [id]);
  return (
    <>
      {staff ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-6 text-center">
            Staff Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={`http://localhost:3000/${staff?.userId.profileImage}`}
                alt="profile"
                className="rounded-full border w-72 h-72 object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{staff?.userId.name}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Staff ID:</p>
                <p className="font-medium">{staff?.staffId}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Date of Birth:</p>
                <p className="font-medium">
                  {new Date(staff?.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Gender:</p>
                <p className="font-medium">{staff?.gender}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{staff?.department?.dep_name}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Designation:</p>
                <p className="font-medium">{staff?.designation}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Marital Status:</p>
                <p className="font-medium">{staff?.maritalStatus}</p>
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

export default ViewStaff;
