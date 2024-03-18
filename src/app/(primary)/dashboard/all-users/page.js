"use client";
import React, { useEffect, useState } from "react";
import {
  useAllusersMutation,
  useGetAllAdminsMutation,
} from "../../../../redux-store/api/admin/manageUserApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../../redux-store/slice/registerdUserSlice";
import { useRouter } from "next/navigation";
import { setUser } from "../../../../redux-store/slice/useSlice";
import toast from "react-hot-toast";
import Loading from "../../../../components/Loading";
import { FaAnglesRight } from "react-icons/fa6";

function page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { allUsers: userData } = useSelector(
    (state) => state.persistedReducer.user
  );

  const [allusers, { isError, error, isSuccess, data, isLoading }] =
    useAllusersMutation();

  useEffect(() => {
    allusers({ body: "", token: access_token });
  }, []);

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  const [
    getAllAdmins,
    {
      isError: adminErr,
      error: adminError,
      isSuccess: adminSuccess,
      data: adminData,
      isLoading: isAdminLoading,
    },
  ] = useGetAllAdminsMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [userList, setUsreList] = useState("Delivery");

  useEffect(() => {
    if (adminErr) {
      if (adminError) {
        toast.error(adminError?.data?.message);
      }
    }
    if (adminSuccess) {
      dispatch(setUserData(adminData.data));
    }
  }, [adminErr, adminSuccess]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserData(data.data));
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);

  const set = async (data) => {
    dispatch(setUser(data));
    router.push(`/dashboard/all-users/${data._id}`);
  };

  return (
    <main className="lg:pt-16 pt-5 bg-gray-50 min-h-screen">
      <div className="flex lg:flex-row flex-col gap-5 px-10 lg:mt-10 max-w-6xl mx-auto">
        <button
          onClick={() => {
            setUsreList("Delivery");
            allusers();
          }}
          className={`flex-1 py-3 rounded-md border text-lg font-bold border-[#444262] text-[#444262] hover:text-white hover:bg-[#444262] ${
            userList === "Delivery"
              ? "bg-[#444262] text-white"
              : "bg-white text-[#444262]"
          }`}
        >
          Delivery Persons
        </button>
        <button
          onClick={() => {
            setUsreList("Admin");
            getAllAdmins({ body: "", token: access_token });
          }}
          className={`flex-1 py-3  rounded-md border text-lg font-bold border-[#444262] text-[#444262] hover:text-white hover:bg-[#444262] ${
            userList === "Admin"
              ? "bg-[#444262] text-white"
              : "bg-white text-[#444262]"
          }`}
        >
          Admins
        </button>
      </div>
      {userList === "Admin" ? (
        <>
          <section className="items-center lg:flex font-poppins">
            <div className="justify-center flex-1 px-4 py-4 lg:py-8 md:px-6">
              <div className="overflow-x-auto bg-white rounded shadow">
                <div className="">
                  <div className="flex  justify-between items-center">
                    <h2 className="px-6 py-4 pb-4 text-xl font-medium  border-gray-300">
                      Admins
                    </h2>
                  </div>

                  {isLoading ? (
                    <Loading />
                  ) : (
                    <table className="w-full table-auto">
                      <thead className="bg-gray-100 ">
                        <tr className="text-xs text-left text-gray-500 border-b border-gray-200 ">
                          <th className="px-6 py-3 font-medium ">SR.No</th>
                          <th className="flex items-center py-3 pl-6 font-medium">
                            <span>Name</span>
                          </th>
                          <th className="px-6 py-3 font-medium ">PHONE NO</th>
                          <th className="px-6 py-3 font-medium ">
                            ORDER ASSIGN
                          </th>
                          {/* <th className="px-6 py-3 font-medium ">
                          RECEIVED AMOUNT
                        </th> */}
                          <th className="px-6 py-3 font-medium ">MORE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.length > 0 &&
                          userData?.map(
                            (data, index) =>
                              data.role === "Admin" && (
                                <tr
                                  key={index}
                                  onClick={() => set(data)}
                                  className="border-b cursor-pointer border-gray-200 "
                                >
                                  <td className="px-6 text-sm font-medium ">
                                    {index + 1}
                                  </td>
                                  <td className="flex items-center px-6 py-3 text-sm font-medium">
                                    <p className="">{data.userName}</p>
                                  </td>
                                  <td className="px-6 text-sm font-medium ">
                                    {data.phoneNumber}
                                  </td>
                                  <td className="px-6 text-sm font-medium ">
                                    {data.totalOrderLength}
                                  </td>
                                  <td className="px-6 text-sm font-medium ">
                                    <FaAnglesRight />
                                  </td>
                                  {/* <td className="px-6 text-sm font-medium ">
                                  <span className="inline-block px-2 py-1 text-gray-700 ">
                                    -
                                  </span>
                                </td> */}
                                </tr>
                              )
                          )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="items-center lg:flex font-poppins">
            <div className="justify-center flex-1 px-4 py-4 lg:py-8 md:px-6">
              <div className="overflow-x-auto bg-white rounded shadow">
                <div className="">
                  <div className="flex  justify-between items-center">
                    <h2 className="px-6 py-4 pb-4 text-xl font-medium  border-gray-300">
                      Delivery Persons
                    </h2>
                  </div>

                  {isAdminLoading ? (
                    <Loading />
                  ) : (
                    <table className="w-full table-auto">
                      <thead className="bg-gray-100 ">
                        <tr className="text-xs text-left text-gray-500 border-b border-gray-200 ">
                          <th className="px-6 py-3 font-medium ">SR.No</th>
                          <th className="flex items-center py-3 font-medium ">
                            NAME
                          </th>
                          <th className="px-6 py-3 font-medium ">PHONE NO</th>
                          <th className="px-6 py-3 font-medium ">
                            TOTAL ORDERS
                          </th>
                          {/* <th className="px-6 py-3 font-medium ">TOTAL AMOUNT</th>
                        <th className="px-6 py-3 font-medium ">
                          PENDING AMOUNT
                        </th> */}
                          <th className="px-6 py-3 font-medium ">MORE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.length > 0 &&
                          userData?.map(
                            (data, index) =>
                              data.role === "Delivery" && (
                                <tr
                                  key={index}
                                  onClick={() => set(data)}
                                  className="border-b cursor-pointer border-gray-200 "
                                >
                                  <td className="px-6 text-sm font-medium ">
                                    {index + 1}
                                  </td>
                                  <td className="flex items-center px-6 py-3 text-sm font-medium">
                                    <p className="">{data.userName}</p>
                                  </td>
                                  <td className="px-6 text-sm font-medium ">
                                    {data.phoneNumber}
                                  </td>
                                  <td className="px-6 text-sm font-medium ">
                                    {data.totalOrderLength}
                                  </td>
                                  {/* <td className="px-6 text-sm font-medium ">-</td>
                                <td className="px-6 text-sm font-medium ">-</td> */}
                                  <td className="px-6 text-sm font-medium ">
                                    <FaAnglesRight />
                                  </td>
                                </tr>
                              )
                          )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="modal-container">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-center text-[#444262]">
                Collect Mony
              </h2>
              <p className="text-slate-600 ">
                Are you sure you want to approv of Amount credit.
              </p>

              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="flex bg-[#444262] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#FF7754]">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white "
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex bg-[#444262] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#FF7754]">
                  <button
                    // onClick={
                    //   approveRequiest
                    // }
                    className="text-white "
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default page;
