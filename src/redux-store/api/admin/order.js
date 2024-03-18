import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    allorders: builder.mutation({
      query: (args) => {
        return {
          url: "sa-orders",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    mycreditorders: builder.mutation({
      query: (args) => {
        return {
          url: "credit-order",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    findOrders: builder.mutation({
      query: (args) => {
        return {
          url: "filter-order",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    findByUserId: builder.mutation({
      query: (args) => {
        return {
          url: "sa-user-order",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    approve: builder.mutation({
      query: (args) => {
        return {
          url: "approve-credit",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    rejectCredit: builder.mutation({
      query: (args) => {
        return {
          url: "reject",
          method: "PUT",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    getOrderDetails: builder.mutation({
      query: (args) => {
        return {
          url: "sa-order-details",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    getCutomerCreditOrders: builder.mutation({
      query: (args) => {
        return {
          url: "sa-credit-orders",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    orderCounts: builder.mutation({
      query: (args) => {
        return {
          url: "counts",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    creditAuthorization: builder.mutation({
      query: (args) => {
        return {
          url: "Credit-authorization",
          method: "PUT",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    search: builder.mutation({
      query: (args) => {
        return {
          url: "search",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useAllordersMutation,
  useFindOrdersMutation,
  useApproveMutation,
  useRejectCreditMutation,
  useMycreditordersMutation,
  useFindByUserIdMutation,
  useGetOrderDetailsMutation,
  useGetCutomerCreditOrdersMutation,
  useOrderCountsMutation,
  useCreditAuthorizationMutation,
  useSearchMutation,
} = orderApi;
