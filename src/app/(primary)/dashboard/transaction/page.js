"use client";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import TransactionsCounts from "@/components/transactions/TransactionsCounts";

function page() {
  const currentDate = new Date();
  const startOfDay = new Date(currentDate);
  startOfDay.setUTCHours(0, 0, 0, 0); // Set to 12:00:00 AM UTC
  const endOfDay = new Date(currentDate);

  const [startDate, setStartDate] = useState(startOfDay);
  const [endDate, setEndDate] = useState(endOfDay);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalEntries: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    itemsPerPage: 0,
  });

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <main className="lg:pt-16 min-h-screen bg-gray-50">
      <h3 className="bg-white pt-5 text-2xl font-bold font-sans text-[#444262] py-4 text-center px-4">
        Money transaction
      </h3>

      {/* datepicker  */}
      <div className="px-10 pb-4 flex lg:flex-row flex-col justify-between bg-white">
        <h1 className="text-[#444262] text-2xl font-bold">
          {new Date(currentDate).toDateString() === endDate?.toDateString() &&
          new Date(currentDate).toDateString() === startDate?.toDateString()
            ? "Today"
            : startDate?.toDateString() +
              " " +
              "TO" +
              " " +
              endDate?.toDateString()}
        </h1>
        <div className="border rounded-md overflow-hidden flex">
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

      {/* transaction counts  */}
      <TransactionsCounts startDate={startDate} endDate={endDate} />

      {/* transaction table  */}
      <TransactionsTable
        startDate={startDate}
        endDate={endDate}
        pagination={pagination}
        setPagination={setPagination}
      />
    </main>
  );
}

export default page;
