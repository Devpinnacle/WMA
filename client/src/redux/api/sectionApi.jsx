import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getSections } from "../slice/sectionSlice";

export const sectionApi = createApi({
  reducerPath: "sectionApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    saveSection: builder.mutation({
      query: (fromData) => ({
        url: "/section/savesection",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(
            sectionApi.util.invalidateTags([{ type: "bringsection" }])
          );
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    getSection: builder.query({
      providesTags: () => [{ type: "bringsection" }],
      query: () => ({
        url: "/section/getsection",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getSections(data.data));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
  }),
});

export const { useSaveSectionMutation, useGetSectionQuery } = sectionApi;
