import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import useAuth from "../../context/useAuth";

const StaffSidebar = () => {
  const {user} = useAuth()
  return (
    <section className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h2 className="text-2xl text-center font-bold">Staff MS</h2>
      </div>
      <div className="px-4 space-y-2">
        {/* Dashboard */}
        <NavLink
          to="/employee_dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2 px-4 rounded hover:bg-teal-500`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        {/* Staff */}
        <NavLink
          to={`/employee_dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2 px-4 rounded hover:bg-teal-500`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        {/* Salary */}
        <NavLink
          to={`/employee_dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2 px-4 rounded hover:bg-teal-500`
          }
        >
          <FaMoneyBillAlt />
          <span>Salary</span>
        </NavLink>
        {/* Leaves */}
        <NavLink
          to="/employee_dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2 px-4 rounded hover:bg-teal-500`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        {/* Settings */}
        <NavLink
          to="/employee_dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2 px-4 rounded hover:bg-teal-500`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </section>
  );
}

export default StaffSidebar