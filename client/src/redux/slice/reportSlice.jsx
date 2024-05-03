import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailyReport: [],
  projectReport: [],
  setProject: localStorage.getItem("setProject")||null,
  selectedProject: [],
  userReport: [],
  setUser: localStorage.getItem("setUser")||null,
  selectedUser: [],
  chart:[],
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
      localStorage.setItem("setProject",payload)
    },
    getSelectedProject(state, { payload }) {
      state.selectedProject = payload;
    },
    getUserReport(state, { payload }) {
      state.userReport = payload;
    },
    getSetUser(state, { payload }) {
      state.setUser = payload;
      localStorage.setItem("setUser",payload)
    },
    getSelectedUser(state, { payload }) {
      state.selectedUser = payload;
    },
    getChartData(state,{payload}){
      state.chart=payload;
    }
  },
});

export const {
  getDailyReport,
  getProjectReport,
  getSetProject,
  getSelectedProject,
  getUserReport,
  getSetUser,
  getSelectedUser,
  getChartData,
} = reportSlice.actions;

export const reportReducer = reportSlice.reducer;
