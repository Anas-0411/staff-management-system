import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment({
            dep_name: response.data.department.dep_name || "",
            description: response.data.department.description || "",
          });
        }
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching department");
      }
    };

    fetchDepartments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/department/edit/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin_dashboard/departments");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(
          error.response.data.error ||
            error.response.data.message ||
            "Error editing department"
        );
      } else {
        alert("Server error. Please try again later.");
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
        Edit Department
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-l font-medium text-gr
          ay-600"
          >
            Department Name:
          </label>
          <input
            type="text"
            name="dep_name"
            placeholder="Enter Department Name..."
            className="mt-1 w-full border-2 border-teal-600 rounded px-4 py-2 outline-0"
            onChange={handleChange}
            value={department.dep_name}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-l font-medium text-gr
          ay-600"
          >
            Description:{" "}
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="mt-1 w-full h-40 border-2 border-teal-600 rounded px-4 py-2 outline-0"
            onChange={handleChange}
            value={department.description}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-teal-600 text-white rounded font-bold cursor-pointer"
        >
          Edit Department
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
