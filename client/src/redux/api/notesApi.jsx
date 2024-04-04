import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getNotes } from "../slice/notesSlice";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    saveNotes: builder.mutation({
      query: (fromData) => ({
        url: "/notes/savenotes",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(notesApi.util.invalidateTags([{ type: "bringnotes" }]));
        } catch (error) {
          console.error("Error saving notes:", error);
        }
      },
    }),

    deleteNotes: builder.mutation({
      query: (fromData) => ({
        url: "/notes/deletenotes",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(notesApi.util.invalidateTags([{ type: "bringnotes" }]));
        } catch (error) {
          console.log("Error delete notes:", error);
        }
      },
    }),

    getNotes: builder.query({
      providesTags: () => [{ type: "bringnotes" }],
      query: () => ({
        url: "/notes/getnotes",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getNotes(data.data));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
  }),
});

export const {
  useSaveNotesMutation,
  useDeleteNotesMutation,
  useGetNotesQuery,
} = notesApi;
