import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: [],
  selectedSection: localStorage.getItem("selectedSection")||null,
};

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    getSections(state, { payload }) {
      state.sections = payload;
    },
    setSelectedSection(state, { payload }) {
      state.selectedSection = payload;
      localStorage.setItem("selectedSection",JSON.stringify(payload))
    },
  },
});

export const { getSections, setSelectedSection } = sectionSlice.actions;

export const sectionReducer = sectionSlice.reducer;
