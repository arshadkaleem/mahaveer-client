"use client";
import React, { useRef } from "react";
import { useRegisterMutation } from "../../../../redux-store/api/admin/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function page() {
  const registerRef = useRef({
    userName: "",
    phoneNumber: "",
    role: "",
    password: "",
    address: "",
  });
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

  const registerNow = async (e) => {
    e.preventDefault();
    const res = await register(registerRef.current);
    if (res.data) {
      toast.success("user created successfully");
      router.push("/dashboard/all-users");
    } else {
      toast.error(res.error?.data?.message);
    }
  };
  return (
    <main className="py-10 px-10 bg-[#DFDEE9] min-h-screen">
      <div className="flex flex-col max-w-md mx-auto px-4 py-4 bg-white rounded-lg mt-14 shadow sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl">
          Create New User
        </div>
        <div className="p-5">
          <form action="#">
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  placeholder="User name"
                  onChange={(e) =>
                    (registerRef.current.userName = e.target.value)
                  }
                  className="rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#444262] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="number"
                  className=" rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#444262] focus:border-transparent"
                  placeholder="Phone number"
                  onChange={(e) =>
                    (registerRef.current.phoneNumber = e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <select
                  id="countries"
                  className="rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#444262] focus:border-transparent"
                  onClick={(e) => (registerRef.current.role = e.target.value)}
                >
                  <option selected>Select the role</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="Password"
                  className=" rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#444262] focus:border-transparent"
                  placeholder="Password"
                  onChange={(e) =>
                    (registerRef.current.password = e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <textarea
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#444262] focus:border-transparent"
                  type="text"
                  onChange={(e) =>
                    (registerRef.current.address = e.target.value)
                  }
                  rows="3"
                  cols="40"
                  placeholder="Address"
                ></textarea>
              </div>
            </div>
            <div className="flex w-full">
              <button
                onClick={registerNow}
                type="submit"
                className="py-2 px-4 bg-[#444262] focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                {isLoading ? "Please Wait..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default page;
