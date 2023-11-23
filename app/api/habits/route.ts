import Habit from "@/app/model/habitModel";
import { connectDB } from "@/lib/mongodb/db";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req:NextRequest) {
    if(req.method !== "GET"){
        return NextResponse.json({message: `Request ${req.method} is not allowed`})
    } else{
        try {
            await connectDB();
    
            const habits = await Habit.find({});
    
            return NextResponse.json({success: true, habits}, {status: 200})
        } catch (error:any) {
            return NextResponse.json({message: error.message}, {status: 401})
        }
    }
}