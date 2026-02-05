import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER (admin or user) role should come from req.body OR be set by route

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // default role = user
    const userRole = role === "admin" ? "admin" : "staff";

    // check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      error: false,
      message: `${userRole} registered successfully`,
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        password: savedUser.password,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // find user (admin OR user)
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      error: false,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

// Verify
export const verifyUser = async (req, res) => {
  res.status(200).json({
    success: true,
    error: false,
    message: "User verified successfully",
    user: req.user,
  });
};
