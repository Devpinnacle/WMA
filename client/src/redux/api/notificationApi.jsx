import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getNotifications } from "../slice/notificationSlice";
import io from "socket.io-client";
import { useSelector } from "react-redux";
const socket = io(import.meta.env.VITE_SOCKET_URL);

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
          socket.emit("updateNotification", "updateNotification", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
          if (data.data !== undefined) {
            socket.emit("userNotification", data.data, (res) => {
              if (res.error) {
                console.log("socket error", error);
              }
            });
          }
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
          socket.emit("updateNotification", "updateNotification", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
          socket.emit("userNotification", data.data, (res) => {
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
          socket.emit("updateNotification", "updateNotification", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Add Task notification ******************************************************
    notifiyTaskAdd: builder.mutation({
      query: (fromData) => ({
        url: "/notifications/notifyaddtask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("updateNotification", "updateNotification", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });

          if (Array.isArray(data.data)) {
            socket.emit("updateTaskNotification", data.data, (res) => {
              if (res.error) {
                console.log("socket error", error);
              }
            });
          } else {
            socket.emit("userNotification", data.data, (res) => {
              if (res.error) {
                console.log("socket error", error);
              }
            });
          }
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Edit Task notification ******************************************************
    notifiyTaskEdit: builder.mutation({
      query: (fromData) => ({
        url: "/notifications/notifyedittask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("updateNotification", "updateNotification", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });

          socket.emit("userNotification", data.data, (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Delete Task notification ******************************************************
    notifiyTaskDelete: builder.mutation({
      query: (fromData) => ({
        url: "/notifications/notifydeletetask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("updateNotification", "updateNotification", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
          socket.emit("userNotification", data.data, (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Update Task Progress notification ******************************************************
    notifiyTaskProgress: builder.mutation({
      query: (fromData) => ({
        url: "/notifications/notifyprogresstask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          // const user = useSelector((state) => state.user);
          if (socket.disconnected) {
            socket.connect();
          }
   
          socket.emit("updateNotification", "updateNotification", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        
          socket.emit("userNotification", data.data, (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Notes Task notification ******************************************************
    notifiyTaskNotes: builder.mutation({
      query: (fromData) => ({
        url: "/notifications/notifynotestask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          // const user = useSelector((state) => state.user);
          if (socket.disconnected) {
            socket.connect();
          }
          socket.emit("updateNotification", "updateNotification", (res) => {
            if (res.error) {
              console.log("socket error", error);
            }
          });

          socket.emit("userNotification", data.data, (res) => {
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
  useNotifiyTaskAddMutation,
  useNotifiyTaskEditMutation,
  useNotifiyTaskDeleteMutation,
  useNotifiyTaskProgressMutation,
  useNotifiyTaskNotesMutation,
  useGetNotificationQuery,
} = notificationApi;
