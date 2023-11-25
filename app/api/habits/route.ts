import Habit from "@/app/model/habitModel";
import { connectDB } from "@/lib/mongodb/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: `Request ${req.method} is not allowed` },
      { status: 405 }
    );
  } else {
    try {
      await connectDB();

      const habits = await Habit.find({});

      return NextResponse.json(
        { success: true, data: habits },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
  }
}

export async function DELETE(req: NextRequest) {
  const reqBody = await req.json();
  console.log(reqBody);
  if (req.method !== "DELETE") {
    return NextResponse.json(
      { message: `Request ${req.method} is not allowed` },
      { status: 405 }
    );
  } else {
    try {
      await connectDB();

      const result = await Habit.deleteMany({
        _id: { $in: reqBody.habitId! },
      });

      const deletedHabitIds = result.deletedCount > 0 ? reqBody.habitId : [];

      console.log(deletedHabitIds);

      return NextResponse.json(
        { success: true, data: deletedHabitIds },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
  }
}
