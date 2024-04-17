import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    getNotifications(state, { payload }) {
      state.notifications = payload;
    },
  },
});

export const {getNotifications}=notificationsSlice.actions;

export const notificationsReducer=notificationsSlice.reducer;
