import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getTasks, getTodaysTask, getselectedTask } from "../slice/taskSlice";
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
            taskApi.util.invalidateTags([{ type: "bringselectedtask" }])
          );
          obj.dispatch(taskApi.util.invalidateTags([{type:"bringtodaystask"}]))

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
            taskApi.util.invalidateTags([{ type: "bringselectedtask" }])
          );
          obj.dispatch(taskApi.util.invalidateTags([{type:"bringtodaystask"}]))

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
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Adjust Task *****************************************************
    adjustTask: builder.mutation({
      query: (fromData) => ({
        url: "/task/adjusttask",
        method: "POST",
        body: fromData,
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(taskApi.util.invalidateTags([{ type: "bringtask" }]));
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
          obj.dispatch(taskApi.util.invalidateTags([{type:"bringtodaystask"}]))
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

    //* Get selected Task *********************************************************
    getSelectedTask: builder.mutation({
      providesTags: (result, error, taskId) => [
        { type: "bringselectedtask", taskId },
      ],
      query: (taskId) => ({
        url: "/task/getselectedtast",
        method: "POST",
        body: { taskId: taskId },
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getselectedTask(data.data[0]));
        } catch (error) {
          console.error("Error....", error);
        }
      },
    }),

    //* Get selected Task *********************************************************
    getTodaysTask: builder.query({
      providesTags:()=>[{type:"bringtodaystask"}],
      query: () => ({
        url: "/task/todaystask",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getTodaysTask(data.data));
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
  useAdjustTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useGetSelectedTaskMutation,
  useGetTodaysTaskQuery
} = taskApi;
