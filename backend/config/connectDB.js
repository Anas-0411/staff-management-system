import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error(
    "MONGO_URI is not defined in environment variables file or .env file"
  );
}
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully".green.bold);
  } catch (error) {
    console.log("MongoDB Connection Error!", error);
  }
};

export default connectDB;
