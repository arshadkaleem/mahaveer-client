"use client";
import React, { useEffect, useState } from "react";

import {
  useGetOrderDetailsMutation,
  useApproveMutation,
  useRejectCreditMutation,
} from "../../../../../redux-store/api/admin/order";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../../../../../components/Loading";

function page(props) {
  const {
    params: { order },
  } = props;

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  const [orderDetail, setOrderDetail] = useState({});
  const [creditDetails, setCreditDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [getOrderDetails, { data, isSuccess, error, isError, isLoading }] =
    useGetOrderDetailsMutation();

  const [approve] = useApproveMutation();

  const [
    rejectCredit,
    {
      data: rejectData,
      isSuccess: rejectIsSucees,
      error: rejectError,
      isError: rejectIsError,
      isLoading: rejectIsLoading,
    },
  ] = useRejectCreditMutation();

  const rejectCreditApproval = async () => {
    rejectCredit({ body: { id: orderDetail._id }, token: access_token });
  };

  useEffect(() => {
    if (rejectIsError) {
      if (rejectError.data) {
        toast.error(rejectError.data.message);
      }
    }
    if (rejectIsSucees) {
      toast.success("Credit Approval Rejected");
    }
  }, [rejectIsError, rejectIsSucees]);

  useEffect(() => {
    getOrderDetails({
      body: { id: order },
      token: access_token,
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOrderDetail(data.data);
    }
    if (isError) {
      if (error.data) {
        toast.error(error.data.message);
      }
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getOrderDetails({
      body: { id: order },
      token: access_token,
    });
    if (res.data) {
      setOrderDetail(res.data.data);
      if (res.data?.credit) {
        setCreditDetails(res.data.credit);
      }
    } else {
    }
  };

  const approveRequiest = async () => {
    const res = await approve({
      body: { id: orderDetail._id },
      token: access_token,
    });
    setIsOpen(false);
    if (res.data) {
      fetchData();
      toast.success(res.data.message);
    } else {
      if (res.error) {
        toast.success(res.error.data.message);
      }
    }
  };

  return (
    <section className="w-full bg-gray-100 pt-5 lg:pt-20">
      <div className="p-4">
        {isLoading || rejectIsLoading ? (
          <Loading />
        ) : (
          <div className="bg-white rounded-lg py-4">
            {/* order details  */}
            <div className="w-10/12 mx-auto ">
              <div className="flex justify-between font-bold text-xl my-5 border-b border-gray-100">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">{/* <FaUser /> */}</span>
                  <span className="tracking-wide">Order Information</span>
                </div>
                <div className="pb-1">
                  {orderDetail.credit && !orderDetail.creditApproved && (
                    <button
                      // onClick={() => {
                      //   router.back();
                      // }}
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      type="button"
                      className="py-2 px-5 bg-red-100 hover:bg-red-200 hover:border hover:border-red-600 text-red-600 transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  rounded-lg "
                    >
                      Pending Credit Approval
                    </button>
                  )}
                </div>
              </div>

              <div className=" overflow-y-auto  scroll-smooth">
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Full Name</div>
                        <div className="px-4 py-2">{orderDetail.name}</div>
                      </div>

                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Phone Number
                        </div>
                        <div className="px-4 py-2">{orderDetail.mobile}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Address</div>
                        <div className="px-4 py-2">{orderDetail.address}</div>
                      </div>
                      {orderDetail.credit ? (
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Credit Approval{" "}
                          </div>
                          <div className="px-4 py-2">
                            <span
                              className={`${
                                orderDetail.credit &&
                                !orderDetail.creditApproved
                                  ? "text-orange-700 bg-orange-100"
                                  : "text-green-700 bg-green-100"
                              } inline-block px-2 py-1 rounded-md dark:bg-gray-800 dark:text-gray-400`}
                            >
                              {orderDetail.credit && !orderDetail.creditApproved
                                ? "Pending"
                                : "Approved"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Customer Id
                        </div>
                        <div className="px-4 py-2">
                          {orderDetail.customerId}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Bill Number
                        </div>
                        <div className="px-4 py-2">{orderDetail.billNo}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Order Date
                        </div>
                        <div className="px-4 py-2">
                          {new Date(orderDetail.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {orderDetail.delivered && (
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Deliverd{" "}
                          </div>
                          <div className="px-4 py-2">
                            {new Date(orderDetail.updatedAt).toLocaleString()}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Status</div>

                        <div className="px-4 py-2">
                          {" "}
                          <span
                            className={`${
                              orderDetail.delivered
                                ? "bg-green-100 text-green-700"
                                : orderDetail.isCanceled
                                ? "bg-red-100 text-red-700"
                                : orderDetail.dispatched
                                ? "bg-blue-100 text-blue-700"
                                : orderDetail.refuesdToAccept
                                ? "bg-orange-200 text-orange-600"
                                : orderDetail.userId && !orderDetail.dispatched
                                ? "text-purple-700 bg-purple-100"
                                : "text-orange-700 bg-orange-100"
                            } inline-block px-2 py-1 rounded-md dark:bg-gray-800 dark:text-gray-400`}
                          >
                            {orderDetail.delivered
                              ? "Deliverd"
                              : orderDetail.isCanceled
                              ? "cancelled"
                              : orderDetail.refuesdToAccept
                              ? "Refuse To Accept"
                              : orderDetail.dispatched
                              ? "Dispatched"
                              : orderDetail.userId && !orderDetail.dispatched
                              ? "Ready"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Number Of Bags
                        </div>
                        <div className="px-4 py-2">{orderDetail.totalBags}</div>
                      </div>

                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Bill Amount
                        </div>
                        <div className="px-4 py-2">
                          {orderDetail.totalAmount}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          {orderDetail.paid ? "Paid" : "To be collect"}
                        </div>
                        <div className="px-4 py-2">
                          {orderDetail.totalAmount}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Payment Method
                        </div>
                        <div className="px-4 py-2">
                          {orderDetail.paymentMethod
                            ? orderDetail.paymentMethod
                            : "-"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Mahaveer Code
                        </div>
                        <div className="px-4 py-2">{orderDetail.location}</div>
                      </div>
                      {orderDetail.delivered && (
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Distance
                          </div>
                          <div className="px-4 py-2">
                            {orderDetail.distance
                              ? orderDetail.distance + "Km "
                              : "-"}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* credit details  */}
            {orderDetail.credit && orderDetail.creditApproved && (
              <div className="w-10/12 mx-auto ">
                <div className="flex justify-between font-bold text-xl my-5 border-b border-gray-100">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="tracking-wide">Credit Information</span>
                  </div>
                </div>

                <div className=" overflow-y-auto  scroll-smooth">
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="text-gray-700">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Full Name
                          </div>
                          <div className="px-4 py-2">
                            {orderDetail?.approvedBy?.userName}
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Phone Number
                          </div>
                          <div className="px-4 py-2">
                            {orderDetail?.approvedBy?.phoneNumber}
                          </div>
                        </div>

                        {orderDetail.credit ? (
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Credit Approval{" "}
                            </div>
                            <div className="px-4 py-2">
                              <span
                                className={`${
                                  orderDetail.credit &&
                                  !orderDetail.creditApproved
                                    ? "text-orange-700 bg-orange-100"
                                    : "text-green-700 bg-green-100"
                                } inline-block px-2 py-1 rounded-md dark:bg-gray-800 dark:text-gray-400`}
                              >
                                {orderDetail.credit &&
                                !orderDetail.creditApproved
                                  ? "Pending"
                                  : "Approved"}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Date</div>
                          <div className="px-4 py-2">
                            {new Date(
                              creditDetails?.updatedAt
                            ).toLocaleString()}
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Status</div>

                          <div className="px-4 py-2">
                            {" "}
                            <span
                              className={`${
                                orderDetail.delivered
                                  ? "bg-green-100 text-green-700"
                                  : orderDetail.isCanceled
                                  ? "bg-red-100 text-red-700"
                                  : orderDetail.dispatched
                                  ? "bg-blue-100 text-blue-700"
                                  : orderDetail.refuesdToAccept
                                  ? "bg-orange-200 text-orange-600"
                                  : orderDetail.userId &&
                                    !orderDetail.dispatched
                                  ? "text-purple-700 bg-purple-100"
                                  : "text-orange-700 bg-orange-100"
                              } inline-block px-2 py-1 rounded-md dark:bg-gray-800 dark:text-gray-400`}
                            >
                              {orderDetail.delivered
                                ? "Deliverd"
                                : orderDetail.isCanceled
                                ? "cancelled"
                                : orderDetail.refuesdToAccept
                                ? "Refuse To Accept"
                                : orderDetail.dispatched
                                ? "Dispatched"
                                : orderDetail.userId && !orderDetail.dispatched
                                ? "Ready"
                                : "Pending"}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            {orderDetail.totalAmount -
                              orderDetail.paid -
                              orderDetail.recived >
                            0
                              ? "To Be Collect"
                              : "Paid"}
                          </div>
                          <div className="px-4 py-2">
                            {orderDetail.totalAmount -
                              orderDetail.paid -
                              orderDetail.recived >
                            0
                              ? orderDetail.totalAmount - orderDetail.paid
                              : orderDetail.recived}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* delivery person details  */}
            {orderDetail.userId && (
              <div className="w-10/12 mx-auto ">
                <div className="flex justify-between font-bold text-xl my-5 border-b border-gray-100">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span clas="text-green-500">{/* <FaUser /> */}</span>
                    <span className="tracking-wide">Delivery Person</span>
                  </div>
                </div>

                <div className=" overflow-y-auto  scroll-smooth">
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="text-gray-700">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Full Name
                          </div>
                          <div className="px-4 py-2">
                            {orderDetail?.userId?.userName
                              ? orderDetail?.userId?.userName
                              : "-"}
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Phone Number
                          </div>
                          <div className="px-4 py-2">
                            {orderDetail.userId?.phoneNumber
                              ? orderDetail.userId?.phoneNumber
                              : "-"}
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Distance
                          </div>
                          <div className="px-4 py-2">
                            {orderDetail.distance
                              ? orderDetail.distance + "Km"
                              : "-"}
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Cost</div>
                          <div className="px-4 py-2">
                            {orderDetail.cost ? orderDetail.cost : "-"}
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Order Assign By
                          </div>
                          <div className="px-4 py-2">
                            {orderDetail?.adminId?.userName
                              ? orderDetail?.adminId?.userName
                              : "-"}
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Phone Number
                          </div>
                          <div className="px-4 py-2">
                            {orderDetail.adminId?.phoneNumber
                              ? orderDetail.adminId?.phoneNumber
                              : "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* credit model  */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="modal-container">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-center text-[#444262]">
                Credit
              </h2>
              <p className="text-slate-600 ">
                Are you sure you want to approve{" "}
                <span className="font-semibold text-black">
                  {" "}
                  {orderDetail.name}{" "}
                </span>{" "}
                of Amount{" "}
                <span className="font-semibold text-black">
                  {" "}
                  {orderDetail.totalAmount - orderDetail.paid}
                </span>{" "}
                credit.
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
                    onClick={rejectCreditApproval}
                    className="text-white "
                  >
                    Reject
                  </button>
                </div>
                <div className="flex bg-[#444262] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#FF7754]">
                  <button onClick={approveRequiest} className="text-white ">
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default page;
