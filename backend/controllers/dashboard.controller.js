import DepartmentModel from "../models/Department.js";
import LeaveModel from "../models/Leaves.js";
import StaffModel from "../models/Staff.js";

export const getSummary = async (req, res) => {
  try {
    const totalEmployees = await StaffModel.countDocuments();
    const totalDepartments = await DepartmentModel.countDocuments();
    const totalSalaries = await StaffModel.aggregate([
      { $group: { _id: null, total: { $sum: "$salary" } } },
    ]);
    const employeeAppliedForLeave = await LeaveModel.distinct("staffId");
    const leaveStatus = await LeaveModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved: leaveStatus.find((s) => s._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((s) => s._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((s) => s._id === "Pending")?.count || 0,
    };
    console.log(totalEmployees, totalDepartments, totalSalaries, leaveSummary);
    return res.status(200).json({
      success: true,
      error: false,
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalaries[0]?.total || 0,
      leaveSummary,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
