import LeaveModel from "../models/Leaves.js";

export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body
    const leave = new LeaveModel({
      userId,
      leaveType,
      startDate,
      endDate,
      reason,
    })
    const savedLeave = await leave.save()
    return res.status(200).json({
      success: true,
      error: false,
      message: "Leave added successfully",
      leave: savedLeave,
    })
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  
  }
} 

export const getAllLeaves = async (req, res) => {
  try {
    const { id } = req.params
    const leaves = await LeaveModel.find({ userId: id })
    return res.status(200).json({
      success: true,
      error: false,
      leaves,
    })
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}