import LeaveModel from "../models/Leaves.js";
import StaffModel from "../models/Staff.js";

// ✅ Add Leave
export const addLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const userId = req.user.id; // ✅ from auth middleware

    // 🔍 find staff using userId
    const staff = await StaffModel.findOne({ userId });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const leave = await LeaveModel.create({
      staffId: staff._id, // ✅ correct
      leaveType,
      startDate,
      endDate,
      reason,
    });

    return res.status(201).json({
      success: true,
      message: "Leave added successfully",
      leave,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Get Leaves of Logged-in User (via userId)
export const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Step 1: find staff using userId
    const staff = await StaffModel.findOne({ userId: id });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // 🔥 Step 2: get leaves using staffId
    const leaves = await LeaveModel.find({ staffId: staff._id });

    return res.status(200).json({
      success: true,
      error: false,
      leaves,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Leaves (with populate)
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveModel.find().populate({
      path: "staffId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      error: false,
      leaves,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveModel.findById({ _id: id }).populate({
      path: "staffId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name profileImage",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      error: false,
      leave,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateLeave = async (req, res) => { 
  try {
    const {id} = req.params;
    const leave = await LeaveModel.findByIdAndUpdate({ _id: id }, { status: req.body.status })
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    return res.status(200).json({
      success: true,
      error: false,
      message: "Leave updated successfully",
      leave,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}