"use client";

import {
  useFindByUserIdMutation,
  useSearchMutation,
} from "@/redux-store/api/admin/order";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaAnglesRight } from "react-icons/fa6";

const DeliveryPersonOders = ({ startDate, endDate, user }) => {
  const [getSearch, setSearch] = useState();
  const [userOrder, setUserOrder] = useState([]);
  const [status, setStatus] = useState("all");
  const [skip, setSkip] = useState(0);

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  const [findOrderByUserIdApi, { isError, error, isSuccess, data, isLoading }] =
    useFindByUserIdMutation();

  const [
    search,
    {
      data: searchData,
      isSuccess: searchIsSucess,
      isError: searchErr,
      error: searchError,
      isLoading: searchLoding,
    },
  ] = useSearchMutation();

  useEffect(() => {
    if (searchIsSucess) {
      setUserOrder(searchData.data);
    }
    if (searchErr) {
      if (searchError.data) {
        toast.error(searchError.data.message);
      }
    }
  }, [searchIsSucess, searchErr]);

  useEffect(() => {
    if (isSuccess) {
      setUserOrder(data.data);
    }
    if (isError) {
      if (error.data) {
        toast.error(error?.data?.message);
      }
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (startDate && endDate && status != "") {
      findOrderByUserIdApi({
        body: {
          skip,
          START_DATE: startDate,
          END_DATE: endDate,
          userId: user,
          status,
        },
        token: access_token,
      });
    }
  }, [skip, status, startDate, endDate, user]);

  return (
    <section className="items-center lg:flex flex-col font-poppins">
      <div className="justify-center flex-1 min-w-[100%] max-w-6xl px-4 pt-4 mx-auto lg:pt-8 md:px-6">
        <div className="overflow-x-auto bg-white rounded shadow">
          <div className="">
            <div className="flex  justify-between items-center">
              <h2 className="px-6 py-4 pb-4 text-xl font-medium  border-gray-300">
                {status === "all"
                  ? "All"
                  : status === "delivered"
                  ? "Delivered"
                  : status === "credit"
                  ? "Credit"
                  : status === "Cash"
                  ? "Cash"
                  : status === "UPI"
                  ? "UPI"
                  : status === "Card"
                  ? "Card"
                  : ""}
                Orders
              </h2>

              <div className="flex items-center">
                <button
                  onClick={() => setStatus("all")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-l rounded-l-md hover:bg-gray-100"
                >
                  All
                </button>
                <button
                  onClick={() => setStatus("delivered")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                >
                  Delivered
                </button>
                <button
                  onClick={() => setStatus("Cash")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                >
                  Cash
                </button>
                <button
                  onClick={() => setStatus("UPI")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                >
                  UPI
                </button>
                <button
                  onClick={() => setStatus("Card")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                >
                  Card
                </button>
                <button
                  onClick={() => setStatus("credit")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-r rounded-r-md hover:bg-gray-100"
                >
                  Credit
                </button>
              </div>

              <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                <div className=" relative ">
                  <input
                    type="text"
                    value={getSearch}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Search Order"
                  />
                </div>
                <button
                  onClick={() => {
                    setStatus("");
                    search({
                      body: {
                        searchInput: getSearch,
                        userId: user,
                      },
                      token: access_token,
                    });
                  }}
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-[#444262] rounded-lg shadow-md hover:bg-[#383652]"
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>

            <table className="w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                  <th className="flex items-center py-3 pl-6 font-medium ">
                    <span>BILL NO</span>
                  </th>
                  <th className="px-6 py-3 font-medium ">NAME</th>
                  <th className="px-6 py-3 font-medium ">DATE</th>
                  <th className="px-6 py-3 font-medium ">STATUS</th>
                  <th className="px-6 py-3 font-medium ">CREDIT</th>
                  <th className="px-6 py-3 font-medium ">DISTANCE</th>
                  <th className="px-6 py-3 font-medium ">COST</th>
                  <th className="px-6 py-3 uppercase font-medium ">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 font-medium ">MORE</th>
                </tr>
              </thead>
              <tbody>
                {userOrder.length > 0 &&
                  userOrder.map((data, index) => (
                    <tr
                      onClick={() =>
                        router.push(`/dashboard/orders/${data._id}`)
                      }
                      key={index}
                      className="border-b cursor-pointer border-gray-200 dark:border-gray-800"
                    >
                      <td className="flex items-center px-6 py-5 text-sm font-medium">
                        <p className="">{data.billNo}</p>
                      </td>
                      <td className="px-6 text-sm font-medium ">{data.name}</td>
                      <td className="px-6 text-sm font-medium ">
                        {new Date(data.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 text-sm">
                        <span
                          className={`${
                            data.delivered
                              ? "bg-green-100 text-green-700"
                              : data.isCanceled
                              ? "bg-red-100 text-red-700"
                              : data.dispatched
                              ? "bg-blue-100 text-blue-700"
                              : data.refuesdToAccept
                              ? "bg-orange-200 text-orange-600"
                              : "text-orange-700 bg-orange-100"
                          } inline-block px-2 py-1 rounded-md dark:bg-gray-800 `}
                        >
                          {data.delivered
                            ? "Deliverd"
                            : data.isCanceled
                            ? "cancelled"
                            : data.refuesdToAccept
                            ? "Refuse To Accept"
                            : data.dispatched
                            ? "Dispatched"
                            : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 text-sm">
                        <span
                          className={`${
                            data.credit && data.creditApproved
                              ? "bg-green-100 text-green-700"
                              : data.credit && !data.creditApproved
                              ? "bg-red-100 text-red-700"
                              : ""
                          } inline-block px-2 py-1 rounded-md dark:bg-gray-800 `}
                        >
                          {data.credit && data.creditApproved
                            ? "Approved"
                            : data.credit && !data.creditApproved
                            ? "Pending "
                            : "-"}
                        </span>
                      </td>
                      <td className="px-6 text-sm font-medium ">
                        {data.distance ? data.distance : "-"}
                      </td>
                      <td className="px-6 text-sm font-medium ">
                        <span className="inline-block px-2 py-1 text-gray-700 ">
                          {data.distance ? data.distance * 10 : "-"}
                        </span>
                      </td>
                      <td className="px-6 text-sm font-medium ">
                        {data.paymentMethod ? data.paymentMethod : "-"}
                      </td>
                      <td className="px-6 text-sm font-medium ">
                        <FaAnglesRight />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryPersonOders;
