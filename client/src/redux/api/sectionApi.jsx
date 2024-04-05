import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getSections } from "../slice/sectionSlice";

export const sectionApi = createApi({
  reducerPath: "sectionApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    //* Add Section ******************************************************
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

    //* Delete Section ***************************************************
    deleteSection: builder.mutation({
      query: (fromData) => ({
        url: "/section/deletesection",
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

    //* Get Section ******************************************************
    getSection: builder.query({
      providesTags: (result, error, projectId) => [
        { type: "bringsection", projectId },
      ],
      query: (projectId) => ({
        url: "/section/getsection",
        method: "POST",
        body: { projectId: projectId },
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

export const {
  useSaveSectionMutation,
  useDeleteSectionMutation,
  useGetSectionQuery,
} = sectionApi;
