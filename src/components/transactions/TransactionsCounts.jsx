"use client";

import { useGetAllTransactionAmountMutation } from "@/redux-store/api/admin/transactionApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const TransactionsCounts = ({ startDate, endDate }) => {
  const [getCounts, setCounts] = useState();

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  useEffect(() => {
    if (startDate && endDate) {
      getAllTransactionAmount({
        body: {
          START_DATE: startDate,
          END_DATE: endDate,
        },
        token: access_token,
      });
    }
  }, [startDate, endDate]);

  const [
    getAllTransactionAmount,
    { data, isSuccess, error, isError, isLoading },
  ] = useGetAllTransactionAmountMutation();

  useEffect(() => {
    if (isSuccess) {
      setCounts(data);
    }
    if (isError) {
      if (error) {
        toast.error(error.data.message);
      }
    }
  }, [isSuccess, isError]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white grid 2xl:grid-cols-5 md:grid-cols-4 gap-5 text-lg font-bold text-black px-10 py-5">
          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Total Amount :{" "}
                <span className="ml-2">
                  {getCounts && getCounts.allAmount.length > 0
                    ? getCounts.allAmount[0].amountRecived
                    : 0}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Cash Amount:{" "}
                <span className="ml-2">
                  {getCounts && getCounts.totalAmountCash.length > 0
                    ? getCounts.totalAmountCash[0].amountRecived
                    : 0}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Card Amount:{" "}
                <span className="ml-2">
                  {getCounts && getCounts.totalAmountCard.length > 0
                    ? getCounts.totalAmountCard[0].amountRecived
                    : 0}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                UPI Amount:{" "}
                <span className="ml-2">
                  {getCounts && getCounts.totalAmountUPI.length > 0
                    ? getCounts.totalAmountUPI[0].amountRecived
                    : 0}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Credit Amount:{" "}
                <span className="ml-2">
                  {getCounts && getCounts.totalAmountCredit.length > 0
                    ? getCounts.totalAmountCredit[0].amountCredit
                    : 0}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionsCounts;
