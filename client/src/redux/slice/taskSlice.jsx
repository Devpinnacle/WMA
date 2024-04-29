import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  selectedTask: null,
  todaysTask: [],
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
    getTodaysTask(state, { payload }) {
      state.todaysTask = payload;
    },
  },
});

export const { getTasks, getselectedTask, resetSelectedTask, getTodaysTask } =
  taskSlice.actions;

export const taskReducer = taskSlice.reducer;
