import axios from "axios";

export const fetchDepartments = async () => {
  let departments = [];
  try {
    const response = await axios.get(
      "http://localhost:3000/api/department/list",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    alert(error.response?.data?.message || "Error fetching departments");
  }
  return departments;
};

export const fetchStaffs = async (id) => {
  let staffs = [];
  try {
    const response = await axios.get(
      `http://localhost:3000/api/staff/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      staffs = response.data.staffs;
    }
  } catch (error) {
    alert(error.response?.data?.message || "Error fetching staffs");
  }
  return staffs;
};
