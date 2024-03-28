import { Mutex } from "async-mutex";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
  prepareHeaders: (header, { getState }) => {
    const accessToken = getState().user.accessToken;

    if (accessToken) {
      header.set("authorization", `Bearer ${accessToken}`);
    }
    return header;
  },
});

const customFetchBase = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.data?.message === "Please login to proceed!") {
       console.log("Please login to proceed!")
  }
  return result;
};

export default customFetchBase;
