import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: [],
  selectedProject: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProject(state, { payload }) {
      state.project = payload;
    },
    setSelectedProject(state, { payload }) {
      state.selectedProject = payload;
    },
  },
});

export const { getProject, setSelectedProject } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
