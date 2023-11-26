import React from "react";
import { NewHabitProps } from "../types/habit.model";
import { GiStairsGoal } from "react-icons/gi";
import { RiLoopRightLine } from "react-icons/ri";
import { GrAchievement } from "react-icons/gr";
import Dropdown from "./Dropdown";
import { v4 as uuidV4 } from "uuid";
import { DailyStatusChecker } from "./DailyChecker";
import MonthItem from "./MonthItem";

export default function HabitItem(props: { habit: NewHabitProps }) {
  const habit = props.habit;

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

  return (
    <div className="p-5 rounded-md bg-white mb-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">{habit.title}</h2>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="max-w-[40px] max-h-[40px] rounded-full p-2 bg-green-100 flex justify-center items-center">
              <GiStairsGoal className="w-8 h-8  text-green-900" />
            </span>
            <p className="pl-2 text-gray-400 text-sm">
              <strong className="text-gray-600 pr-1 text-lg">
                {habit.goal}
              </strong>
              Goal
            </p>
          </div>
          <div className="flex items-center pl-8">
            <span className="max-w-[40px] max-h-[40px] rounded-full p-2 bg-red-100 flex justify-center items-center">
              <RiLoopRightLine className="w-8 h-8 text-orange-600" />
            </span>
            <p className="pl-2 text-gray-500 text-sm">
              <strong className="text-gray-600 pr-1 text-lg">165</strong>Streak
            </p>
          </div>
          <div className="flex items-center pl-8">
            <span className="max-w-[40px] max-h-[40px] rounded-full p-2 bg-blue-100 flex justify-center items-center">
              <GrAchievement className="w-8 h-8 text-red-300" />
            </span>
            <p className="pl-2 text-gray-500 text-sm">
              <strong className="text-gray-600 pr-1 text-lg">
                {habit.achieved}
              </strong>
              Achieved
            </p>
          </div>
        </div>
        <div className="">
          <Dropdown />
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-12 checkbox-grid">
          {monthsInYear.map((month) => (
            <MonthItem key={uuidV4()} keyId={uuidV4()} month={month} />
          ))}
        </div>
      </div>
    </div>
  );
}
