import { Router } from "express";
import { addSalary, getSalaryById } from "../controllers/salary.controller.js";
import {auth} from "../middleware/authMiddleware.js";

const salaryRouter = Router();

salaryRouter.post("/add", auth, addSalary);
salaryRouter.get("/:id", auth, getSalaryById)

export default salaryRouter;
