import React, { ChangeEvent, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";
import userDp from "@/public/images/user.jpg";
import { useEdgeStore } from "@/lib/edgestore/edgestore";
import { toast } from "react-toastify";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const { edgestore } = useEdgeStore();
  const [fileLoading, setFileLoading] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/account/login", { scroll: false });
    }
  }, [router]);

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setFileLoading(true);
    try {
      const file = event.target.files?.[0];
      if (file) {
        const res = await edgestore.publicImages.upload({
          file,
          onProgressChange: (progress: number) => {
            console.log(progress);
          },
        });

        console.log("FILE UPLOAD =>", res);
        const updatePictureRes = await axios.put("/api/account/user", {
          pictureUrl: res.url,
          userEmail: session?.user.email,
        });
      } else {
        toast.error("There is no file to upload!");
      }
    } catch (error: any) {
      setFileLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="">
        <div className="mx-auto w-20 text-center">
          <div className="relative w-20">
            <Image
              src={userDp.src}
              height={80}
              width={80}
              priority
              className="w-34 h-34 rounded-full absolute top-[1px] left-[1px]"
              // src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="profile picture"
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
        <h3 className="mt-[15px] text-center font-semibold">Daniel Agyie</h3>
        <p className="text-sm text-center text-gray-400">danny33@gmail.com</p>
        <div className="mt-5 w-[400px] bg-white rounded-md py-4 px-8">
          <form className="space-y-6">
            {status === "loading" ? (
              <div className="text-center my-4">
                <ClipLoader
                  color={"#52cca5"}
                  loading={status === "loading"}
                  size={48}
                />
                <p className="mt-2 text-md font-semibold leading-6 text-[#52cca5] ">
                  Please wait...
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      // onChange={onChangeHandler}

                      name="name"
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
                      // onChange={onChangeHandler}
                      id="password"
                      name="password"
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
                  <div className="mt-2">
                    <input
                      // onChange={onChangeHandler}

                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="********"
                      className="pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {false ? (
                  <button
                    disabled
                    type="button"
                    className="w-full cursor-no-drop justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-gray-600 shadow-sm bg-gray-200 flex items-center"
                  >
                    <ClipLoader color={"#52cca5"} loading={true} size={18} />
                    <span className="pl-2">Please wait...</span>
                  </button>
                ) : (
                  <>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="px-0 my-2 py-0 text-sm font-semibold leading-6 text-red-500 hover:text-red-600"
                      >
                        Delete Account
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
