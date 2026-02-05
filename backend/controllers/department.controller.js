import DepartmentModel from "../models/Department.js";

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    if (!dep_name || !description) {
      return res
        .status(400)
        .json({ message: "Department name and description are required" });
    }

    const existingDepartment = await DepartmentModel.findOne({ dep_name });
    if (existingDepartment) {
      return res.status(400).json({
        message: "Department with this name already exists",
      });
    }

    const newDepartment = new DepartmentModel({ dep_name, description });
    await newDepartment.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Department added successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllDepartment = async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    return res.status(200).json({
      success: true,
      error: false,
      departments,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await DepartmentModel.findById(id);
    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "Department not found" });
    }
    return res.status(200).json({
      success: true,
      error: false,
      department,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    if (!dep_name || !description) {
      return res
        .status(400)
        .json({ message: "Department name and description are required" });
    }

    const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true }
    );

    if (!updatedDepartment) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "Department not found" });
    }

    return res.status(200).json({
      success: true,
      error: false,
      department: updatedDepartment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await DepartmentModel.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    return res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
