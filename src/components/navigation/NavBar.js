"use client";
import React, { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../redux-store/slice/tokenSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { emptyOders } from "@/redux-store/slice/orderSlice";
import { emptyUser } from "@/redux-store/slice/registerdUserSlice";
import { emptyAdmin } from "@/redux-store/slice/useSlice";

function NavBar() {
  const [showModel, setShowModel] = useState(false);
  const [open, setOpen] = useState(false);

  const { admin } = useSelector((state) => state.persistedReducer);

  const dispatch = useDispatch();

  const router = useRouter();

  const logout = async () => {
    dispatch(clearToken());
    dispatch(emptyOders());
    dispatch(emptyUser());
    dispatch(emptyAdmin());
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <div className="hidden px-4 w-screen py-1 bg-white  fixed top-0 left-0 z-50 lg:flex justify-between shadow-lg">
        <div className="flex items-center py-1 ">
          <div className="flex items-center py-1 ">
            <TbTruckDelivery className="text-5xl mx-4 text-[#444262]" />
          </div>
          <div className="flex  items-center ">
            <Link
              href="/dashboard"
              className="font-sans  px-2 hover:scale-105 duration-500 text-[#444262] font-bold"
            >
              HOME
            </Link>
            <Link
              href="/dashboard/all-users"
              className="font-sans  px-2 hover:scale-105 duration-500 text-[#444262] font-bold"
            >
              EMPLOYEES
            </Link>
            <Link
              href="/dashboard/create-user"
              className="font-sans  px-2 hover:scale-105 duration-500 text-[#444262] font-bold"
            >
              REGISTER
            </Link>
            <Link
              href="/dashboard/credit"
              className="font-sans  px-2 hover:scale-105 duration-500 text-[#444262] font-bold"
            >
              CREDIT
            </Link>
            <Link
              href="/dashboard/transaction"
              className="font-sans  px-2 hover:scale-105 duration-500 text-[#444262] font-bold"
            >
              TRANSACTION
            </Link>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center">
          <button className="inline-flex items-center p-2 rounded-lg">
            <span className="h-10 w-10 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
              <img
                src={admin.admin.avatar}
                alt="user profile photo"
                className="h-full w-full object-cover"
              />
            </span>
            <div className="hidden lg:flex lg:flex-col lg:items-end lg:leading-tight">
              <span className="font-semibold">{admin.admin.userName}</span>
            </div>
          </button>
          <div className="border-l pl-3 ml-3 space-x-1">
            <button
              onClick={() => {
                setShowModel(true);
              }}
              className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
            >
              <BiLogIn className="text-3xl text-[#444262]" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:hidden block bg-[#444262] py-2">
        <div className="flex justify-between items-center mx-5">
          <div
            className="text-2xl text-white cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <IoClose className="text-2xl" />
            ) : (
              <IoMenuSharp className="text-2xl" />
            )}
          </div>
        </div>
        <div
          className={`lg:flex lg:items-center lg:pb-0 pb-5 absolute lg:static z-10 bg-[#444262] lg:z-auto  left-0 w-full lg:w-auto lg:pl-0 lg:pr-0 pl-7 pr-7 transition-all duration-500 ease-in ${
            open ? `top-10 opacity-100` : `top-[-500px]`
          } `}
        >
          <ul className="flex border-t-2 border-white flex-col justify-between  font-semibold text-sm">
            <Link
              onClick={() => setOpen(false)}
              href="/dashboard"
              className="font-sans py-2  px-2  text-white font-bold"
            >
              HOME
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/dashboard/all-users"
              className="font-sans py-2  px-2  text-white font-bold"
            >
              EMPLOYEES
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/dashboard/create-user"
              className="font-sans py-2  px-2  text-white font-bold"
            >
              REGISTER
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/dashboard/credit"
              className="font-sans py-2  px-2  text-white font-bold"
            >
              CREDIT
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/dashboard/transaction"
              className="font-sans py-2  px-2  text-white font-bold"
            >
              TRANSACTION
            </Link>
          </ul>
        </div>
      </div>

      {showModel && (
        <div className="overflow-auto fixed sm:inset-0 lg:inset-0 pt-4 w-screen bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center p-10 z-40">
          <div className="relative mx-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl  sm:my-8 sm:max-w-lg sm:w-full">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full  sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="w-5 h-5 text-red-600"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Are you sure you would like to logout out of your account?
                  </h2>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => logout()}
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-red-500 border border-transparent border-red-600 rounded-md shadow-sm bg-red-50 hover:text-gray-100 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModel(false)}
                className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
