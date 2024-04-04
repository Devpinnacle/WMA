import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/userSlice";
import { userApi } from "./api/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { notesReducer } from "./slice/notesSlice";
import { notesApi } from "./api/notesApi";
import { projectReducer } from "./slice/projectSlice";
import { projectApi } from "./api/projectApi";
import { sectionReducer } from "./slice/sectionSlice";
import { sectionApi } from "./api/sectionApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    project: projectReducer,
    section: sectionReducer,
    [userApi.reducerPath]: userApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userApi.middleware,
    notesApi.middleware,
    projectApi.middleware,
    sectionApi.middleware,
  ],
  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);
