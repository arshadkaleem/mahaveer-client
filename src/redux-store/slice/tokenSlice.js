import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: {},
};

const token = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state, action) => {
      return initialState;
    },
  },
});

export const { setToken, clearToken } = token.actions;
export default token.reducer;
