import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailyReport: [],
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    getDailyReport(state, { payload }) {
      state.dailyReport = payload;
    },
  },
});

export const {getDailyReport}=reportSlice.actions;

export const reportReducer=reportSlice.reducer;