import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to DB");
  } catch (error) {
    throw new Error("Connection failed!");
    process.exit(1);
  }
};

export default connectDB;
