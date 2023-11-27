import React from "react";

export default function Form() {
  return (
    <div className="bg-[#F9FAFB] py-12 pb-6">
      <h1 className=" text-[26px] mb-6 font-bold leading-6 text-gray-900">
        Add Habit
      </h1>
      <form className="space-y-6">
        <div className="flex">
          <div className="mt-2">
            <input
              name="habitText"
              type="text"
              required
              placeholder="Enter habit..."
              className="pl-4 py-3  rounded-lg border-0  text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 ml-2">
            <select className="pr-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
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
