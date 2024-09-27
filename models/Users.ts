import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    category: { type: String, required: false },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    spending: [transactionSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
