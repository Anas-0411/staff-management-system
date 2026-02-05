import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns } from "./departmentColumns.jsx";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");

  const onDepartmentDelete = (DepId) => {
    setDepartments((prev) => prev.filter((dep) => dep._id !== DepId));
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department/list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const depData = response.data.departments.map((dep, index) => ({
            _id: dep._id,
            sno: index + 1,
            dep_name: dep.dep_name,
            description: dep.description,
            onDepartmentDelete,
          }));

          setDepartments(depData);
        }
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching departments");
      }
    };

    fetchDepartments();
  }, []);

  // ✅ DERIVED DATA (no effect, no state)
  const filteredDepartments = useMemo(() => {
    if (!search.trim()) return departments;

    const value = search.toLowerCase();
    return departments.filter((dep) =>
      dep.dep_name?.toLowerCase().includes(value)
    );
  }, [search, departments]);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl text-teal-600 font-bold">Manage Departments</h2>
      </div>

      <div className="flex justify-between items-center px-4 py-2">
        <input
          type="text"
          placeholder="Search Departments..."
          className="border-2 border-teal-600 rounded px-4 py-2 outline-0 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link
          to="/admin_dashboard/departments/add"
          className="px-4 py-2 bg-teal-600 text-white rounded font-bold"
        >
          Add Department
        </Link>
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          data={filteredDepartments}
          keyField="_id"
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default DepartmentList;
