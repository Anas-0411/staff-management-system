import { Router } from "express";
import { auth } from "./../middleware/authMiddleware.js";
import {
  addStaff,
  getAllStaff,
  getStaffByDepartmentId,
  getStaffById,
  updateStaff,
} from "../controllers/staff.controller.js";
import upload from "../middleware/storage.js";

const staffRouter = Router();

staffRouter.post("/add", auth, upload.single("image"), addStaff);
staffRouter.get("/list", auth, getAllStaff);
staffRouter.get("/:id", auth, getStaffById);
staffRouter.put("/edit/:id", auth, updateStaff);
staffRouter.get("/department/:id", auth, getStaffByDepartmentId);

export default staffRouter;
