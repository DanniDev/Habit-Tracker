import React from "react";
import { NewHabitProps } from "../types/habit.model";
import { MdDelete } from "react-icons/md";

export default function TableListItem(props: {
  isChecked: boolean;
  deleteHabitHandler: (id: string) => void;
  habit: NewHabitProps;
  onCheckHandler: (id: string) => void;
}) {
  const habit = props.habit;

  return (
    <tr>
      <td className="px-4  py-5 border-b border-gray-200 bg-white text-sm">
        <div className="">
          <input
            checked={props.isChecked}
            onChange={() => props.onCheckHandler(habit._id)}
            id=""
            type="checkbox"
            className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{habit.title}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          <span className="font-bold">{habit.achieved}</span> out of{" "}
          <span className="font-bold">{habit.goal}</span>
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{habit.completedAt}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => props.deleteHabitHandler(habit._id)}
          className="bg-transparent hover:bg-red-200 p-2 rounded-sm group"
        >
          <MdDelete
            size={20}
            className="text-red-500 group group-hover:text-red-700"
          />
        </button>
      </td>
    </tr>
  );
}
