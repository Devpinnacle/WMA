import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import io from "socket.io-client";
import { getTaskNotifications } from "../slice/taskNotificationSlice";
const socket = io(import.meta.env.VITE_SOCKET_URL);

export const taskNotificationApi = createApi({
  reducerPath: "taskNotificationApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    //* Add Progress notification ******************************************************
    notifiyProgressAdd: builder.mutation({
      query: (fromData) => ({
        url: "/taskNotifications/addProgressNotifications",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;

          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("taskNotification", data.data, (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Add TA notification ******************************************************
    notifiyAssignDate: builder.mutation({
      query: (fromData) => ({
        url: "/taskNotifications/addAssigndateNotifications",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;

          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("taskNotification", data.data, (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Add Td notification ******************************************************
    notifiyDueDate: builder.mutation({
      query: (fromData) => ({
        url: "/taskNotifications/addDueDateNotification",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;

          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("taskNotification", data.data, (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Add Status notification ******************************************************
    notifiyStatus: builder.mutation({
      query: (fromData) => ({
        url: "/taskNotifications/addStatusNotification",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;

          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("taskNotification", data.data, (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Add Priority notification ******************************************************
    notifiyPriority: builder.mutation({
      query: (fromData) => ({
        url: "/taskNotifications/addPriorityNotification",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;

          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("taskNotification", data.data, (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
    //* Add Stages notification ******************************************************
    notifiyStages: builder.mutation({
      query: (fromData) => ({
        url: "/taskNotifications/addStagesNotifications",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;

          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("taskNotification", data.data, (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Get Task Notifications ******************************************************
    getTaskNotification: builder.query({
      query: (taskId) => ({
        url: "/taskNotifications/getTaskNotifications",
        method: "POST",
        body: { taskId: taskId },
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getTaskNotifications(data.data));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
  }),
});

export const {
  useNotifiyProgressAddMutation,
  useNotifiyAssignDateMutation,
  useNotifiyDueDateMutation,
  useNotifiyStatusMutation,
  useNotifiyPriorityMutation,
  useNotifiyStagesMutation,
  useGetTaskNotificationQuery,
} = taskNotificationApi;
