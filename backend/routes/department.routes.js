import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  addDepartment,
  deleteDepartment,
  getAllDepartment,
  getDepartmentById,
  updateDepartment,
} from "../controllers/department.controller.js";

const departmentRouter = Router();

departmentRouter.post("/add", auth, addDepartment);
departmentRouter.get("/list", auth, getAllDepartment);
departmentRouter.get("/:id", auth, getDepartmentById);
departmentRouter.put("/edit/:id", auth, updateDepartment);
departmentRouter.delete("/delete/:id", auth, deleteDepartment);

export default departmentRouter;
