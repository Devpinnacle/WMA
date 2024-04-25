import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import {
  getDailyReport,
  getProjectReport,
  getSelectedProject,
  getSelectedUser,
  getUserReport,
} from "../slice/reportSlice";

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

    //* get Project report *************************************************
    getProjectReport: builder.query({
      query: () => ({
        url: "/report/getprojectdetails",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getProjectReport(data.data));
        } catch (error) {
          console.log("Error....", error);
        }
      },
    }),

    //* get Single Project report *************************************************
    getSingleProjectReport: builder.mutation({
      query: (id) => ({
        url: "/report/singleprojectreport",
        method: "POST",
        body: { id: id },
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getSelectedProject(data.data));
        } catch (error) {
          console.log("Error....", error);
        }
      },
    }),
    //* get User report *************************************************
    getUserReport: builder.query({
      query: () => ({
        url: "/report/usereport",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getUserReport(data.data));
        } catch (error) {
          console.log("Error....", error);
        }
      },
    }),
    //* get Single User report *************************************************
    getSingleUserReport: builder.mutation({
      query: (id) => ({
        url: "/report/singleuserreport",
        method: "POST",
        body: { id: id },
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getSelectedUser(data.data));
        } catch (error) {
          console.log("Error....", error);
        }
      },
    }),
  }),
});

export const {
  useGetDailyReportQuery,
  useGetProjectReportQuery,
  useGetSingleProjectReportMutation,
  useGetUserReportQuery,
  useGetSingleUserReportMutation,
} = reportApi;
