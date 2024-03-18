import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const manageuser = createApi({
  reducerPath: "manageuser",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => {
        return {
          url: "register",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
          },
        };
      },
    }),
    allusers: builder.mutation({
      query: () => {
        return {
          url: "all-user",
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
          },
        };
      },
    }),
    deliveryBoy: builder.mutation({
      query: (args) => {
        return {
          url: "delivery-boys",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    getAllAdmins: builder.mutation({
      query: (args) => {
        return {
          url: "sa-getAdmins",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    customers: builder.mutation({
      query: (args) => {
        return {
          url: "credit-customers",
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
  useRegisterMutation,
  useAllusersMutation,
  useDeliveryBoyMutation,
  useGetAllAdminsMutation,
  useCustomersMutation,
} = manageuser;
