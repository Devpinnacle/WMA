import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { getProject } from "../slice/projectSlice";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getProject: builder.query({
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
  }),
});

export const { useGetProjectQuery } = projectApi;
