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

        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Edit Section ******************************************************
    editSection: builder.mutation({
      query: (fromData) => ({
        url: "/section/editsection",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
     
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

        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Get Section ******************************************************
    getSection: builder.mutation({

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

    //* Get Section ******************************************************
    getSelectedSection: builder.mutation({
      query: (Id) => ({
        url: "/section/setselectedsection",
        method: "POST",
        body: { Id: Id },
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          return data.data
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
  }),
});

export const {
  useSaveSectionMutation,
  useEditSectionMutation,
  useDeleteSectionMutation,
  useGetSectionMutation,
  useGetSelectedSectionMutation,
} = sectionApi;
