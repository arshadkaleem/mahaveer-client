"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetCutomerCreditOrdersMutation,
  useSearchMutation,
} from "../../../../../redux-store/api/admin/order";
import { useRouter } from "next/navigation";
import CollectAmount from "@/components/employees/CollectAmount";
import toast from "react-hot-toast";
import { FaAnglesRight } from "react-icons/fa6";

function page(props) {
  const {
    params: { credit },
  } = props;
  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showAmountCollectModal, setShowAmountCollectModal] = useState(false);
  const [creditUser, setCreditUser] = useState({});
  const [skip, setSkip] = useState(0);
  const [creditOrders, setCreditOrders] = useState([]);
  const [cutomerDetails, setCustomerDetails] = useState({});
  const [getSearch, setSearch] = useState();

  const [creditCustomerOrders] = useGetCutomerCreditOrdersMutation();

  const getMyCreditCustomer = async () => {
    const res = await creditCustomerOrders({
      body: { customerId: credit, skip },
      token: access_token,
    });
    if (res.data) {
      setCreditOrders(res.data.data);
      if (res.data.customer) {
        setCustomerDetails(res.data.customer);
      }
    }
  };

  useEffect(() => {
    getMyCreditCustomer();
  }, []);

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
      setCreditOrders(searchData.data);
    }
  }, [searchIsSucess]);

  useEffect(() => {
    if (searchErr) {
      if (searchError.data) {
        toast.error(searchError.data.message);
      }
    }
  }, [searchErr]);

  return (
    <main className="pt-20 px-10 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold text-[#444262] text-center my-3">
        Customer Credits
      </h3>
      <div className="px-4 py-4 md:px-6 mt-8 bg-white shadow-md rounded-lg">
        <div className="flex flex-row items-start gap-4">
          <div className="flex flex-col justify-between w-full h-40">
            <div className="grid grid-cols-2 gap-5">
              <p className="text-xl font-medium text-gray-800 ">
                Name : {cutomerDetails.customer}
              </p>
              <p className="text-xl font-medium text-gray-800 ">
                Phone Number : {cutomerDetails.mobile}
              </p>
              <p className="text-xl font-medium text-gray-800 ">
                Customer Id : {cutomerDetails.customerId}
              </p>
              <p className="text-xl font-medium text-gray-800 ">
                Amount : {cutomerDetails?.creditAmount}
              </p>
              <p className="text-xl font-medium text-gray-800 ">
                Address : {cutomerDetails.address}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => setShowAmountCollectModal(true)}
            className="w-1/4 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-green-300"
          >
            Collect Amount
          </button>
          <button
            type="button"
            className="w-1/4 px-4 py-2 text-base text-white bg-red-500 border rounded-lg hover:bg-red-700 "
          >
            Remove Customer
          </button>
        </div>
      </div>
      <section className="items-center lg:flex mt-4  font-poppins">
        <div className="justify-center flex-1 min-w-[100%] max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="overflow-x-auto bg-white rounded shadow">
            <div className="">
              <div className="flex justify-between items-center py-2">
                <div></div>
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
                      search({
                        body: {
                          searchInput: getSearch,
                          customerId: cutomerDetails.customerId,
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
                <thead className="bg-gray-100">
                  <tr className="text-xs text-left text-gray-500 border-b border-gray-200">
                    <th className="flex items-center py-3 pl-6 font-medium ">
                      <span>BILL NO</span>
                    </th>
                    <th className="px-6 py-3 font-medium ">DATE</th>
                    <th className="px-6 py-3 font-medium ">TOTAL BAGS</th>
                    <th className="px-6 py-3 font-medium ">DELIVERY STATUS</th>
                    <th className="px-6 py-3 font-medium ">CREDIT</th>
                    <th className="px-6 py-3 font-medium ">AMOUNT</th>
                    <th className="px-6 py-3 font-medium ">MORE</th>
                  </tr>
                </thead>
                <tbody>
                  {creditOrders.length > 0 &&
                    creditOrders.map((data, index) => (
                      <tr
                        onClick={() =>
                          router.push(`/dashboard/orders/${data?.orderId?._id}`)
                        }
                        key={index}
                        className="border-b cursor-pointer border-gray-200"
                      >
                        <td className="flex items-center px-6 py-5 text-sm font-medium">
                          <p className="">{data?.orderId?.billNo}</p>
                        </td>
                        <td className="px-6 text-sm font-medium ">
                          {new Date(data?.orderId?.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 text-sm font-medium ">
                          {data?.orderId?.totalBags}
                        </td>
                        <td className="px-6 text-sm font-medium ">
                          <span
                            className={`${
                              data.orderId?.delivered
                                ? "bg-green-100 text-green-700"
                                : "text-blue-700 bg-blue-100"
                            } inline-block px-2 py-1 rounded-md dark:bg-gray-800 `}
                          >
                            {data.orderId?.delivered
                              ? "Deliverd"
                              : "Dispatched"}
                          </span>
                        </td>
                        <td className="px-6 text-sm font-medium ">
                          <span
                            className={`${
                              data.approved
                                ? "bg-green-100 text-green-700"
                                : "text-red-700 bg-red-100"
                            } inline-block px-2 py-1 rounded-md dark:bg-gray-800 `}
                          >
                            {data.approved ? "Approved" : "Pending"}
                          </span>
                        </td>
                        <td className="px-6 text-sm font-medium ">
                          <span
                            className={`${
                              data.orderId?.delivered
                                ? "bg-green-100 text-green-700"
                                : "text-orange-700 bg-orange-100"
                            } inline-block px-2 py-1 rounded-md dark:bg-gray-800 `}
                          >
                            {data.orderId.totalAmount - data.orderId.paid}
                          </span>
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
                  {creditUser?.orderId?.name}{" "}
                </span>{" "}
                of Amount{" "}
                <span className="font-semibold text-black">
                  {" "}
                  {creditUser?.orderId?.recived}
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
                  <button onClick={approveRequiest} className="text-white ">
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAmountCollectModal && (
        <CollectAmount
          userinfo={cutomerDetails}
          setShowAmountCollectModal={setShowAmountCollectModal}
          cutomerDetails={cutomerDetails}
          customer={true}
        />
      )}
    </main>
  );
}

export default page;
