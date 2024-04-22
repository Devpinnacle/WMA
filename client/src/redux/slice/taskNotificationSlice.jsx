import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskNotifications: [],
};

const taskNotificationsSlice = createSlice({
    name: "taskNotifications",
    initialState,
    reducers: {
      getTaskNotifications(state, { payload }) {
        state.taskNotifications = payload;
      },
      resetTaskNotifications(state) {
        state.taskNotifications = [];
      },
    },
  });

  export const {getTaskNotifications,resetTaskNotifications}=taskNotificationsSlice.actions;

  export const taskNotificationsReducer=taskNotificationsSlice.reducer;