import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/userSlice";
import { userApi } from "./api/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { notesReducer } from "./slice/notesSlice";
import { notesApi } from "./api/notesApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes:notesReducer,
    [userApi.reducerPath]: userApi.reducer,
    [notesApi.reducerPath]:notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userApi.middleware,
    notesApi.middleware,
  ],
  devTools:import.meta.env.DEV
});

setupListeners(store.dispatch);