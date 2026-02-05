import React, { useEffect, useState } from "react";
import {fetchDepartments} from "./StaffHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddStaff = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getDepartments = async () => {
      const depData = await fetchDepartments();
      setDepartments(depData);
    };
    getDepartments();
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/staff/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Staff added successfully");
        navigate("/admin_dashboard/staffs");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.error ||
            error.response.data.message ||
            "Error adding department"
        );
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
      <h2 className="text-2xl font-bold text-teal-600 mb-6">Add New Staff</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-l font-medium text-gray-600"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
              required
            />
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-l font-medium text-gray-600"
            >
              Email:
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
              required
            />
          </div>
          {/* Staff ID */}
          <div>
            <label
              htmlFor="staffId"
              className="block text-l font-medium text-gray-600"
            >
              Staff ID:
            </label>
            <input
              type="text"
              name="staffId"
              placeholder="Enter Staff ID"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
              required
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="block text-l font-medium text-gray-600"
            >
              Date of Birth:
            </label>
            <input
              type="date"
              name="dob"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-l font-medium text-gray-600"
            >
              Gender:
            </label>
            <select
              name="gender"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* Marital Status */}
          <div>
            <label
              htmlFor="maritalStatus"
              className="block text-l font-medium text-gray-600"
            >
              Marital Status:
            </label>
            <select
              name="maritalStatus"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          {/* Designation */}
          <div>
            <label
              htmlFor="designation"
              className="block text-l font-medium text-gray-600"
            >
              Designation:
            </label>
            <input
              type="text"
              name="designation"
              placeholder="Enter Staff Designation"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
              required
            />
          </div>
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
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          {/* Salary */}
          <div>
            <label
              htmlFor="salary"
              className="block text-l font-medium text-gray-600"
            >
              Staff Salary:
            </label>
            <input
              type="text"
              name="salary"
              placeholder="Enter Staff Salary"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
              required
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-l font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
              required
            />
          </div>
          {/* Role*/}
          <div>
            <label
              htmlFor="role"
              className="block text-l font-medium text-gray-600"
            >
              Role:
            </label>
            <select
              name="role"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0"
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          {/* Upload Image */}
          <div>
            <label
              htmlFor="image"
              className="block text-l font-medium text-gray-600"
            >
              Upload Image:
            </label>
            <input
              type="file"
              name="image"
              placeholder="Upload Image"
              accept="image/*"
              className="mt-1 p-2 block w-full border-2 border-teal-600 rounded-md outline-0 cursor-pointer"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-teal-700"
        >
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default AddStaff;
