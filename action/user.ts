"use server";

import { signIn } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err;
  }
  redirect("/");
};

const register = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password || !confirmPassword) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Password do not match" };
  }

  await connectDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  console.log("User created successfully", newUser);

  redirect("/login");
};

export { register, login };
