import { Router } from "express";
import { auth } from "./../middleware/authMiddleware.js";
import { changePassword } from "../controllers/setting.controller.js";

const settingRouter = Router();

settingRouter.patch("/change-password", auth, changePassword);

export default settingRouter;
