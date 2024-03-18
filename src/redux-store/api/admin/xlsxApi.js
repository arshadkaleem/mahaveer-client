import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const excelDownloadApi = createApi({
  reducerPath: "excelDownloadApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    downloadOrdersExcel: builder.mutation({
      query: (args) => {
        return {
          url: "order-excel",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8 ",
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    downloadUserOrdersExcel: builder.mutation({
      query: (args) => {
        return {
          url: "user-order-excel",
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
  useDownloadOrdersExcelMutation,
  useDownloadUserOrdersExcelMutation,
} = excelDownloadApi;
