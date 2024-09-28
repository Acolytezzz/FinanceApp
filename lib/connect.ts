import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    throw new Error("Connection failed!");
    process.exit(1);
  }
};

export default connect;
