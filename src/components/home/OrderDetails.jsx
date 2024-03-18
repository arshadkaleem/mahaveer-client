"use client";
import React, { useEffect, useState } from "react";
import {
  useAllordersMutation,
  useSearchMutation,
} from "../../redux-store/api/admin/order";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { FaAnglesRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import SkipButtons from "../SkipButton";
import DownloadButton from "../DownloadButton";
import { useDownloadOrdersExcelMutation } from "@/redux-store/api/admin/xlsxApi";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { formatExcel } from "@/utils/formatExcel";

export default function OrderDetails({
  startDate,
  endDate,
  pagination,
  setPagination,
}) {
  const [status, setStatus] = useState("all");
  const [totalOrder, setTotalOrder] = useState();
  const [getSearch, setSearch] = useState();

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

  const router = useRouter();

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  const [getOrders, { data, isSuccess, error, isError, isLoading }] =
    useAllordersMutation();

  useEffect(() => {
    if (startDate && endDate && status != "") {
      getOrders({
        body: {
          START_DATE: startDate,
          END_DATE: endDate,
          status,
          page: pagination.currentPage,
        },
        token: access_token,
      });
    }
  }, [startDate, endDate, status, pagination.currentPage]);

  useEffect(() => {
    if (isSuccess) {
      setTotalOrder(data.data);
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
      setTotalOrder(searchData.data);
    }
    if (searchErr) {
      if (searchError.data) {
        toast.error(searchError.data.message);
      }
    }
  }, [searchIsSucess, searchErr]);

  // ******* Excel Credential *******
  const [
    downloadOrdersExcel,
    {
      data: excelData,
      isSuccess: excelIsSuccess,
      error: excelError,
      isError: excelIsError,
      isLoading: excelIsLoading,
    },
  ] = useDownloadOrdersExcelMutation();

  const downloadExcel = async () => {
    await downloadOrdersExcel({
      body: { START_DATE: startDate, END_DATE: endDate, status },
      token: access_token,
    });
  };

  useEffect(() => {
    if (excelIsSuccess) {
      const { fromatExcelData, customHeaders } = formatExcel(excelData?.data);
      const ws = XLSX.utils.json_to_sheet(fromatExcelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "order.xlsx");
    }
  }, [excelIsSuccess]);

  // ******* end Excel Credential *******

  const srNo = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;

  const changeStatusFuntion = (statusData) => {
    setStatus(statusData);
    setPagination({
      currentPage: 1,
      totalEntries: 0,
      currentPageStart: 0,
      currentPageEnd: 0,
      itemsPerPage: 0,
    });
  };

  const handleLinkClick = (id) => {
    window.open(`/dashboard/orders/${id}`);
  };

  return (
    <div className="bg-gray-50">
      <section className="items-center flex font-poppins py-5">
        {/* oders table  */}
        <div className="justify-center flex-1 min-w-[100%] max-w-6xl px-4 pt-4 mx-auto lg:pt-8 md:px-6">
          <div className="overflow-x-auto bg-white rounded shadow">
            <div className="">
              <div className="flex justify-between items-center">
                <h2 className="px-6 py-4 pb-4 text-xl font-medium  border-gray-300">
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
                    onClick={() => {
                      changeStatusFuntion("all");
                    }}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-l rounded-l-md hover:bg-gray-100"
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      changeStatusFuntion("userId");
                    }}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => {
                      changeStatusFuntion("dispatched");
                    }}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                  >
                    Dispatched
                  </button>
                  <button
                    onClick={() => {
                      changeStatusFuntion("delivered");
                    }}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
                  >
                    Delivered
                  </button>
                  <button
                    onClick={() => {
                      changeStatusFuntion("credit");
                    }}
                    type="button"
                    className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-r rounded-r-md hover:bg-gray-100"
                  >
                    Credit
                  </button>
                </div>

                <div className="my-4 lg:my-0 flex justify-center max-w-sm flex-row w-full space-x-3 space-y-0">
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
                      setStatus("");
                      setPagination({
                        currentPage: 1,
                        totalEntries: 0,
                        currentPageStart: 0,
                        currentPageEnd: 0,
                        itemsPerPage: 0,
                      });
                      search({
                        body: {
                          searchInput: getSearch,
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

              {isLoading ? (
                <Loading />
              ) : (
                <table className="w-full table-auto">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                      <th className="px-6 py-3 font-medium ">SR.No</th>
                      <th className="flex items-center py-3 pl-6 font-medium ">
                        <span>BILL NO</span>
                      </th>
                      <th className="px-6 py-3 font-medium ">NAME</th>
                      <th className="px-6 py-3 font-medium ">ADDRESS</th>
                      <th className="px-6 py-3 font-medium ">DATE</th>
                      <th className="px-6 py-3 font-medium ">STATUS</th>
                      <th className="px-6 py-3 font-medium ">CREDIT</th>
                      <th className="px-6 py-3 font-medium ">AMOUNT</th>
                      {/* <th className="px-6 py-3 font-medium ">BALANCE</th> */}
                      <th className="px-6 py-3 font-medium ">MORE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalOrder &&
                      totalOrder.map((data, index) => (
                        <tr
                          onClick={() =>
                            // router.push(`/dashboard/orders/${data._id}`)
                            handleLinkClick(data._id)
                          }
                          key={index}
                          className="border-b cursor-pointer border-gray-200 dark:border-gray-800"
                        >
                          <td className="px-6 text-sm font-medium">
                            <p className="">{srNo + index}</p>
                          </td>
                          <td className="flex items-center px-6 py-5 text-sm font-medium">
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
                                  : data.userId && !data.dispatched
                                  ? "text-purple-700 bg-purple-100"
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
                                : data.userId && !data.dispatched
                                ? "Ready"
                                : "Pending"}
                            </span>
                          </td>
                          <td className="px-6 text-sm">
                            <span
                              className={`${
                                data.credit && data.creditApproved
                                  ? "bg-green-100 text-green-700"
                                  : data.credit && !data.creditApproved
                                  ? "bg-red-100 text-red-700"
                                  : ""
                              } inline-block px-2 py-1 rounded-md dark:bg-gray-800 `}
                            >
                              {data.credit && data.creditApproved
                                ? "Approved"
                                : data.credit && !data.creditApproved
                                ? "Pending "
                                : "-"}
                            </span>
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.totalAmount}
                          </td>
                          {/* <td className="px-6 text-sm font-medium ">
                            <span className="inline-block px-2 py-1 text-gray-700 ">
                              {data.paid ? "-" : data.totalAmount}
                            </span>
                          </td> */}
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

      <div className="w-full flex lg:flex-row flex-col items-center justify-between px-4 md:px-6">
        {/* downloadExcel */}
        <DownloadButton downloadExcel={downloadExcel} />

        {/* pegination button */}
        <SkipButtons
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
