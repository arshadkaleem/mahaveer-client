"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCollectAmountMutation,
  useCollectCreditMutation,
} from "../../redux-store/api/admin/transactionApi";
import toast from "react-hot-toast";

export default function CollectAmount({
  setShowAmountCollectModal,
  customer,
  cutomerDetails,
}) {
  const [amount, setAmount] = useState();

  const {
    token: {
      token: { access_token },
    },
    admin: { userinfo },
  } = useSelector((state) => state.persistedReducer);

  const [collect] = useCollectAmountMutation();

  const [collectCredit, { data, isLoading, isSucess, isError, error }] =
    useCollectCreditMutation();

  useEffect(() => {
    if (isSucess) {
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSucess, isError]);

  const collectAmount = (amount) => {
    if (userinfo.role === "Delivery") {
      collectCredit({
        body: {
          customerId: cutomerDetails.customerId,
          amountRecived: amount,
        },
        token: access_token,
      });
    } else if (userinfo.role === "Delivery") {
      collect({
        body: {
          deliveryBoyId: userinfo._id,
          amountRecived: amount,
          recivedBySuperAdmin: true,
        },
        token: access_token,
      });
    } else {
      collect({
        body: {
          amountRecived: amount,
          adminId: userinfo._id,
          recivedBySuperAdmin: true,
        },
        token: access_token,
      });
    }
  };
  return (
    <>
      <div className="fixed border-2 backdrop-blur-md flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => {
                setShowAmountCollectModal(false);
              }}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Collect The Amount
              </h3>
              <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
                {" "}
                {customer ? userinfo.customer : userinfo.userName} Account
                Balance is{" "}
                <span className="text-green-600 bg-green-200 rounded-md px-2 py-1">
                  {" "}
                  {customer
                    ? userinfo?.creditAmount
                    : userinfo?.pendingBalance}{" "}
                  ₹{" "}
                </span>
              </h3>
              <div className="space-y-6">
                <div>
                  <label
                    htmFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Amount
                  </label>
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    name="number"
                    id="amount"
                    max={
                      customer
                        ? userinfo?.creditAmount
                        : userinfo?.pendingBalance
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="₹ 000"
                    required
                  />
                </div>
                <button
                  onClick={() => {
                    collectAmount(amount);
                    setShowAmountCollectModal(false);
                  }}
                  type="submit"
                  className="w-full text-white bg-[#444262]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
                >
                  Collect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
