import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getNotifications } from "../slice/notificationSlice";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    //* Add notification ******************************************************
    saveNotification: builder.mutation({
      query: (fromData) => ({
        url: "/notifications/addNotifications",
        method: "POST",
        body: fromData,
      }),
    }),
    //* Get notification ******************************************************
    getNotification: builder.query({
      query: () => ({
        url: "/notifications/getNotifications",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getNotifications(data.data));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
  }),
});

export const { useSaveNotificationMutation,useGetNotificationQuery } = notificationApi;
