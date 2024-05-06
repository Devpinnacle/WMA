import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: [],
  selectedProject: localStorage.getItem("selectedProject")||null,
  selectedProjectName: localStorage.getItem("selectedProjectName") || null,
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
      localStorage.setItem("selectedProject", payload);
    },
    setSelectedProjectName(state, { payload }) {
      state.selectedProjectName = payload;
      localStorage.setItem("selectedProjectName", payload);
    },
  },
});

export const { getProject, setSelectedProject ,setSelectedProjectName} = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
