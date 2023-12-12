"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";
import { useEdgeStore } from "@/lib/edgestore/edgestore";
import { toast } from "react-toastify";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import {
  deleteUser,
  setStatus,
  updateUser,
} from "@/lib/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import avatar from "@/public/images/user.png";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const { data: session, status } = useSession();

  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/account/login", { scroll: false });
    }
  }, [router, session, status]);

  const user = useAppSelector((state) => state.userInfo.user);

  const [userDetails, setUserDetails] = useState({
    username: user?.name,
    oldPassword: "",
    password: "",
  });

  const { username, password, oldPassword } = userDetails;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const targetName = event.target.name;

    setUserDetails((prev) => ({
      ...prev,
      [targetName]: value,
    }));
  };

  const handleAccountDelete = async () => {
    const isConfirm = window.confirm(
      "Are you sure, All your habits will be deleted?"
    );

    if (isConfirm) {
      try {
        const res = await axios.delete(`/api/account/user?id=${user?._id}`);

        await edgestore.publicImages.delete({
          url: user?.picture!,
        });

        const data = await signOut({
          redirect: false,
          callbackUrl: "/account/login",
        });
        dispatch(deleteUser(""));
        toast.success("Account deleted successfully!");

        router.push(data.url);
      } catch (error: any) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    }
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    dispatch(setStatus("pending"));

    try {
      let res = await signIn("credentials", {
        redirect: false,
        username,
        email: session?.user.email,
        password,
        oldPassword,
        usertype: "updateUser",
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
        dispatch(setStatus("success"));
        dispatch(
          updateUser({
            _id: user?._id!,
            name: user?.name!,
            email: user?.email!,
            picture: user?.picture!,
            provider: user?.provider!,
          })
        );
        setLoading(false);
        toast.success("Profile updated successfully!");

        setUserDetails({
          username: user?.name,
          password: "",
          oldPassword: "",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("failed"));
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong, please try again!");
    }
  };

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setFileLoading(true);
    dispatch(setStatus("pending"));

    try {
      const file = event.target.files?.[0];
      if (file) {
        const res = await edgestore.publicImages.upload({
          file,
          options: {
            replaceTargetUrl: user!.picture,
          },
          onProgressChange: (progress: number) => {
            console.log(progress);
          },
        });

        console.log("FILE UPLOAD =>", res);
        const updatedPicture = await axios.put("/api/account/user", {
          pictureUrl: res.url,
          userEmail: session?.user.email,
        });

        const { data } = updatedPicture;

        dispatch(setStatus("success"));
        dispatch(
          updateUser({
            _id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            picture: data.user.picture,
          })
        );
        setFileLoading(false);
        toast.success("Profile updated successfully!");
      } else {
        setFileLoading(false);
        toast.error("There is no file to upload!");
      }
    } catch (error: any) {
      setFileLoading(false);
      setLoading(false);
      toast.error("Something went wrong, please try again!");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="">
        <div className="mx-auto w-20 text-center">
          <div className="relative w-20">
            <Image
              src={user?.picture! || avatar.src}
              height={80}
              width={80}
              priority
              className=" w-20 h-20 rounded-full absolute top-[1px] left-[1px]"
              alt="Avatar"
            />
            <input
              id="upload"
              type="file"
              onChange={onFileUpload}
              className="absolutes z-[777]  w-20 py-6 top-[2px] left-0 rounded-full file:text-transparent text-transparent file:bg-transparent cursor-pointer file:border-0 opacity-0"
            />
            <label htmlFor="upload" className="">
              <div className=" top-0 left-0 w-[82px] h-[82px] group hover:bg-gray-400 opacity-80 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                <MdOutlineFileUpload
                  size="30"
                  className="opacity-0 transition duration-200 group-hover:text-white group-hover:opacity-100"
                />
              </div>
            </label>
          </div>
        </div>
        <h3 className="mt-[15px] text-center font-semibold">
          {session?.user.name}
        </h3>
        <p className="text-sm text-center text-gray-400">
          {session?.user.email}
        </p>
        {user === null ||
          (user!.provider !== "google" && (
            <div className="mt-4 w-[400px] bg-white rounded-md py-4 px-8">
              <form className="space-y-6" onSubmit={onSubmitHandler}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      value={username}
                      onChange={onChangeHandler}
                      name="username"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Enter your name"
                      className="pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Old Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      value={oldPassword}
                      onChange={onChangeHandler}
                      id="password"
                      name="oldPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="********"
                      className="pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      New Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      value={password}
                      onChange={onChangeHandler}
                      name="password"
                      type={show ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="********"
                      className="pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                    />
                    {!show ? (
                      <span className="absolute right-3 top-3 ">
                        <FaEye
                          onClick={() => setShow(!show)}
                          className="cursor-pointer text-gray-600"
                          title="show password"
                        />
                      </span>
                    ) : (
                      <span className="absolute right-3 top-3 ">
                        <FaEyeSlash
                          onClick={() => setShow(!show)}
                          className="text-gray-600 cursor-pointer"
                          title="hide password"
                        />
                      </span>
                    )}
                  </div>
                </div>
                {loading ? (
                  <button
                    disabled
                    type="button"
                    className="w-full cursor-no-drop justify-center rounded-full pr-2 py-2 text-sm font-semibold leading-6 text-gray-600 shadow-sm bg-gray-200 flex items-center"
                  >
                    <ClipLoader color={"#52cca5"} loading={loading} size={18} />
                    <span className="pl-2">Please wait...</span>
                  </button>
                ) : (
                  <>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]"
                      >
                        Update
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          ))}
        <div className="mt-1 text-center">
          <button
            onClick={handleAccountDelete}
            type="button"
            className="px-0 mt-2 py-0 text-sm font-semibold leading-6 text-red-500 hover:text-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
