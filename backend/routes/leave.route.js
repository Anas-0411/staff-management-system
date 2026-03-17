import { Router } from 'express'
import { auth } from './../middleware/authMiddleware.js';
import {
  addLeave,
  getAllLeaves,
  getLeave,
  getLeaveDetail,
  updateLeave,
} from "../controllers/leave.controller.js";

const leaveRouter = Router();

leaveRouter.post("/add", auth, addLeave);
leaveRouter.get("/list/:id", auth, getLeave);
leaveRouter.get("/", auth, getAllLeaves);
leaveRouter.get("/details/:id", auth, getLeaveDetail);
leaveRouter.put("/:id", auth, updateLeave);

export default leaveRouter