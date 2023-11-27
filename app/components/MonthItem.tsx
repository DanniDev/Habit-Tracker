import React from "react";
import { NewHabitProps } from "../types/habit.model";
import clsx from "clsx";
import { getCurrentDate } from "../util/helpers";

export default function MonthItem(props: {
  keyId: string;
  month: string;
  habit: NewHabitProps;
  monthsInYear: string[];
}) {
  const [thisMonth, today, currentYear] = getCurrentDate();

  const { habit, month, monthsInYear } = props;

  const onCheckedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    console.log(checked);
  };

  const setPastDaysBackground = (monthDay: {
    day: number;
    isChecked: boolean;
  }) => {
    return (
      monthsInYear.indexOf(month) <=
        monthsInYear.indexOf(thisMonth.slice(0, 3).toUpperCase()) &&
      monthDay.day < today &&
      !monthDay.isChecked
    );
  };

  return (
    <div key={props.keyId} className="pr-2">
      <h6 className="text-[11px] text-gray-400 font-bold mb-3">
        {props.month}
      </h6>
      <div className="grid grid-cols-4">
        {habit.daySelection.map(
          (el) =>
            el.month.toLowerCase() === props.month.toLowerCase() &&
            el.days.map((day) => (
              <div
                key={day.day}
                className="flex items-center check-wrapper relative"
              >
                <input
                  // checked={props.completed}
                  // id={props.habitId}
                  // name={props.day.toString()}
                  onChange={onCheckedHandler}
                  type="checkbox"
                  className="cursor-pointer border-0 outline-none opacity-1 absolute h-5 w-5 rounded-full appearance-none"
                />
                <div
                  className={clsx(
                    "border-gray-400 w-5 h-5 border-[1.5px] rounded-full hover:bg-gray-400",
                    {
                      "bg-green-600": day.isChecked,
                      "bg-gray-600":
                        setPastDaysBackground(day) ||
                        (monthsInYear.indexOf(month) <
                          monthsInYear.indexOf(
                            thisMonth.slice(0, 3).toUpperCase()
                          ) &&
                          !day.isChecked),
                    }
                  )}
                ></div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
