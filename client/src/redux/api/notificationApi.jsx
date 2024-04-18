import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getNotifications } from "../slice/notificationSlice";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

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

    //* Add Section notification ******************************************************
    notifiySectionAdd: builder.mutation({
      query: (fromData) => ({
        url: "/notifications/notifyaddsection",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;

          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("addsection", "addsection", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Delete Section notification ******************************************************
    notifiySectionDelete: builder.mutation({
      query: (fromData) => ({
        url: "/notifications/notifydeletesection",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;

          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("deletesection", "deletesection", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Edit Section notification ******************************************************
    notifiySectionEdit: builder.mutation({
      query: (fromData) => ({
        url: "/notifications/notifyeditsection",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;

          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("editsection", "deletesection", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
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

export const {
  useSaveNotificationMutation,
  useNotifiySectionAddMutation,
  useNotifiySectionDeleteMutation,
  useNotifiySectionEditMutation,
  useGetNotificationQuery,
} = notificationApi;
