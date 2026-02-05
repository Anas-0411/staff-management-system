import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },

    allowances: {
      type: Number,
      default: 0,
      min: 0,
    },

    deductions: {
      type: Number,
      default: 0,
      min: 0,
    },

    netSalary: {
      type: Number,
      required: true,
      min: 0,
    },

    payDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const SalaryModel = mongoose.model("Salary", salarySchema);
export default SalaryModel;
