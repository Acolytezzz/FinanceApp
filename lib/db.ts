const connectDB = async () => {
  const mongoose = await import("mongoose");
  
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connectDB;
