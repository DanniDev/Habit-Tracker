import React from "react";
import logo2 from "@/public/images/logo2.png";
import userPicture from "@/public/images/user.jpg";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { AiOutlinePieChart } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export default function Sidebar() {
  let pathname = usePathname();
  pathname = pathname.toLocaleLowerCase();
  const router = useRouter();

  const logoutHandler = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/account/login",
    });

    toast.success("You have logout successfully!");
    router.push(data.url);
  };

  return (
    <div className="w-[190px] bg-[#f0f0f0] fixed h-screen pl-3 pr-4 z-[888]">
      <div className="pt-5 flex items-center">
        <Image src={logo2.src} height={50} width={50} alt="Habit Mentor" />
        <h1 className="font-bold text-[25px] text-[#52cca5]">Habit X</h1>
      </div>

      <div className="mt-8">
        <ul className="space-y-2 font-medium">
          <li className="ml-1">
            <Link
              href="/dashboard"
              className={clsx(
                "font-bold text-sm flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-600 dark:hover:bg-[#eaecec] group",
                {
                  "dark:!bg-[#52cca5]":
                    pathname === "/dashboard" || pathname === "/",
                  "active-link": pathname === "/dashboard" || pathname === "/",
                }
              )}
            >
              <AiOutlinePieChart className="link-icon w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />

              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li className="ml-1">
            <Link
              href="/habits"
              className={clsx(
                "font-bold text-sm flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-600 dark:hover:bg-[#eaecec] group",
                {
                  "dark:!bg-[#52cca5]": pathname === "/habits",
                  "active-link": pathname === "/habits",
                }
              )}
            >
              <RxDashboard className=" link-icon w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />

              <span className="ms-3">My Habits</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-10 left-5">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-full">
            <Link href="/account/user/profile">
              <Image
                width={80}
                height={80}
                src={userPicture.src}
                alt="User Picture"
                className="object-cover w-full h-full"
              />
            </Link>
          </div>
          <div>
            <div>
              <Link href="/account/user/profile">
                <h3 className="text-sm font-medium text-gray-800 pb-1 pt-2">
                  Daniel Agyei
                </h3>
              </Link>
            </div>
            <button
              onClick={logoutHandler}
              className="flex items-center rounded-md text-red-400 dark:hover:text-red-500 group font-medium"
            >
              <span className="text-md transition duration-75 dark:group-hover:text-red-600">
                <TbLogout />
              </span>
              <span className="text-sm pl-2 dark:group-hover:text-red-600">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
