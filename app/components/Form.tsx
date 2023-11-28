import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch } from "@/lib/redux/hook";
import { addHabit, setError, setStatus } from "@/lib/redux/slices/habitSlice";
import { toast } from "react-toastify";

export default function Form(props: { closeModal: () => void }) {
  const dispatch = useAppDispatch();

  const [goal, setGoal] = useState<number>(15);
  const [title, setTitle] = useState<string>("");

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setStatus("onAddHabitPending"));
    try {
      const res = await axios.post(
        "/api/habits",
        JSON.stringify({
          title,
          goal,
        })
      );

      const { data } = res;

      dispatch(setStatus("onAddHabitSuccess"));
      dispatch(addHabit(data.habit));
      toast.success("Habit created successfully!");

      props.closeModal();
    } catch (error: any) {
      dispatch(setStatus("onAddHabitFailed"));
      toast.error("Something went wrong!");
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#F9FAFB] py-12 pb-6">
      <h1 className=" text-[26px] mb-6 font-bold leading-6 text-gray-900">
        Add Habit
      </h1>
      <form onSubmit={onSubmitHandler} className="space-y-6">
        <div className="flex items-center">
          <div className="mt-2">
            <input
              onChange={(e) => setTitle(e.target.value)}
              name="habitText"
              type="text"
              required
              placeholder="Enter habit..."
              className="pl-3 py-3 rounded-lg border-0  text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 ml-2">
            <select
              onChange={(e) => setGoal(parseInt(e.target.value))}
              className="pr-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option value={15}>15 Days Challenge</option>
              <option value={30}>30 Days Challenge</option>
              <option value={45}>45 Days Challenge</option>
              <option value={60}>60 Days Challenge</option>
              <option value={75}>75 Days Challenge</option>
              <option value={90}>90 Days Challenge</option>
              <option value={105}>105 Days Challenge</option>
              <option value={120}>120 Days Challenge</option>
              <option value={135}>135 Days Challenge</option>
              <option value={150}>150 Days Challenge</option>
              <option value={165}>165 Days Challenge</option>
              <option value={180}>180 Days Challenge</option>
              <option value={195}>195 Days Challenge</option>
              <option value={210}>210 Days Challenge</option>
              <option value={225}>225 Days Challenge</option>
              <option value={240}>240 Days Challenge</option>
              <option value={255}>255 Days Challenge</option>
              <option value={270}>270 Days Challenge</option>
              <option value={285}>285 Days Challenge</option>
              <option value={300}>300 Days Challenge</option>
              <option value={315}>315 Days Challenge</option>
              <option value={330}>330 Days Challenge</option>
              <option value={345}>345 Days Challenge</option>
              <option value={360}>360 Days Challenge</option>
              <option value={375}>365 Days Challenge</option>
            </select>
          </div>

          {/* <div classNameName="w-72 fixed z-[999]">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md ring-[1px] ring-inset ring-gray-300 bg-white py-[14px] pl-3 pr-10 text-left focus:outline-none ml-2 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 left-2 top-0 z-[777] max-h-60 w-full overflow-auto shadow-md rounded-md bg-white py-1 text-base  ring-2 ring-black/5 focus:outline-none sm:text-sm pb-16">
                    {people.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-green-100 text-green-900"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div> */}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full max-w-[8rem] justify-center rounded-md px-3 py-2 text-sm font-medium leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
