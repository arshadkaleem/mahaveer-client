"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectAmount from "./CollectAmount";
import { useCreditAuthorizationMutation } from "@/redux-store/api/admin/order";
import { setUser } from "@/redux-store/slice/useSlice";

const ProfileCard = () => {
  const [showModel, setShowModel] = useState(false);
  const [showAmountCollectModal, setShowAmountCollectModal] = useState(false);

  const dispatch = useDispatch();

  const {
    token: {
      token: { access_token },
    },
    admin: { userinfo },
  } = useSelector((state) => state.persistedReducer);

  const [
    creditAuthorization,
    {
      isError: AuthorizeErr,
      error: AuthorizeError,
      isSuccess: AuthorizeSuccess,
      data: AuthorizeData,
      isLoading: AuthorizeLoading,
    },
  ] = useCreditAuthorizationMutation();

  useEffect(() => {
    if (AuthorizeErr) {
      if (AuthorizeError) {
        toast.error(AuthorizeError.data.message);
      }
    }
    if (AuthorizeSuccess) {
      dispatch(setUser(AuthorizeData.data));
      setShowModel(false);
    }
  }, [AuthorizeErr, AuthorizeSuccess]);

  return (
    <>
      {/* profile card  */}
      <div className="p-4 mt-8 bg-white shadow-md rounded-lg">
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
                // weekday: "long",
              })}
            </p>
            <p className="text-xl font-medium text-gray-800 ">
              Amount: {userinfo?.pendingBalance}
            </p>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col items-center justify-center gap-4 mt-10">
          {!userinfo?.superAdmin && (
            <button
              onClick={() => setShowAmountCollectModal(true)}
              type="button"
              className="lg:w-1/4 w-full px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-green-300"
            >
              Collect Amount
            </button>
          )}
          {userinfo?.role === "Delivery" && (
            <button
              type="button"
              className="lg:w-1/4 w-full px-4 py-2 text-base text-white bg-red-500 border rounded-lg hover:bg-red-700 "
            >
              Remove User
            </button>
          )}
          {userinfo?.role === "Admin" && (
            <button
              onClick={() => {
                setShowModel(true);
              }}
              type="button"
              className="lg:w-1/4 w-full px-4 py-2 text-base text-white bg-[#444262] border rounded-lg hover:bg-[#383655] "
            >
              {userinfo?.authorizedCredit
                ? "Unauthorize Credit"
                : "Authorize Credit"}
            </button>
          )}
        </div>
      </div>

      {/* callect amount model  */}
      {showAmountCollectModal && (
        <CollectAmount setShowAmountCollectModal={setShowAmountCollectModal} />
      )}

      {/* Authorize credit model  */}
      {showModel && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="modal-container">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-center text-[#444262]">
                Authorize Credit
              </h2>
              <p className="text-slate-600 ">
                Are you sure you want to{" "}
                {userinfo?.authorizedCredit
                  ? "unapprove the Admin?"
                  : "authorize the Admin to provide credit?"}
              </p>

              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="flex bg-[#444262] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#FF7754]">
                  <button
                    onClick={() => setShowModel(false)}
                    className="text-white "
                  >
                    Close
                  </button>
                </div>
                <div className="flex bg-[#444262] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#FF7754]">
                  <button
                    onClick={() => {
                      creditAuthorization({
                        body: {
                          authorizedCredit: userinfo?.authorizedCredit
                            ? false
                            : true,
                          id: userinfo?._id,
                        },
                        token: access_token,
                      });
                    }}
                    className="text-white "
                  >
                    {userinfo?.authorizedCredit ? "Unapprove" : "Approve"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
