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
import { reportReducer } from "./slice/reportSlice";
import { reportApi } from "./api/reportApi";
import { calenderReducer } from "./slice/calenderSlice";
import { chatsReducer } from "./slice/chatSlice";
import { chatApi } from "./api/chatApi";

export const store = configureStore({
  reducer: {
    calender: calenderReducer,
    user: userReducer,
    notes: notesReducer,
    project: projectReducer,
    section: sectionReducer,
    task: taskReducer,
    notifications: notificationsReducer,
    taskNotifications: taskNotificationsReducer,
    report: reportReducer,
    chats: chatsReducer,
    [userApi.reducerPath]: userApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [notificationApi.reducerPath]: notesApi.reducer,
    [taskNotificationApi.reducerPath]: taskNotificationApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userApi.middleware,
    notesApi.middleware,
    projectApi.middleware,
    sectionApi.middleware,
    taskApi.middleware,
    notificationApi.middleware,
    taskNotificationApi.middleware,
    reportApi.middleware,
    chatApi.middleware,
  ],
  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);
