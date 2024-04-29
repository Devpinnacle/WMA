import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  swUsers: [],
  alertMsg: null,
  alertType: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, { payload }) {
      state.user = payload;
    },
    isLoggedOut(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
    setAlert(state, { payload }) {
      state.alertType = payload.type;
      state.alertMsg =
        payload.type === "error"
          ? payload.msg.data?.message || payload.msg.error
          : payload.msg;
    },
    clearAlert(state) {
      state.alertType = null;
      state.alertMsg = null;
    },
    setTokens(state, { payload }) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    getSwUsers(state, { payload }) {
      state.swUsers = payload;
    },
    resetUser() {
      return initialState;
    },
  },
});

export const {
  getUser,
  isLoggedOut,
  setAlert,
  clearAlert,
  resetUser,
  setTokens,
  getSwUsers,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
