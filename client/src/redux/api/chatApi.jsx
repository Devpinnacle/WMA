import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getChats } from "../slice/chatSlice";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({
        url: "/chats/getchats",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getChats(data.data));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
  }),
});

export const {useGetChatsQuery}=chatApi
