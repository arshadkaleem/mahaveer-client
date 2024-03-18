"use client";
import React, { useEffect, useRef } from "react";

import { useAdminMutation } from "../redux-store/api/admin/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "../redux-store/slice/tokenSlice";
import { setadmin } from "../redux-store/slice/useSlice";

import toast from "react-hot-toast";

function page() {
  const loginRef = useRef({
    phoneNumber: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const [admin, { data, isSuccess, isError, isLoading, error }] =
    useAdminMutation();

  useEffect(() => {
    if (isError) {
      toast.error(
        error.data.message ? error.data.message : "Internal server erorr"
      );
    }
    if (isSuccess) {
      router.push("/dashboard");
      dispatch(
        setToken({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })
      );
      dispatch(setadmin(data.data));
    }
  }, [isSuccess, isError]);

  const loginNow = (e) => {
    e.preventDefault();
    admin(loginRef.current);
  };

  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center">Welcome.</p>
          <form className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="flex relative ">
                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-phone"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />{" "}
                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />{" "}
                  </svg>
                </span>
                <input
                  type="number"
                  className=" appearance-none flex-1 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#444262] focus:border-transparent"
                  placeholder="Phone number"
                  onChange={(e) =>
                    (loginRef.current.phoneNumber = e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col pt-4 mb-12">
              <div className="flex relative ">
                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#444262] focus:border-transparent"
                  placeholder="Password"
                  onChange={(e) => (loginRef.current.password = e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={loginNow}
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-[#444262] shadow-md hover:text-[#444262] hover:bg-white border-[#444262] border"
            >
              <span className="w-full">
                {isLoading ? "Please Wait..." : "Login"}
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 shadow-2xl">
        <img
          className="hidden object-cover w-full h-screen md:block"
          src="/assets/login.svg"
        />
      </div>
    </div>
  );
}

export default page;
