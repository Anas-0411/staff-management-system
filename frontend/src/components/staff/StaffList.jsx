import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns } from "./StaffColumns";

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState("");

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/staff/list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response.data);

        if (response.data.success) {
          const staffData = response.data.staffs.map((staff, index) => ({
            _id: staff._id,
            sno: index + 1,
            dep_name: staff.department?.dep_name,
            name: staff.userId.name,
            dob: new Date(staff.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={30}
                height={30}
                alt="profile"
                className="rounded-full"
                src={`http://localhost:3000/${staff.userId.profileImage}`}
              />
            ),
          }));

          setStaffs(staffData);
          setFilteredStaffs(staffData);
        }
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching staffs.");
      }
    };

    fetchStaffs();
  }, []);

  const handleFiltered = (e) => {
    const records = staffs.filter(
      (staff) =>
        staff.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        staff.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredStaffs(records);
  };
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl text-teal-600 font-bold">Manage Staff</h2>
      </div>

      <div className="flex justify-between items-center px-4 py-2">
        <input
          type="text"
          placeholder="Search Staff..."
          className="border-2 border-teal-600 rounded px-4 py-2 outline-0 bg-white"
          onChange={handleFiltered}
        />

        <Link
          to="/admin_dashboard/staffs/add"
          className="px-4 py-2 bg-teal-600 text-white rounded font-bold"
        >
          Add Staff
        </Link>
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          data={filteredStaffs}
          keyField="_id"
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default StaffList;
