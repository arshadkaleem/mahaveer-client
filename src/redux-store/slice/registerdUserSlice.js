import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
};

const userInfo = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.allUsers = action.payload;
    },
    emptyUser: (state) => {
      return initialState; // Reset the state to its initial values
    },
  },
});

export const { setUserData, emptyUser } = userInfo.actions;
export default userInfo.reducer;
