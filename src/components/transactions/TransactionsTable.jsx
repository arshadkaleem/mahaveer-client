"use client";

import { useFindTransactionsMutation } from "@/redux-store/api/admin/transactionApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkipButtons from "../SkipButton";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const TransactionsTable = ({
  startDate,
  endDate,
  setPagination,
  pagination,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState();

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  const [findTransactions, { isError, error, data, isSuccess, isLoading }] =
    useFindTransactionsMutation();

  useEffect(() => {
    if (startDate && endDate) {
      findTransactions({
        body: {
          START_DATE: startDate,
          END_DATE: endDate,
          paymentMethod,
          page: pagination.currentPage,
        },
        token: access_token,
      });
    }
  }, [paymentMethod, startDate, endDate, pagination.currentPage]);

  useEffect(() => {
    if (isSuccess) {
      setTransactions(data.data);
      setPagination({
        currentPage: data.pageInfo.currentPage,
        totalEntries: data.pageInfo.totalEntries,
        currentPageStart: data.pageInfo.currentPageStart,
        currentPageEnd: data.pageInfo.currentPageEnd,
        itemsPerPage: data.pageInfo.perPage,
      });
    }
    if (isError) {
      if (error.data) {
        toast.error(error.data.message);
      }
    }
  }, [isSuccess, isError]);

  const handleNextPage = () => {
    if (pagination.currentPage < Math.ceil(pagination.totalEntries / 10)) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const changeStatusFuntion = (statusData) => {
    setPaymentMethod(statusData);
    setPagination({
      currentPage: 1,
      totalEntries: 0,
      currentPageStart: 0,
      currentPageEnd: 0,
      itemsPerPage: 0,
    });
  };

  const srNo = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;

  return (
    <div className="bg-gray-50">
      <section className="items-center flex font-poppins pt-4">
        <div className="justify-center flex-1 min-w-[100%] max-w-6xl px-4 pt-4 mx-auto lg:pt-8 md:px-6">
          <div className="overflow-x-auto bg-white rounded shadow">
            <div className="">
              <div className="flex  justify-between items-center px-6">
                <h2 className="py-4 pb-4 text-xl font-medium border-gray-300">
                  Transactions
                </h2>

                <div className="flex items-center">
                  <button
                    onClick={() => changeStatusFuntion()}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-l rounded-l-md hover:bg-gray-100"
                  >
                    All
                  </button>
                  <button
                    onClick={() => changeStatusFuntion("Cash")}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                  >
                    Cash
                  </button>
                  <button
                    onClick={() => changeStatusFuntion("UPI")}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                  >
                    UPI
                  </button>
                  <button
                    onClick={() => changeStatusFuntion("Card")}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                  >
                    Card
                  </button>
                  <button
                    onClick={() => changeStatusFuntion("Credit")}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-r rounded-r-md hover:bg-gray-100"
                  >
                    Credit
                  </button>
                </div>
              </div>

              {isLoading ? (
                <Loading />
              ) : (
                <table className="w-full table-auto">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="text-xs text-left text-gray-500 border-b border-gray-200 ">
                      <th className="px-6 py-3 font-medium ">SR.No</th>
                      <th className="flex items-center py-3 pl-6 font-medium ">
                        NAME
                      </th>
                      <th className="px-6 py-3 font-medium ">PHONE NO</th>
                      <th className="px-6 py-3 font-medium ">RECIVED BY</th>
                      <th className="px-6 py-3 font-medium ">DATE</th>
                      <th className="px-6 py-3 font-medium ">METHOD</th>
                      <th className="px-6 py-3 font-medium ">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 &&
                      transactions?.map((data, index) => (
                        <tr
                          key={index}
                          className="border-b cursor-pointer border-gray-200 "
                        >
                          <td className="px-6 text-sm font-medium">
                            <p className="">{srNo + index}</p>
                          </td>
                          <td className="flex items-center px-6 py-3 text-sm font-medium">
                            <p className="">
                              {data.order
                                ? data.orderId?.name
                                : data.recivedBySuperAdmin && data.deliveryBoyId
                                ? data.deliveryBoyId?.userName
                                : data.userId && data.recivedBySuperAdmin
                                ? data.userId?.userName
                                : data.deliveryBoyId?.userName}
                              <span
                                className={`${
                                  data.order
                                    ? "text-purple-700 bg-purple-100"
                                    : data.recivedBySuperAdmin &&
                                      data.deliveryBoyId
                                    ? "text-orange-700 bg-orange-100"
                                    : data.userId && data.recivedBySuperAdmin
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-orange-700 bg-orange-100"
                                } inline-block px-1 py-1 ml-1 rounded-md text-xs`}
                              >
                                {data.order
                                  ? "Customer"
                                  : data.recivedBySuperAdmin &&
                                    data.deliveryBoyId
                                  ? "Delivery"
                                  : data.userId && data.recivedBySuperAdmin
                                  ? "Admin"
                                  : "Delivery"}
                              </span>
                            </p>
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.order
                              ? data.orderId?.mobile
                              : data.recivedBySuperAdmin && data.deliveryBoyId
                              ? data.deliveryBoyId?.phoneNumber
                              : data.userId && data.recivedBySuperAdmin
                              ? data.userId?.phoneNumber
                              : data.deliveryBoyId?.phoneNumber}
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.order
                              ? data.deliveryBoyId?.userName
                              : data.recivedBySuperAdmin && data.deliveryBoyId
                              ? data.superAdmin?.userName
                              : data.userId && data.recivedBySuperAdmin
                              ? data.superAdmin?.userName
                              : data.userId?.userName}
                            <span
                              className={`${
                                data.order
                                  ? "text-orange-700 bg-orange-100"
                                  : data.recivedBySuperAdmin &&
                                    data.deliveryBoyId
                                  ? "bg-green-100 text-green-700"
                                  : data.userId && data.recivedBySuperAdmin
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              } inline-block px-1 py-1 ml-1 rounded-md text-xs`}
                            >
                              {data.order
                                ? "Delivery"
                                : data.recivedBySuperAdmin && data.deliveryBoyId
                                ? "Super Admin"
                                : data.userId && data.recivedBySuperAdmin
                                ? "Super Admin"
                                : "Admin"}
                            </span>
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {new Date(data.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.order ? data.paymentMethod : "Cash"}
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.amountRecived}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="w-full flex py-3 items-center justify-end px-4 md:px-6">
        <SkipButtons
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;
