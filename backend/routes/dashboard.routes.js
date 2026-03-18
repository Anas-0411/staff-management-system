import { Router } from "express";
import { auth } from "./../middleware/authMiddleware.js";
import { getSummary } from "../controllers/dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.get("/summary", auth, getSummary);

export default dashboardRouter;
