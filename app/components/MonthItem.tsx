import React from "react";

export default function MonthItem(props: { keyId: string; month: string }) {
  return (
    <div key={props.keyId} className="pr-2">
      <h6 className="text-[11px] font-bold mb-3">{props.month}</h6>
      <div className="grid grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <div
            key={props.keyId}
            className="flex items-center check-wrapper relative"
          >
            <input
              // checked={props.completed}
              // id={props.habitId}
              // name={props.day.toString()}
              // onChange={onCheckedHandler}
              type="checkbox"
              className="cursor-pointer opacity-0 absolute h-5 w-5 rounded-full"
            />
            <div className="w-5 h-5 border-[1.5px] border-gray-400 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
