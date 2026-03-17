import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminSetting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  // 👇 toggle states
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.patch(
        "http://localhost:3000/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        navigate("/admin_dashboard/staffs");
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type={showOld ? "text" : "password"}
              name="oldPassword"
              value={setting.oldPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter current password"
            />
            <span
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-9 cursor-pointer text-xl text-gray-600"
            >
              {showOld ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={setting.newPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter new password"
            />
            <span
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-9 cursor-pointer text-xl text-gray-600"
            >
              {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={setting.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm new password"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 cursor-pointer text-xl text-gray-600"
            >
              {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSetting;
