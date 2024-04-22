import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  selectedTask: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks(state, { payload }) {
      state.tasks = payload;
    },
    getselectedTask(state, { payload }) {
      state.selectedTask = payload;
    },
    resetSelectedTask(state) {
      state.selectedTask = null;
    },
  },
});

export const { getTasks, getselectedTask, resetSelectedTask } =
  taskSlice.actions;

export const taskReducer = taskSlice.reducer;
