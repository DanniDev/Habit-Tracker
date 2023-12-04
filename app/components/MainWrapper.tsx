"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { NewHabitProps } from "../types/habit.model";
import { setError, getHabits, setStatus } from "@/lib/redux/slices/habitSlice";
import { LoadingSpinner } from "./LoadingSpinner";
import { FaRegFaceDizzy } from "react-icons/fa6";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import Sidenav from "./Sidebar";
import HabitItem from "./HabitListItem";
import AddHabitModal from "./AddHabitModal";
import Dashboard from "./Dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import ProfilePage from "./ProfilePage";

export default function MainWrapper() {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const habits = useAppSelector((state) => state.habit.habits);
  const error = useAppSelector((state) => state.habit.error);
  const statusState = useAppSelector((state) => state.habit.status);

  const runningHabits = habits
    ? habits.filter((habit) => !habit.isCompleted)
    : [];

  let pathname = usePathname();
  pathname = pathname.toLocaleLowerCase();

  const router = useRouter();

  useEffect(() => {
    async function fetchHabits() {
      dispatch(setStatus("pending"));
      try {
        const res = await fetch(`/api/habits?user=${session?.user.email}`);

        const data = await res.json();
        const foundHabits: NewHabitProps[] = data.data;

        dispatch(getHabits(foundHabits));
        dispatch(setStatus("idle"));
        setLoading(false);

        JSON.stringify(localStorage.setItem("habits", data.data));

        return;
      } catch (error: any) {
        const errMsg = error.response.data.message;
        toast.error(errMsg);
        dispatch(setError(errMsg));
        dispatch(setStatus("idle"));
        setLoading(false);
      }
    }
    if (pathname.toLocaleLowerCase() === "/habits" && session) {
      fetchHabits();
    }
    if (status === "unauthenticated" && !session) {
      router.push("/account/login", { scroll: false });
    }
  }, [session, status, dispatch, router, pathname]);

  return (
    <>
      <div className="mx-auto bg-[#f0f0f0] w-full pt-0 p-6 pl-0 pr-2 pb-0 overflow-x-auto fixed ">
        <Sidenav />
        <div className="pl-[170px] ">
          <div className="p-10 pt-6 px-4 pl-8 h-screen  min-w-[1080px] w-full overflow-y-auto pb-[10px]">
            {(pathname === "/dashboard" || pathname === "/") && <Dashboard />}
            {pathname === "/account/user/profile" && <ProfilePage />}

            {pathname === "/habits" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-gray-900 font-bold text-[26px]">
                    My Habits
                  </h1>
                  <AddHabitModal />
                </div>
                {!loading &&
                !error &&
                habits !== undefined &&
                habits.length > 0 ? (
                  runningHabits.map((habit) => (
                    <HabitItem key={uuidV4() + habit._id} habit={habit} />
                  ))
                ) : (
                  <LoadingSpinner loading={statusState === "pending"} />
                )}

                {!loading &&
                  runningHabits !== undefined &&
                  runningHabits.length < 1 && (
                    <div className="absolute bg-slate-50 rounded-md px-5 py-8 w-full max-w-md text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <FaRegFaceDizzy
                        size="50"
                        className="text-center text-red-600 mx-auto mb-3"
                      />
                      <p className="mb-4 text-gray-700">
                        You currently have no habit to track!
                      </p>
                      <AddHabitModal />
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
