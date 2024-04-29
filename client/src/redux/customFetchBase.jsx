import { Mutex } from "async-mutex";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { isLoggedOut, setTokens } from "./slice/userSlice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().user.accessToken;
    const refreshToken = getState().user.refreshToken;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    headers.set("refreshToken", refreshToken);
    return headers;
  },
});

const customFetchBase = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.data?.message === "Please login to proceed!") {
    if(!mutex.isLocked()){
      const release=await mutex.acquire();
      try{
        const refreshResult=await baseQuery(
          {
            url: "/user/refresh",
          },
          api,
          extraOptions
        );
        if (refreshResult?.data) {
          // retry the initial query
          const { accessToken, refreshToken } = refreshResult.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          api.dispatch(setTokens({ accessToken, refreshToken }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(isLoggedOut());
        }
      }
      finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export default customFetchBase;
