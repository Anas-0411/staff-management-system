import { Router } from "express";
import { auth } from "./../middleware/authMiddleware.js";
import { changePassword } from "../controllers/setting.controller.js";

const settingRouter = Router();

settingRouter.put("/changePassword", auth, changePassword);

export default settingRouter;
