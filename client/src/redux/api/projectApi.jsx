import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getProject } from "../slice/projectSlice";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getProject: builder.query({
      providesTags:()=>[{type:"bringprojects"}],
      query: () => ({
        url: "/project/getproject",
        method: "GET",
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getProject(data.data));
        } catch (error) {
          console.log("Error....", error);
        }
      },
    }),

    addProject: builder.mutation({
      query: (fromData) => ({
        url: "/project/addproject",
        method: "POST",
        body:fromData
      }),
      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
         obj.dispatch(projectApi.util.invalidateTags([{type:"bringprojects"}]))
        } catch (error) {
          console.log("Error....", error);
        }
      },
    }),
  }),
});

export const { useGetProjectQuery,useAddProjectMutation } = projectApi;
