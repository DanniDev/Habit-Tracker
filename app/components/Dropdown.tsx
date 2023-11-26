import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Dropdown() {
  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="">
            <FiEdit
              className="-mr-1 ml-2 h-5 w-5 text-gray-400 hover:text-gray-800"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-[999] absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white border-2 border-[#eee]">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-[#52cca5] text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <IoMdCheckmarkCircleOutline
                        className="mr-2 h-5 w-5 text-green-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <IoMdCheckmarkCircleOutline
                        className="mr-2 h-5 w-5 text-[#52cca5]"
                        aria-hidden="true"
                      />
                    )}
                    Mark completed
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-red-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <MdDelete
                        className="mr-2 h-5 w-5 text-red-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <MdDelete
                        className="mr-2 h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
