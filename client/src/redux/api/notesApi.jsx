import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getNotes } from "../slice/notesSlice";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: "/notes/getnotes",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          console.log("noteapi hittt....");
          const { data } = await obj.queryFulfilled;
          console.log(data.data);
          obj.dispatch(getNotes(data.data));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
  }),
});

export const { useGetNotesQuery } = notesApi;
