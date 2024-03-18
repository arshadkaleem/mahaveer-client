"use client";
import React, { useEffect, useState } from "react";
import { useFindByUserIdMutation } from "../../../../redux-store/api/admin/order";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Image from "next/image";
import CollectAmount from "../../../../components/employees/CollectAmount";
import { useCollectAmountMutation } from "../../../../redux-store/api/admin/transactionApi";
import { useRouter } from "next/navigation";
import { setUser } from "../../../../redux-store/slice/useSlice";

function page() {
  const currentDate = new Date();
  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0); // Set to 12:00:00 AM
  const endOfDay = new Date(currentDate);

  const dispatch = useDispatch();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [userOrder, setUserOrder] = useState([]);
  const [findOrder, setFindOrder] = useState("allorders");
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(endOfDay);
  const [status, setStatus] = useState("all");
  const [showAmountCollectModal, setShowAmountCollectModal] = useState(false);

  const [findOrderByUserIdApi, { isError, error, isSuccess, data, isLoading }] =
    useFindByUserIdMutation();

  const {
    token: {
      token: { access_token },
    },
    admin: { userinfo },
  } = useSelector((state) => state.persistedReducer);

  const filteredData = userOrder.filter((item) =>
    item.billNo.toLowerCase().includes(search?.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, [findOrder, status]);

  useEffect(() => {
    if (isSuccess) {
      setUserOrder(data.data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError]);

  const fetchData = () => {
    findOrderByUserIdApi({
      body: {
        userId: userinfo._id,
        START_DATE: startDate,
        END_DATE: endDate,
        status,
      },
      token: access_token,
    });
  };

  const [collect] = useCollectAmountMutation();

  const collectAmount = async (amount) => {
    let res;
    if (userinfo.role === "Delivery") {
      res = await collect({
        body: {
          deliveryBoyId: userinfo._id,
          amountRecived: amount,
          recivedBySuperAdmin: true,
        },
        token: access_token,
      });
      if (res.data) {
        dispatch(setUser(res.data.data));
      }
    } else {
      res = await collect({
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
    <main className="lg:pt-16 pt-5 px-5 bg-gray-50 min-h-screen">
      <div className="">
        <div className="flex flex-col h-[600px] lg:h-auto p-4 mt-8 bg-white shadow-md rounded-lg">
          <div className="flex lg:flex-row flex-col items-start gap-4">
            <Image
              src={userinfo?.avatar}
              alt="user"
              width={800}
              height={800}
              className="rounded-lg w-28 h-28"
            />

            <div className="grid lg:grid-cols-2 gap-5">
              <p className="text-xl font-medium text-gray-800 ">
                Name: {userinfo?.userName}
              </p>
              <p className="text-xl font-medium text-gray-800 ">
                Phone Number: {userinfo?.phoneNumber}
              </p>
              <p className="text-xl font-medium text-gray-800 ">
                Address: {userinfo?.address}
              </p>
              <p className="text-xl font-medium text-gray-800 ">
                joined Date:{" "}
                {new Date(userinfo?.createdAt).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="text-xl font-medium text-gray-800 ">
                Amount: {userinfo?.pendingBalance}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={() => setShowAmountCollectModal(true)}
              type="button"
              className="lg:w-1/4 w-full px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-green-300"
            >
              Collect Amount
            </button>
          </div>
        </div>

        <section className="items-center mt-4 lg:flex bg-gray-50  font-poppins">
          <div className="justify-center flex-1 min-w-[100%] max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="overflow-x-auto bg-white rounded shadow">
              <div className="">
                <div className="flex  justify-between items-center">
                  <h2 className="px-6 py-4 pb-4 text-xl font-medium  border-gray-300 dark:border-gray-700 ">
                    {status === "all"
                      ? "All"
                      : status === "delivered"
                      ? "Delivered"
                      : status === "dispatched"
                      ? "Dispatched"
                      : status === "credit"
                      ? "Credit"
                      : "Pending"}{" "}
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
                      onClick={() => setStatus("userId")}
                      type="button"
                      className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setStatus("dispatched")}
                      type="button"
                      className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                    >
                      Dispatched
                    </button>
                    <button
                      onClick={() => setStatus("delivered")}
                      type="button"
                      className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                    >
                      delivered
                    </button>
                    <button
                      onClick={() => setStatus("credit")}
                      type="button"
                      className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-r rounded-r-md hover:bg-gray-100"
                    >
                      Credit
                    </button>
                  </div>

                  <div className="relative mr-3">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="table-search"
                      className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50   placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search order"
                      // onChange={(e) => setSearch(e.target.value)}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <table className="w-full table-auto">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="text-xs cursor-pointer text-left text-gray-500 border-b border-gray-200">
                      <th className="px-6 py-3 font-medium ">SR.No</th>
                      <th className="flex items-center py-3 pl-6 font-medium ">
                        <span>BILL NO</span>
                      </th>
                      <th className="px-6 py-3 font-medium ">NAME</th>
                      <th className="px-6 py-3 font-medium ">ADDRESS</th>
                      <th className="px-6 py-3 font-medium ">
                        DELIVERY STATUS
                      </th>
                      <th className="px-6 py-3 font-medium ">PAID</th>
                      <th className="px-6 py-3 font-medium ">BALANCE</th>
                      <th className="px-6 py-3 font-medium ">BILL AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData &&
                      filteredData.map((data, index) => (
                        <tr
                          onClick={() =>
                            router.push(`/dashboard/orders/${data._id}`)
                          }
                          key={index}
                          className="border-b cursor-pointer border-gray-200 dark:border-gray-800"
                        >
                          <td className="px-6 text-sm font-medium">
                            <p className="">{index + 1}</p>
                          </td>
                          <td className="flex items-center px-6 py-3 text-sm font-medium">
                            <p className="">{data.billNo}</p>
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.name}
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.address}
                          </td>
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
                          <td className="px-6 text-sm font-medium ">
                            <span className="inline-block px-2 py-1 text-gray-700 ">
                              {data.totalAmount - data.paid > 0
                                ? data.totalAmount - data.paid
                                : 0}
                            </span>
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.totalAmount}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showAmountCollectModal && (
        <CollectAmount
          userinfo={userinfo}
          setShowAmountCollectModal={setShowAmountCollectModal}
          collectAmount={collectAmount}
        />
      )}
    </main>
  );
}

export default page;
