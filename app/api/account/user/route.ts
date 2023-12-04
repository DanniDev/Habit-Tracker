import User from "@/app/model/UserModel";
import { connectDB } from "@/lib/mongodb/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const reqBody = await req.json();

  let { userEmail, pictureUrl } = reqBody;

  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: `Request ${req.method} is not allowed` },
      { status: 405 }
    );
  } else {
    try {
      await connectDB();
      const foundUser = await User.findOne({ email: userEmail });

      if (foundUser) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: foundUser._id },
          {
            $set: { picture: pictureUrl },
          },
          { new: true }
        );
        console.log(updatedUser);

        return NextResponse.json(
          { success: true, user: updatedUser },
          { status: 201 }
        );
      }

      return NextResponse.json(
        { message: "User does not exist!" },
        { status: 404 }
      );
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
