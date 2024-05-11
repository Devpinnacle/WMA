import { createSlice } from "@reduxjs/toolkit";
import { dashedFormatDate } from "../../Helper/helper";

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
    getSingleChat(state,{payload}){
      const date = dashedFormatDate(new Date());
      if (!state.chats[date]) {
        state.chats[date] = [];
      }
      state.chats[date].push(payload);
    }
  },
});

export const { getChats,getSingleChat } = chatsSlice.actions;

export const chatsReducer = chatsSlice.reducer;
