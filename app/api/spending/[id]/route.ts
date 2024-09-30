import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/Users";

interface Params {
  id: string;
}

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Params }) {
  await connectDB();

  try {
    const { id } = params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Spending Data fetched successfully",
        transactions: user.spending,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Error fetching Spending Data",
        error: error instanceof Error ? error.message : "Unknown Error",
      },
      { status: 404 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  await connectDB();

  try {
    const { id } = params;

    const user = await User.findById({ _id: id });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const transaction = await req.json();

    user.spending.push(transaction);

    await user.save();

    return NextResponse.json(
      {
        message: "Transaction added successfully",
        data: user.spending,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Error updating Spending Data",
        error: error instanceof Error ? error.message : "Unknown Error",
      },
      { status: 404 }
    );
  }
}
