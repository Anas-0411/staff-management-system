import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DepartmentButtons = ({ DepId, onDepartmentDelete }) => {
  const navigate = useNavigate();
  const handleDelete = async (DepId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/department/delete/${DepId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          onDepartmentDelete(DepId);
        }
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching department");
      }
    }
  };
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded cursor-pointer"
        onClick={() => navigate(`/admin_dashboard/departments/edit/${DepId}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
        onClick={() => handleDelete(DepId)}
      >
        Delete
      </button>
    </div>
  );
};
