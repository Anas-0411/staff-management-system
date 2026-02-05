import React from "react";
import useAuth from "../context/useAuth";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/Unauthorized" />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
