import mongoose from "mongoose";
import StaffModel from "./Staff.js";
import LeaveModel from "./Leaves.js";
import SalaryModel from "./Salary.js";
import UserModel from "./User.js";

const departmentSchema = new mongoose.Schema(
  {
    dep_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    try {
      const employees = await StaffModel.find({ department: this._id });
      const employeeIds = employees.map((employee) => employee._id);

      await StaffModel.deleteMany({ department: this._id });

      await LeaveModel.deleteMany({ staffId: { $in: employeeIds } });

      await SalaryModel.deleteMany({ staffId: { $in: employeeIds } });

      await UserModel.deleteMany({ staffId: { $in: employeeIds } });
    } catch (error) {
      console.error("Middleware Error:", error);
      throw error;
    }
  },
);

const DepartmentModel = mongoose.model("Department", departmentSchema);

export default DepartmentModel;
