import React from "react";
import { NewHabitProps } from "../types/habit.model";
import { GiStairsGoal } from "react-icons/gi";
import { RiLoopRightLine } from "react-icons/ri";
import { GrAchievement } from "react-icons/gr";
import Dropdown from "./Dropdown";
import { v4 as uuidV4 } from "uuid";
import MonthItem from "./MonthItem";
import { getCurrentDate } from "../util/helpers";

export default function HabitItem(props: { habit: NewHabitProps }) {
  const habit = props.habit;

  const [thisMonth, today, currentYear] = getCurrentDate();

  const calculateStreak = () => {
    let streak = 0;

    // const daysActivity = ([] as Array<boolean>).concat(
    //   ...habit.daySelection.map((el) => el.days.map((day) => day.isChecked))
    // );
    let stopPushing = false;
    const daysActivity = ([] as Array<boolean>).concat(
      ...habit.daySelection.map((el) => {
        const daysChecked: boolean[] = [];

        for (const day of el.days) {
          if (
            el.month.toLowerCase() === thisMonth.slice(0, 3).toLowerCase() &&
            day.day === today
          ) {
            stopPushing = true;
            break;
          }

          if (!stopPushing) {
            daysChecked.push(day.isChecked);
          }
        }

        return daysChecked;
      })
    );

    for (const isChecked of daysActivity) {
      if (isChecked) {
        streak++;
      } else {
        streak = 0;
      }
    }

    return streak;
  };

  const streak = calculateStreak();
  console.log(streak);

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
            <p className="pl-2 text-gray-400 text-sm">
              <strong className="text-gray-600 pr-1 text-lg">{streak}</strong>
              Streak
            </p>
          </div>
          <div className="flex items-center pl-8">
            <span className="max-w-[40px] max-h-[40px] rounded-full p-2 bg-blue-100 flex justify-center items-center">
              <GrAchievement className="w-8 h-8 text-red-300" />
            </span>
            <p className="pl-2 text-gray-400 text-sm">
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
            <MonthItem
              monthsInYear={monthsInYear}
              habit={habit}
              key={uuidV4()}
              keyId={uuidV4()}
              month={month}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
