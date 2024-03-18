"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useCustomersMutation } from "../../../../redux-store/api/admin/manageUserApi";
import { useRouter } from "next/navigation";
import Loading from "../../../../components/Loading";
import { FaAnglesRight } from "react-icons/fa6";

function page() {
  const {
    token: {
      token: { access_token },
    },
  } = useSelector((state) => state.persistedReducer);

  // const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [allCustomers, setAllCustomes] = useState([]);

  const router = useRouter();

  const [creditCustomers, { isError, error, isSuccess, data, isLoading }] =
    useCustomersMutation();

  useEffect(() => {
    if (isSuccess) {
      setAllCustomes(data.data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error.data) {
        toast.error(error.data.message);
      } else {
        toast.error("Internal Server Error");
      }
    }
  }, [isError]);

  useEffect(() => {
    creditCustomers({ body: { skip }, token: access_token });
  }, []);

  return (
    <main className="lg:pt-20 pt-5 lg:px-10 px-4 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold text-[#444262] text-center my-3">
        All Credit Customers
      </h3>
      <section className="items-center lg:flex font-poppins">
        <div className="justify-center flex-1 min-w-[100%] max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="overflow-x-auto bg-white rounded shadow">
            <div className="">
              {isLoading ? (
                <Loading />
              ) : (
                <table className="w-full table-auto ">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                      <th className="px-6 py-3 font-medium ">SR.No</th>
                      <th className="flex items-center py-3 pl-6 font-medium ">
                        <span>Customer Id</span>
                      </th>
                      <th className="px-6 py-3 font-medium ">NAME</th>
                      <th className="px-6 py-3 font-medium ">Phone NO</th>
                      <th className="px-6 py-3 font-medium ">AMOUNT</th>
                      <th className="px-6 py-3 font-medium ">Address</th>
                      <th className="px-6 py-3 font-medium ">MORE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCustomers.length > 0 &&
                      allCustomers.map((data, index) => (
                        <tr
                          onClick={() =>
                            router.push(`/dashboard/credit/${data.customerId}`)
                          }
                          key={index}
                          className="border-b cursor-pointer border-gray-200 dark:border-gray-800"
                        >
                          <td className="px-6 text-sm font-medium ">
                            {index + 1}
                          </td>
                          <td className="flex items-center px-6 py-5 text-sm font-medium">
                            <p className="">{data.customerId}</p>
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.customer}
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.mobile}
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            {data.creditAmount}
                          </td>
                          <td className="px-6 text-sm font-medium ">
                            <span className="inline-block px-2 py-1 text-gray-700 ">
                              {data.address}
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
    </main>
  );
}

export default page;
