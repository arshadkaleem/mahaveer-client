"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

import { useGetRatesMutation } from "../../../redux-store/api/admin/transactionApi";

import OrderCounts from "@/components/home/OrderCounts";
import OrderDetails from "@/components/home/OrderDetails";
import DeliveryPersons from "@/components/home/DeliveryPersons";
import RateModal from "@/components/home/RateModal";

function page() {
  const currentDate = new Date();
  const startOfDay = new Date(currentDate);
  startOfDay.setUTCHours(0, 0, 0, 0); // Set to 12:00:00 AM UTC
  const endOfDay = new Date(currentDate);

  const [startDate, setStartDate] = useState(startOfDay);
  const [endDate, setEndDate] = useState(endOfDay);
  const [rateModal, setRateModal] = useState(false);
  const [rate, setRate] = useState();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalEntries: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    itemsPerPage: 0,
  });

  const router = useRouter();

  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  // ******* rate Credential *******
  const [
    getRates,
    {
      data: ratesData,
      isSuccess: rateIsSucess,
      error: rateError,
      isError: rateIsError,
    },
  ] = useGetRatesMutation();

  useEffect(() => {
    if (rateIsSucess) {
      setRate(ratesData.data);
    }
    if (rateIsError) {
      if (rateError) {
        toast.error(rateError.data.message);
      }
    }
  }, [rateIsSucess, rateIsError]);

  useEffect(() => {
    getRates(access_token);
  }, [rateModal]);
  // *******end rate Credential *******

  const checkAuth = async () => {
    if (!access_token) {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setPagination({
      currentPage: 1,
      totalEntries: 0,
      currentPageStart: 0,
      currentPageEnd: 0,
      itemsPerPage: 0,
    });
  };

  return (
    <>
      <main className="flex-1 mt-5 lg:mt-24">
        {/* rate model  */}
        {rateModal && <RateModal setRateModal={setRateModal} />}

        {/* date picker  */}
        <div className="mx-10 pb-4 flex sm:flex-row flex-col justify-between">
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
          <div className="overflow-hidden flex">
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

        {/* Order Counts  */}
        <OrderCounts endDate={endDate} startDate={startDate} />

        {/* orders  */}
        <OrderDetails
          startDate={startDate}
          endDate={endDate}
          pagination={pagination}
          setPagination={setPagination}
        />

        {/* deliveryBoys  */}
        <DeliveryPersons
          startDate={startDate}
          endDate={endDate}
          rate={rate}
          setRateModal={setRateModal}
        />
      </main>
    </>
  );
}

export default page;
