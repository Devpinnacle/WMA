import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks(state, { payload }) {
      state.tasks = payload;
    },
  },
});

export const { getTasks } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;
