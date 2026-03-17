import React from "react";
import useAuth from "../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between text-white h-12 bg-teal-600 px-4">
      <p className="font-bold text-xl">
        {user?.role === "admin" ? "Welcome Admin" : `Welcome, ${user?.name}`}
      </p>

      <button
        className="px-4 py-1 font-bold text-xl bg-teal-800 rounded hover:bg-teal-500 cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
