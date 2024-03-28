import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/userSlice";
import { userApi } from "./api/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userApi.middleware
  ],
  devTools:import.meta.env.DEV
});

setupListeners(store.dispatch);