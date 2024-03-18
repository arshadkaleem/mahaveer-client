"use client";
import React, { useEffect, useState } from "react";
import { useOrderCountsMutation } from "../../redux-store/api/admin/order";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import toast from "react-hot-toast";

const OrderCounts = ({ startDate, endDate }) => {
  const [orderCounts, setOrderCount] = useState();

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  const [counts, { data, isSuccess, error, isError, isLoading }] =
    useOrderCountsMutation();

  useEffect(() => {
    if (startDate && endDate) {
      counts({
        body: { START_DATE: startDate, END_DATE: endDate },
        token: access_token,
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (isSuccess) {
      setOrderCount(data.data);
    }
    if (isError) {
      if (error.data) {
        toast.error(error.data.message);
      }
    }
  }, [isSuccess, isError]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-lg font-bold text-black px-10 mb-5">
          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Total Orders :{" "}
                <span className="ml-2">
                  {orderCounts?.totalOrders ? orderCounts.totalOrders : "-"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Assign Orders:{" "}
                <span className="ml-2">
                  {orderCounts?.assignOrders ? orderCounts.assignOrders : "-"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Pending Orders:{" "}
                <span className="ml-2">
                  {orderCounts?.pendingOrders ? orderCounts.pendingOrders : "-"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Dispatched Orders:{" "}
                <span className="ml-2">
                  {orderCounts?.dispatchedOrders
                    ? orderCounts.dispatchedOrders
                    : "-"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Delivered Orders:{" "}
                <span className="ml-2">
                  {orderCounts?.deliveredOrders
                    ? orderCounts.deliveredOrders
                    : "-"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Credit Orders:{" "}
                <span className="ml-2">
                  {orderCounts?.creditOrders ? orderCounts.creditOrders : "-"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Credit Approved:{" "}
                <span className="ml-2">
                  {orderCounts?.approveCreditOrders
                    ? orderCounts.approveCreditOrders
                    : "-"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between min-w-[256px] p-4 bg-[#DFDEE9] shadow-md rounded-lg">
            <div className="">
              <p className="text-sm ">
                Total Amount :{" "}
                <span className="ml-2">
                  {" "}
                  {orderCounts && orderCounts?.totalAmount
                    ? orderCounts?.totalAmount[0]?.totalAmount
                    : "-"}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCounts;
