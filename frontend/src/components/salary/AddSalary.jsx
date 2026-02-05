import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, fetchStaffs } from "../staff/StaffHelper";

const AddSalary = () => {
  const [salary, setSalary] = useState({
    staffId: null,
    basicSalary: 0,
    allowance: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const depData = await fetchDepartments();
      setDepartments(depData);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartment = async (e) => {
    const staff = await fetchStaffs(e.target.value);
    setStaffs(staff);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin_dashboard/staffs");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(
          error.response.data.error ||
            error.response.data.message ||
            "Error adding salary!"
        );
      } else {
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
          <h2 className="text-2xl font-bold text-teal-600 mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* Department */}
              <div>
                <label
                  htmlFor="department"
                  className="block text-l font-medium text-gray-600"
                >
                  Department:
                </label>
                <select
                  name="department"
                  value={staffs.department}
                  className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
                  onChange={handleDepartment}
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Staff on department basis */}
              <div>
                <label
                  htmlFor="staff"
                  className="block text-l font-medium text-gray-600"
                >
                  Staff:
                </label>
                <select
                  name="staffId"
                  className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
                  onChange={handleChange}
                >
                  <option value="">Select Staff</option>
                  {staffs.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.staffId}
                    </option>
                  ))}
                </select>
              </div>
              {/* Basic Salary */}
              <div>
                <label
                  htmlFor="basicSalary"
                  className="block text-l font-medium text-gray-600"
                >
                  Basic Salary:
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  placeholder="Enter Basic Salary"
                  className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
                  onChange={handleChange}
                />
              </div>
              {/* Allowance */}
              <div>
                <label
                  htmlFor="allowances"
                  className="block text-l font-medium text-gray-600"
                >
                  Allowances:
                </label>
                <input
                  type="number"
                  name="allowances"
                  placeholder="Enter Allowances"
                  className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Deductions */}
              <div>
                <label
                  htmlFor="deductions"
                  className="block text-l font-medium text-gray-600"
                >
                  Deductions:
                </label>
                <input
                  type="number"
                  name="deductions"
                  placeholder="Enter Deductions"
                  className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Pay Date */}
              <div>
                <label
                  htmlFor="payDate"
                  className="block text-l font-medium text-gray-600"
                >
                  Pay Date:
                </label>
                <input
                  type="date"
                  name="payDate"
                  className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-teal-700"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default AddSalary;
