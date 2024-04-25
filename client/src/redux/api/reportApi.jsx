import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getDailyReport } from "../slice/reportSlice";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    //* get Daily report *************************************************
    getDailyReport: builder.query({
      query: () => ({
        url: "/report/getdailyreport",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getDailyReport(data.data));
        } catch (error) {
          console.log("Error....", error);
        }
      },
    }),
  }),
});

export const { useGetDailyReportQuery } = reportApi;
