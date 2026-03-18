import SalaryModel from "../models/Salary.js";
import StaffModel from "../models/Staff.js";

export const addSalary = async (req, res) => {
  try {
    let { staffId, basicSalary, allowances, deductions, payDate } = req.body;

    basicSalary = Number(basicSalary);
    allowances = Number(allowances) || 0;
    deductions = Number(deductions) || 0;

    if (isNaN(basicSalary)) {
      return res.status(400).json({ message: "Basic salary is required" });
    }
    // console.log("REQ BODY:", req.body);

    const netSalary = basicSalary + allowances - deductions;

    const salary = new SalaryModel({
      staffId,
      basicSalary,
      allowances,
      deductions,
      netSalary,
      payDate,
    });

    const savedSalary = await salary.save();

    res.status(201).json({
      success: true,
      message: "Salary added successfully",
      salary: savedSalary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSalaryById = async (req, res) => {
  try {
    const { id, role } = req.params;
    // console.log(role);

    let salaries;
    if (role === "admin") {
      salaries = await SalaryModel.find({ staffId: id }).populate("staffId");
    } else {
      const staff = await StaffModel.findOne({ userId: id });
      salaries = await SalaryModel.find({ staffId: staff._id }).populate(
        "staffId",
        "staffId",
      );
    }
    return res.status(200).json({
      success: true,
      error: false,
      salaries,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
