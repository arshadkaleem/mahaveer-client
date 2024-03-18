import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
  users: [],
  userinfo: {},
};

const user = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setadmin: (state, action) => {
      state.admin = action.payload;
    },
    setUser: (state, action) => {
      state.userinfo = action.payload;
    },
    emptyAdmin: (state) => {
      return initialState; // Reset the state to its initial values
    },
  },
});

export const { setadmin, setUser, emptyAdmin } = user.actions;
export default user.reducer;
