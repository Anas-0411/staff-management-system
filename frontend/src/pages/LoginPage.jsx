import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        const user = response.data.user; // ✅ FIX

        // save user to context
        login(user);

        // save token
        localStorage.setItem("token", response.data.token);

        // role-based redirect
        if (user.role === "admin") {
          navigate("/admin_dashboard");
        } else {
          navigate("/employee_dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Server error. Please try again later.");
      }
      console.error("Login failed", error);
    }
  };

  return (
    <section className="flex flex-col items-center h-screen justify-center bg-linear-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="text-3xl text-white">Staff Management System</h2>

      <div className="rounded shadow p-6 w-80 bg-white">
        <h2 className="text-2xl text-teal-700 font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember Me</span>
            </label>
            <span className="text-teal-600 hover:underline text-sm cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
