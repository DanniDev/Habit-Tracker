import Habit from "@/app/model/habitModel";
import { NewHabitProps, daySelectionTypes } from "@/app/types/habit.model";
import { calculateAchievement, getCurrentDate } from "@/app/util/helpers";
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
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: `Request ${req.method} is not allowed` },
      { status: 405 }
    );
  } else {
    const reqBody = await req.json();
    const { title, goal } = reqBody;

    const [_, today, yearCreated] = getCurrentDate();

    const monthsInYear = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const getDaysInMonth = (month: string) => {
      switch (month) {
        case "APR":
        case "SEP":
        case "JUN":
        case "NOV":
          return 30;

        case "FEB":
          return 28;

        default:
          return 31;
      }
    };

    const generateDaySelection = (): daySelectionTypes[] => {
      return monthsInYear.map((month) => ({
        month: month,
        days: Array.from({ length: getDaysInMonth(month) }, (_, index) => ({
          day: index + 1,
          isChecked: false,
        })),
      }));
    };
    const daySelection = generateDaySelection();

    const newHabit = new Habit({
      title,
      goal,
      achieved: 0,
      isCompleted: false,
      completedAt: null,
      checked: false,
      yearCreated,
      daySelection,
    });

    try {
      await connectDB();

      const habit = await newHabit.save();

      return NextResponse.json({ success: true, habit }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(req: NextRequest) {
  const reqBody = await req.json();
  let response;
  console.log(reqBody);

  let { month, dayChecked, isChecked, isCompleted, habitId } = reqBody;

  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: `Request ${req.method} is not allowed` },
      { status: 405 }
    );
  } else {
    try {
      await connectDB();

      if (isCompleted) {
        const updatedHabit = await Habit.findOneAndUpdate(
          {
            _id: habitId,
          },
          {
            $set: {
              isCompleted: true,
              completedAt: new Date(),
            },
          },
          { new: true }
        );

        return NextResponse.json(
          { success: true, updatedHabit },
          { status: 200 }
        );
      } else {
        const foundHabit: NewHabitProps | null = await Habit.findById({
          _id: habitId,
        });
        if (foundHabit) {
          const firstChar = month.slice(0, 1).toUpperCase();

          const remainingChar = month.slice(1);

          // month = firstChar + remainingChar;
          month = month.toUpperCase();

          const achieved = calculateAchievement(
            foundHabit.daySelection,
            isChecked
          );

          const updatedHabit = await Habit.findOneAndUpdate(
            { _id: foundHabit._id },
            {
              $set: {
                "daySelection.$[monthElement].days.$[dayElement].isChecked":
                  isChecked,
                achieved,
              },
            },
            {
              arrayFilters: [
                { "monthElement.month": { $eq: month } },
                { "dayElement.day": { $eq: dayChecked } },
              ],
              new: true,
            }
          );
          return NextResponse.json(
            { success: true, updatedHabit },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { success: false, message: "Habit not found!" },
            { status: 404 }
          );
        }
      }
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
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
        { success: true, deletedHabitIds },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
