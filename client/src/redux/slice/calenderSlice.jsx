import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateStr: new Date().toUTCString(),
  dateRange: JSON.parse(localStorage.getItem("dateRange")) || null,
};

const calenderSlice = createSlice({
  name: "calender",
  initialState,
  reducers: {
    setDateRange(state, { payload }) {
      state.dateRange = payload;
      localStorage.setItem("dateRange", JSON.stringify(payload));
    },
  },
});

export const {
  setDateRange
} = calenderSlice.actions;
export const calenderReducer=calenderSlice.reducer

