import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailyReport: [],
  projectReport: [],
  setProject: null,
  selectedProject: [],
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    getDailyReport(state, { payload }) {
      state.dailyReport = payload;
    },
    getProjectReport(state, { payload }) {
      state.projectReport = payload;
    },
    getSetProject(state, { payload }) {
      state.setProject = payload;
    },
    getSelectedProject(state, { payload }) {
      state.selectedProject = payload;
    },
  },
});

export const {
  getDailyReport,
  getProjectReport,
  getSetProject,
  getSelectedProject,
} = reportSlice.actions;

export const reportReducer = reportSlice.reducer;
