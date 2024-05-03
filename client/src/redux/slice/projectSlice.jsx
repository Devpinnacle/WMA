import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: [],
  selectedProject: localStorage.getItem("selectedProject"),
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
      localStorage.setItem("selectedProject",payload)
    },
  },
});

export const { getProject, setSelectedProject } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
