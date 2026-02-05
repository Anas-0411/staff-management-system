import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// login
import LoginPage from "./pages/LoginPage";
// dashboard
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
// utils
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
// summary
import AdminSummary from "./components/admin/AdminSummary";
import EmployeeSummary from "./components/employeeDashboard/EmployeeSummary";
// Department
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
// Staff
import StaffList from "./components/staff/StaffList";
import AddStaff from "./components/staff/AddStaff";
import ViewStaff from "./components/staff/ViewStaff";
import EditStaff from "./components/staff/EditStaff";
// Salary
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
// Employee
import LeavesList from "./components/leaves/LeavesList";
import AddLeaves from "./components/leaves/AddLeaves";
import { Toaster } from "react-hot-toast";
import Setting from "./components/employeeDashboard/Setting";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/admin_dashboard" />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route
          path="/admin_dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Dashboard Home */}
          <Route index element={<AdminSummary />} />

          {/* Department Routes */}
          <Route path="departments" element={<DepartmentList />} />
          <Route path="departments/add" element={<AddDepartment />} />
          <Route path="departments/edit/:id" element={<EditDepartment />} />

          {/* Staff Routes */}
          <Route path="staffs" element={<StaffList />} />
          <Route path="staffs/add" element={<AddStaff />} />
          <Route path="staffs/:id" element={<ViewStaff />} />
          <Route path="staffs/edit/:id" element={<EditStaff />} />

          {/* Salary Routes */}
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="staff/salary/:id" element={<ViewSalary />} />
        </Route>

        {/* ================= EMPLOYEE DASHBOARD ================= */}
        <Route
          path="/employee_dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "staff"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Dashboard Home */}
          <Route index element={<EmployeeSummary />} />
          {/* profile */}
          <Route path="profile/:id" element={<ViewStaff />}></Route>
          {/* leaves */}
          <Route path="leaves" element={<LeavesList />}></Route>
          <Route path="leaves/add" element={<AddLeaves />}></Route>
          <Route path="salary/:id" element={<ViewSalary />}></Route>
          <Route path="setting" element={<Setting />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
