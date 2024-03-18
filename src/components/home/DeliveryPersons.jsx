"use client";
import React, { useEffect, useState } from "react";
import { useDeliveryBoyMutation } from "../../redux-store/api/admin/manageUserApi";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux-store/slice/useSlice";
import { FaAnglesRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeliveryPersons = ({ startDate, endDate, rate, setRateModal }) => {
  const [delivery, setDelivery] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  const [
    deliveryBoy,
    { data: deliveryData, isSuccess, error, isError, isLoading },
  ] = useDeliveryBoyMutation();

  useEffect(() => {
    if (startDate && endDate) {
      deliveryBoy({
        body: { START_DATE: startDate, END_DATE: endDate },
        token: access_token,
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (isSuccess) {
      setDelivery(deliveryData.data);
    }
    if (isError) {
      if (error.data) {
        toast.error(error.data.message);
      }
    }
  }, [isSuccess, isError]);

  const handleLinkClick = (id) => {
    window.open(`/dashboard/${id}`);
  };

  return (
    <>
      <section className="items-center lg:flex bg-gray-50  font-poppins">
        <div className="justify-center flex-1 min-w-[100%] max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="overflow-x-auto bg-white rounded shadow">
            <div className="">
              <div className="flex  justify-between items-center">
                <h2 className="px-6 py-4 pb-4 text-sm lg:text-xl font-medium  border-gray-300">
                  Delivery Persons
                </h2>

                <button
                  onClick={() => setRateModal(true)}
                  className=" mr-4 text-white bg-[#444262] px-4 py-2 rounded-md"
                >
                  Delivery Rate {rate?.rate}
                </button>
              </div>
              {isLoading ? (
                <Loading />
              ) : (
                <table className="w-full table-auto">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="text-xs text-left text-gray-500 border-b border-gray-200 ">
                      <th className="px-6 py-3 font-medium ">SR.No</th>
                      <th className="px-6 py-3 font-medium ">NAME</th>
                      <th className="px-6 py-3 font-medium ">PHONE NO</th>
                      <th className="px-6 py-3 font-medium ">TOTAL ORDERS</th>
                      <th className="px-6 py-3 font-medium ">DELIVERED</th>
                      <th className="px-6 py-3 font-medium ">PENDING</th>
                      <th className="px-6 py-3 font-medium ">
                        RECEIVED AMOUNT
                      </th>
                      <th className="px-6 py-3 font-medium ">MORE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {delivery &&
                      delivery?.map((data, index) => (
                        <tr
                          key={index}
                          onClick={() => {
                            dispatch(setUser(data));
                            // router.push(`/dashboard/${data._id}`);
                            handleLinkClick(data._id);
                          }}
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
                            {data.orders.totalOrders}
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.orders.deliveredOrders}
                          </td>
                          <td className="px-6 text-sm">
                            <span
                              className={` inline-block px-2 py-1 rounded-md `}
                            >
                              {data.orders.dispatchedOrders}
                            </span>
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            <span className="inline-block px-2 py-1 text-gray-700 ">
                              {data.pendingBalance}
                            </span>
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            <FaAnglesRight />
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
    </>
  );
};

export default DeliveryPersons;
