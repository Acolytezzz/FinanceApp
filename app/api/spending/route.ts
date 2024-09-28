import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/lib/getSession";

export const runtime = "nodejs";

export async function GET() {
  const { default: connectDB } = await import("@/lib/db");
  const { default: User } = await import("@/models/Users");

  await connectDB();

  try {
    const userById = await User.find();

    if (!userById) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User fetched successfully",
        data: userById,
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

export async function POST(req: NextRequest, res: NextResponse) {
  const { default: connectDB } = await import("@/lib/db");
  const { default: User } = await import("@/models/Users");

  await connectDB();

  try {
    const session = await getSession();

    const id = session?.id;

    const userById = await User.findById({ _id: id });

    if (!userById) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const transaction = await req.json();

    userById.spending.push(transaction);

    await userById.save();

    return NextResponse.json(
      {
        message: "Transaction added successfully",
        data: userById,
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
