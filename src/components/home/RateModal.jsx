"use client";
import React, { useEffect, useState } from "react";
import { useDeliveryRatesMutation } from "../../redux-store/api/admin/transactionApi";
import { useSelector } from "react-redux";

export default function RateModal({ setRateModal }) {
  const [rate, setRate] = useState();

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  const [setDeliveryRatesApi, { data, isSuccess, isLoading, error, isError }] =
    useDeliveryRatesMutation();

  useEffect(() => {
    if (isSuccess) {
      setRateModal(false);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="fixed backdrop-blur-md flex justify-center items-center top-0 left-0 right-0 z-50  w-full  overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => {
                setRateModal(false);
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
                Set Delivery Rate
              </h3>
              <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
                {" "}
                Please enter Delivery rates{" "}
                <span className="text-green-600 bg-green-200 rounded-md px-2 py-1">
                  {" "}
                  ₹{" "}
                </span>
              </h3>
              <div className="space-y-6">
                <div>
                  <label
                    htmFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Rate
                  </label>
                  <input
                    onChange={(e) => setRate(e.target.value)}
                    type="number"
                    name="number"
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="₹ 000"
                    required
                  />
                </div>
                <button
                  onClick={() => {
                    setDeliveryRatesApi({
                      body: { rate },
                      token: access_token,
                    });
                  }}
                  type="submit"
                  className="w-full text-white bg-[#444262]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
                >
                  Set Delivry Rate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
