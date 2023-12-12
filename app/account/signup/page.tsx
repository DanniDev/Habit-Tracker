"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import logo2 from "../../../public/images/logo2.png";
import Link from "next/link";
import { UserInputType } from "@/app/types/habit.model";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { setUser } from "@/lib/redux/slices/userSlice";
import { useAppDispatch } from "@/lib/redux/hook";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  let params = useSearchParams();

  const redirectUrl = params.get("callbackUrl")
    ? params
        .get("callbackUrl")
        ?.slice(params.get("callbackUrl")?.lastIndexOf("/"))
    : "/dashboard";

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && session) {
      dispatch(
        setUser({
          _id: session?.user.id!,
          name: session?.user.name!,
          email: session?.user.email!,
          picture: session?.user.picture!,
          provider: session?.user.provider!,
        })
      );
      router.push(redirectUrl!, { scroll: false });
    }
  }, [router, redirectUrl, status, session, dispatch]);

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState<UserInputType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = userInput;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    const { name, value } = target;

    setUserInput({ ...userInput, [name]: value });
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (password === confirmPassword) {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        username,
        email,
        password,
        usertype: "newUser",
      });

      if (res?.error) {
        setLoading(false);
        if (res.error === "CredentialsSignin") {
          toast.error("Something went wrong, please try again!");
          router.push(pathname);
        } else {
          toast.error(res.error);
        }
      } else {
        setLoading(false);
        toast.success("You have successfully signed up");
        router.push(redirectUrl!, { scroll: false });
      }
    } else {
      toast.error("Password do not match!");
    }
  };
  return (
    <div className="bg-[#f1f1f1] flex min-h-screen flex-1 flex-col justify-center px-6 py-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          priority={true}
          src={logo2.src}
          width={65}
          height={65}
          alt="Habit Mentor"
          className="mx-auto text-center"
        />
        <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
        <p className="text-center text-md tracking-tight text-gray-700">
          Welcome! Please enter your details.
        </p>
      </div>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-md py-4 px-8">
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                onChange={onChangeHandler}
                name="username"
                type="text"
                required
                placeholder="Enter your name"
                className="pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                onChange={onChangeHandler}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={onChangeHandler}
                id="password"
                name="password"
                type="password"
                required
                placeholder="********"
                className="pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={onChangeHandler}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="********"
                className="pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {loading ? (
            <button
              disabled
              type="button"
              className="w-full cursor-no-drop justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm bg-gray-200 flex items-center"
            >
              <ClipLoader color={"#fff"} loading={loading} size={18} />
              <span className="pl-2">Please wait...</span>
            </button>
          ) : (
            <>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]"
                >
                  Submit
                </button>
              </div>
              <div className="!mt-3">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full px-3 py-2 text-sm font-medium leading-6 text-gray-700
                      shadow-sm 
                      ring-[1px] ring-inset ring-gray-300 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 bg-white hover:bg-gray-50 align-center"
                >
                  <FcGoogle size={26} />
                  <span className="pl-2">Sign in with Google</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
      <p className="mt-2 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/account/login"
          className="font-semibold leading-6 text-[#52cca5] hover:text-[#49bb97]"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
