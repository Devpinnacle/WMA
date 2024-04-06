import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getTasks } from "../slice/taskSlice";

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

export const { useAddTaskMutation, useGetTaskQuery } = taskApi;
