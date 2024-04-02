import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getUser, setTokens } from "../slice/userSlice";

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
          localStorage.setItem("accessToken", data.accessToken);
          obj.dispatch(
            setTokens({
              accessToken: data.accessToken,
            })
          );
          obj.dispatch(userApi.util.invalidateTags([{ type: "me" }]));
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
  }),
});

export const { useLoginMutation, useGetMeQuery } = userApi;
