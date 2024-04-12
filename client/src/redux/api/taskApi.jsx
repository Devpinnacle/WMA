import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getTasks } from "../slice/taskSlice";
import { sectionApi } from "./sectionApi";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    //* Add Task *********************************************************
    addTask: builder.mutation({
      query: (fromData) => ({
        url: "/task/addtask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(taskApi.util.invalidateTags([{ type: "bringtask" }]));
          obj.dispatch(
            sectionApi.util.invalidateTags([{ type: "bringsection" }])
          );
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Update Task settings *********************************************
    updateTaskStg: builder.mutation({
      query: (fromData) => ({
        url: "/task/updatetasksettings",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(taskApi.util.invalidateTags([{ type: "bringtask" }]));
          obj.dispatch(
            sectionApi.util.invalidateTags([{ type: "bringsection" }])
          );
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Update Daily task ************************************************
    updateDailyTask: builder.mutation({
      query: (fromData) => ({
        url: "/task/updatedailytask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(taskApi.util.invalidateTags([{ type: "bringtask" }]));
          obj.dispatch(
            sectionApi.util.invalidateTags([{ type: "bringsection" }])
          );
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Update Notes *****************************************************
    updateNotes: builder.mutation({
      query: (fromData) => ({
        url: "/task/updatenotes",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(taskApi.util.invalidateTags([{ type: "bringtask" }]));
          obj.dispatch(
            sectionApi.util.invalidateTags([{ type: "bringsection" }])
          );
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Update Notes *****************************************************
    adjustNotes: builder.mutation({
      query: (fromData) => ({
        url: "/task/adjusttask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(taskApi.util.invalidateTags([{ type: "bringtask" }]));
          obj.dispatch(
            sectionApi.util.invalidateTags([{ type: "bringsection" }])
          );
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Delete Task *****************************************************
    deleteTask: builder.mutation({
      query: (fromData) => ({
        url: "/task/deletetask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(taskApi.util.invalidateTags([{ type: "bringtask" }]));
          obj.dispatch(
            sectionApi.util.invalidateTags([{ type: "bringsection" }])
          );
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Get Task *********************************************************
    getTask: builder.query({
      providesTags: (result, error, sectionId) => [
        { type: "bringtask", sectionId },
      ],
      query: (sectionId) => ({
        url: "/task/gettast",
        method: "POST",
        body: { sectionId: sectionId },
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getTasks(data.data));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),
  }),
});

export const {
  useAddTaskMutation,
  useUpdateTaskStgMutation,
  useUpdateDailyTaskMutation,
  useUpdateNotesMutation,
  useAdjustNotesMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
} = taskApi;
