import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: [],
};

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    getSections(state, { payload }) {
      state.sections = payload;
    },
  },
});

export const { getSections } = sectionSlice.actions;

export const sectionReducer = sectionSlice.reducer;
