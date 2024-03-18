"use client";

import { useGetUserTransactionsMutation } from "@/redux-store/api/admin/transactionApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DeliveryPersonTransaction = ({ startDate, endDate }) => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("all");

  const {
    token: {
      token: { access_token },
    },
    admin: { userinfo },
  } = useSelector((state) => state.persistedReducer);

  const [
    userTransaction,
    {
      isError: isTransactionError,
      error: transactionError,
      isSuccess: isTransactionSuccess,
      data: transactionData,
      isLoading: isTransactionLoading,
    },
  ] = useGetUserTransactionsMutation();

  useEffect(() => {
    if (isTransactionError) {
      if (transactionError) {
        toast.error(transactionError?.data?.message);
      }
    }
  }, [isTransactionError]);

  useEffect(() => {
    if (isTransactionSuccess) {
      setTransactionHistory(transactionData.data);
    }
  }, [isTransactionSuccess]);

  useEffect(() => {
    if (startDate && endDate) {
      userTransaction({
        body: {
          id: userinfo._id,
          role: userinfo.role,
          status: paymentStatus,
          START_DATE: startDate,
          END_DATE: endDate,
        },
        token: access_token,
      });
    }
  }, [startDate, endDate, paymentStatus]);

  return (
    <section className="items-center lg:flex flex-col font-poppins">
      <div className="justify-center flex-1 min-w-[100%] max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
          <div className="">
            <div className="flex  justify-between items-center">
              <h2 className="px-6 py-4 pb-4 text-xl font-medium  border-gray-300 dark:border-gray-700 dark:text-gray-400">
                Transactions
              </h2>

              <div className="flex items-center">
                <button
                  onClick={() => setPaymentStatus("all")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-l rounded-l-md hover:bg-gray-100"
                >
                  All
                </button>
                <button
                  onClick={() => setPaymentStatus("cash")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                >
                  Cash
                </button>
                <button
                  onClick={() => setPaymentStatus("UPI")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                >
                  UPI
                </button>
                <button
                  onClick={() => setPaymentStatus("card")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                >
                  Card
                </button>
                <button
                  onClick={() => setPaymentStatus("credit")}
                  type="button"
                  className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-r rounded-r-md hover:bg-gray-100"
                >
                  Credit
                </button>
              </div>
            </div>

            <table className="w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                  <th className="flex items-center py-3 pl-6 font-medium dark:text-gray-400">
                    <span>NAME</span>
                  </th>
                  <th className="px-6 py-3 font-medium dark:text-gray-400">
                    TYPE
                  </th>

                  <th className="px-6 py-3 font-medium dark:text-gray-400">
                    PAYMENT METHOD
                  </th>
                  <th className="px-6 py-3 font-medium dark:text-gray-400">
                    DATE
                  </th>
                  <th className="px-6 py-3 font-medium dark:text-gray-400">
                    STATUS
                  </th>
                  <th className="px-6 py-3 font-medium dark:text-gray-400">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.length > 0 &&
                  transactionHistory.map((data, index) => (
                    <tr
                      // onClick={() => router.push(`/orders/${data._id}`)}
                      key={index}
                      className="border-b cursor-pointer border-gray-200 dark:border-gray-800"
                    >
                      <td className="flex items-center px-6 py-5 text-sm font-medium">
                        <p className="dark:text-gray-400">
                          {data.order && data.orderId?.name}
                          {!data.recivedBySuperAdmin &&
                            !data.order &&
                            data.userId.userName}
                          {data.recivedBySuperAdmin &&
                            data.superAdmin?.userName}
                        </p>
                      </td>
                      <td className="px-6 text-sm font-medium dark:text-gray-400">
                        {data.order && "Customer"}
                        {data.recivedBySuperAdmin && "Super Admin"}
                        {!data.order && !data.recivedBySuperAdmin && "Admin"}
                      </td>
                      <td className="px-6 text-sm font-medium dark:text-gray-400">
                        {data.order ? data.paymentMethod : "-"}
                      </td>

                      <td className="px-6 text-sm font-medium dark:text-gray-400">
                        {new Date(data.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 text-sm">
                        <span
                          className={`${
                            userinfo.role === "Delivery" && data.order
                              ? "bg-green-100 text-green-700"
                              : userinfo.role === "Delivery"
                              ? "text-orange-700 bg-orange-100"
                              : userinfo.role === "Admin" &&
                                data.deliveryBoyId?.userName
                              ? "bg-green-100 text-green-700"
                              : "text-orange-700 bg-orange-100"
                          }
                        
                        inline-block px-2 py-1 rounded-md dark:bg-gray-800 dark:text-gray-400`}
                        >
                          {userinfo.role === "Delivery" && data.order
                            ? "Recived"
                            : userinfo.role === "Delivery"
                            ? "Paid"
                            : userinfo.role === "Admin" &&
                              data.deliveryBoyId?.userName
                            ? "Recived"
                            : "Paid"}
                        </span>
                      </td>
                      <td className="px-6 text-sm font-medium dark:text-gray-400">
                        {data.amountRecived}
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

export default DeliveryPersonTransaction;
