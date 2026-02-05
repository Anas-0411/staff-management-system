import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import StaffModel from "../models/Staff.js";

export const addStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      staffId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    await newUser.save();

    const newStaff = new StaffModel({
      userId: newUser._id,
      staffId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    const savedStaff = await newStaff.save();

    return res.status(201).json({
      success: true,
      error: false,
      message: "Staff Added Successfully",
      staff: savedStaff,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const staffs = await StaffModel.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({
      success: true,
      error: false,
      staffs,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    let staff;
    staff = await StaffModel.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (!staff) {
      staff = await StaffModel.findOne({ userId: id })
      .populate("userId", { password: 0 })
      .populate("department");
    }
    // if (!staff) {
    //   return res.status(404).json({ message: "Staff not found" });
    // }
    return res.status(200).json({
      success: true,
      error: false,
      staff,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;
    const staff = await StaffModel.findById({ _id: id });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    const user = await UserModel.findById({ _id: staff.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      user._id,
      { name },
      { new: true }
    );
    const updateStaff = await StaffModel.findByIdAndUpdate(
      staff._id,
      { maritalStatus, designation, department, salary },
      { new: true }
    );

    if (!updateStaff || !updateUser) {
      return res.status(500).json({ message: "Data not found!" });
    }
    return res.status(200).json({
      success: true,
      error: false,
      staff: updateStaff,
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getStaffByDepartmentId = async (req, res) => {
  try {
    const { id } = req.params;
    const staffs = await StaffModel.find({ department: id })
    if (!staffs) {
      return res.status(404).json({ message: "Staff not found" });
    }
    return res.status(200).json({
      success: true,
      error: false,
      staffs,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
