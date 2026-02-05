import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

// Import the database connection function
import connectDB from "./config/connectDB.js";

// Import routes
import authRouter from "./routes/auth.routes.js";
import departmentRouter from "./routes/department.routes.js";
import staffRouter from "./routes/staff.routes.js";
import salaryRouter from "./routes/salary.routes.js";
import leaveRouter from "./routes/leave.route.js";
import settingRouter from "./routes/setting.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/uploads"));
const PORT = process.env.PORT || 5000;

// Use routes
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/staff", staffRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.blue.bold);
  });
});
