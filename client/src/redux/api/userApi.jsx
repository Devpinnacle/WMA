import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getSwUsers, getUser, isLoggedOut, setAlert, setLogStatus, setStatus, setTokens, setUserId } from "../slice/userSlice";
import { notesApi } from "./notesApi";
import { notificationApi } from "./notificationApi";
import { projectApi } from "./projectApi";
import { reportApi } from "./reportApi";
import { sectionApi } from "./sectionApi";
import { taskApi } from "./taskApi";
import { taskNotificationApi } from "./taskNotificationApi";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (fromData) => ({
        url: "/user/login",
        method: "POST",
        body: fromData,
      }),

      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          // const socket = io(import.meta.env.VITE_SOCKET_URL);
          console.log("api login",data)
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          console.log(data.status);
          obj.dispatch(setLogStatus(data.status))
          obj.dispatch(setUserId(data.userId))
          // dispatch(setAlert({ type: "success", msg: "Welcome" }));
          // socket.emit("login", data.userId);
          obj.dispatch(
            setTokens({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
          // obj.dispatch(notificationApi.util.invalidateTags([ "log" ]));
          // obj.dispatch(userApi.util.invalidateTags([ "me" ]));
          
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    getMe: builder.query({
      providesTags: () => [{ type: "me" }],
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getUser(data.data.user));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Get Users Group is Software **************************************
    getSwUsers: builder.query({
      query: () => ({
        url: "/user/getswuser",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getSwUsers(data.data));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
    //* logout ***********************************************************
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        body: {},
      }),

      async onQueryStarted(args, obj) {
        try {
          const {data}= await obj.queryFulfilled;
          console.log("hit logout api", data)
          obj.dispatch(setStatus(data.status))
          localStorage.clear();
          obj.dispatch(isLoggedOut())
          obj.dispatch(notesApi.util.resetApiState())
          obj.dispatch(notificationApi.util.resetApiState())
          obj.dispatch(projectApi.util.resetApiState())
          obj.dispatch(reportApi.util.resetApiState())
          obj.dispatch(sectionApi.util.resetApiState())
          obj.dispatch(taskApi.util.resetApiState())
          obj.dispatch(taskNotificationApi.util.resetApiState())
        } catch (error) {
          console.error("Error:", error);
        }
      },
    }),

  }),
});

export const { useLoginMutation, useGetMeQuery,useGetSwUsersQuery,useLogoutMutation } = userApi;
