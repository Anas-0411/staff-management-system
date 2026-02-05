import mongoose from "mongoose";

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
  }
);

const DepartmentModel = mongoose.model("Department", departmentSchema);

export default DepartmentModel;
