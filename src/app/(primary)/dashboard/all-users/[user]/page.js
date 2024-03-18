"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DownloadButton from "@/components/DownloadButton";
import { useDownloadUserOrdersExcelMutation } from "@/redux-store/api/admin/xlsxApi";
import { formatExcel } from "../../../../../utils/formatExcel";
import * as XLSX from "xlsx";
import ProfileCard from "@/components/employees/ProfileCard";
import DeliveryPersonOders from "@/components/employees/DeliveryPersonOders";
import DeliveryPersonTransaction from "@/components/employees/DeliveryPersonTransaction";

function page(props) {
  const currentDate = new Date();
  const startOfDay = new Date(currentDate);
  startOfDay.setUTCHours(0, 0, 0, 0); // Set to 12:00:00 AM UTC
  const endOfDay = new Date(currentDate);

  const [showTransaction, setShowTransaction] = useState(false);
  const [startDate, setStartDate] = useState(startOfDay);
  const [endDate, setEndDate] = useState(endOfDay);

  const {
    params: { user },
  } = props;

  const {
    token: {
      token: { access_token },
    },
    admin: { userinfo },
  } = useSelector((state) => state.persistedReducer);

  const [
    downloadOrdersExcel,
    {
      data: excelData,
      isSuccess: excelIsSuccess,
      error: excelError,
      isError: excelIsError,
      isLoading: isExcelIsoading,
    },
  ] = useDownloadUserOrdersExcelMutation();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (userinfo?.role === "Admin") {
      setShowTransaction(true);
    }
  }, []);

  const downloadExcel = async () => {
    await downloadOrdersExcel({
      body: {
        userId: userinfo?._id,
        START_DATE: startDate,
        END_DATE: endDate,
        status,
      },
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

  return (
    <>
      <main className="lg:pt-16 pt-5 px-5 bg-gray-50 h-full">
        {/* {isLoading || (isExcelIsoading && <Loading />)} */}
        <div className="w-full">
          {/* Profile Card */}
          <ProfileCard />

          {/* DatePicker */}
          <div className="px-10 pb-4 flex lg:flex-row flex-col items-center justify-between mt-5">
            <h1 className="text-[#444262] text-2xl font-bold">
              {new Date(currentDate).toDateString() ===
                endDate?.toDateString() &&
              new Date(currentDate).toDateString() === startDate?.toDateString()
                ? "Today"
                : startDate?.toDateString() +
                  " " +
                  "TO" +
                  " " +
                  endDate?.toDateString()}
            </h1>
            <div className="border rounded-md overflow-hidden  flex">
              <DatePicker
                showIcon={true}
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                className="border border-black rounded-lg"
                selectsRange
              />
            </div>
          </div>

          {/* oder and transaction buttons  */}
          {userinfo?.role === "Delivery" && (
            <div className="flex lg:flex-row flex-col gap-5 px-10 mt-10 max-w-6xl mx-auto">
              <button
                onClick={() => {
                  setShowTransaction(false);
                }}
                className={`flex-1 py-3 rounded-md border text-lg font-bold border-[#444262] text-[#444262] hover:text-white hover:bg-[#444262] ${
                  !showTransaction
                    ? "bg-[#444262] text-white"
                    : "bg-white text-[#444262]"
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => {
                  setShowTransaction(true);
                }}
                className={`flex-1 py-3  rounded-md border text-lg font-bold border-[#444262] text-[#444262] hover:text-white hover:bg-[#444262] ${
                  showTransaction
                    ? "bg-[#444262] text-white"
                    : "bg-white text-[#444262]"
                }`}
              >
                Transactions
              </button>
            </div>
          )}

          {!showTransaction ? (
            <>
              <DeliveryPersonOders
                startDate={startDate}
                endDate={endDate}
                user={user}
              />
              <div className="w-full mt-3 flex flex-1 max-w-6xl pb-4 px-4  md:px-6">
                <DownloadButton downloadExcel={downloadExcel} />
              </div>
            </>
          ) : (
            <DeliveryPersonTransaction
              startDate={startDate}
              endDate={endDate}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default page;
