import React from "react";
import { NewHabitProps } from "../types/habit.model";
import clsx from "clsx";
import { getCurrentDate } from "../util/helpers";
import { toast } from "react-toastify";
import axios from "axios";
import { setStatus, updateHabit } from "@/lib/redux/slices/habitSlice";
import { useAppDispatch } from "@/lib/redux/hook";

export default function MonthListItem(props: {
  keyId: string;
  month: string;
  habit: NewHabitProps;
  monthsInYear: string[];
  setUpdateLoading: (isLoading: boolean) => void;
  setUpdatingHabitId: (id: string) => void;
}) {
  const dispatch = useAppDispatch();

  const [thisMonth, today, currentYear] = getCurrentDate();

  const { habit, month, monthsInYear, setUpdateLoading, setUpdatingHabitId } =
    props;

  const onDayUpdateHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id: checkedMonth, name, checked } = event.target;
    const dayChecked = parseInt(name);
    const currentMonth = thisMonth.slice(0, 3).toLocaleLowerCase();

    if (currentMonth === checkedMonth) {
      if (dayChecked === today) {
        dispatch(setStatus("onUpdateHabitPending"));
        setUpdateLoading(true);
        setUpdatingHabitId(habit._id);
        try {
          const res = await axios.put(
            "/api/habits",
            JSON.stringify({
              month: checkedMonth,
              dayChecked,
              habitId: habit._id,
              isCompleted: false,
              isChecked: checked,
            })
          );

          const {
            data: { updatedHabit },
          } = res;

          setUpdateLoading(false);
          setUpdatingHabitId("");
          dispatch(setStatus("onUpdateHabitSuccess"));
          dispatch(updateHabit(updatedHabit));
          toast.success("Habit updated successfully!");
        } catch (error: any) {
          toast.error("Something went wrong!");
          dispatch(setStatus("onUpdateHabitFailed"));
          setUpdateLoading(false);
          setUpdatingHabitId("");
        }
      } else if (dayChecked > today) {
        const elapsedDays = dayChecked - today;
        toast.error(
          `Oops, that's ${
            elapsedDays === 1
              ? 1 + " " + "day ahead!"
              : elapsedDays + " " + "days ahead!"
          }`
        );
      } else if (dayChecked < today) {
        const pastDays = today - dayChecked;
        toast.error(
          `Oops, that's ${
            pastDays === 1 ? 1 + " " + "day ago!" : pastDays + " " + "days ago!"
          }`
        );
      }
    } else {
      toast.error("Oops, Checking Invalid month!");
    }
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
                  checked={day.isChecked}
                  id={el.month.toLowerCase()}
                  name={day.day.toString()}
                  onChange={onDayUpdateHandler}
                  type="checkbox"
                  className="cursor-pointer border-0 outline-none opacity-1 absolute h-5 w-5 rounded-full appearance-none"
                />
                <div
                  className={clsx(
                    "border-gray-400 w-5 h-5 border-[1.5px] rounded-full hover:bg-gray-400",
                    {
                      "bg-[#52cca5]": day.isChecked,
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
