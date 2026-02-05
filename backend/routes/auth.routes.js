import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth.controller.js";
import { adminOnly, auth } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify", auth, verifyUser);
authRouter.get("/admin_dashboard", auth, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default authRouter;
