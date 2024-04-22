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
import { taskReducer } from "./slice/taskSlice";
import { taskApi } from "./api/taskApi";
import { notificationsReducer } from "./slice/notificationSlice";
import { notificationApi } from "./api/notificationApi";
import { taskNotificationsReducer } from "./slice/taskNotificationSlice";
import { taskNotificationApi } from "./api/taskNotificationApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    project: projectReducer,
    section: sectionReducer,
    task: taskReducer,
    notifications: notificationsReducer,
    taskNotifications:taskNotificationsReducer,
    [userApi.reducerPath]: userApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [notificationApi.reducerPath]: notesApi.reducer,
    [taskNotificationApi.reducerPath]:taskNotificationApi.reducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userApi.middleware,
    notesApi.middleware,
    projectApi.middleware,
    sectionApi.middleware,
    taskApi.middleware,
    notificationApi.middleware,
    taskNotificationApi.middleware
  ],
  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);
