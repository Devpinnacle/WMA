import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/userSlice";
import { userApi } from "./api/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { notesReducer } from "./slice/notesSlice";
import { notesApi } from "./api/notesApi";
import { projectReducer } from "./slice/projectSlice";
import { projectApi } from "./api/projectApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    project: projectReducer,
    [userApi.reducerPath]: userApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userApi.middleware,
    notesApi.middleware,
    projectApi.middleware,
  ],
  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);
