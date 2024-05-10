import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    getChats(state, { payload }) {
      state.chats = payload;
    },
  },
});

export const { getChats } = chatsSlice.actions;

export const chatsReducer = chatsSlice.reducer;
