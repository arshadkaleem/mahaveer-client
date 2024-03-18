import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const manageTransactions = createApi({
  reducerPath: "manageTransactions",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getUserTransactions: builder.mutation({
      query: (args) => {
        return {
          url: "sa-transactions",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    collectAmount: builder.mutation({
      query: (args) => {
        return {
          url: "collection",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    findTransactions: builder.mutation({
      query: (args) => {
        return {
          url: "sa-find-transactions",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    collectCredit: builder.mutation({
      query: (args) => {
        return {
          url: "collect-credit-amount",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),

    deliveryRates: builder.mutation({
      query: (args) => {
        return {
          url: "rate",
          method: "PUT",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),

    getRates: builder.mutation({
      query: (token) => {
        return {
          url: "get-rate",
          method: "GET",

          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    getAllTransactionAmount: builder.mutation({
      query: (args) => {
        return {
          url: "getAllTransaction-amount",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetUserTransactionsMutation,
  useCollectAmountMutation,
  useFindTransactionsMutation,
  useCollectCreditMutation,
  useDeliveryRatesMutation,
  useGetRatesMutation,
  useGetAllTransactionAmountMutation,
} = manageTransactions;
