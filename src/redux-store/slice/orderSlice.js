import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setAllOrders: (state, action) => {
      state.orders = action.payload;
    },
    emptyOders: (state) => {
      return initialState; // Reset the state to its initial values
    },
  },
});

export const { setAllOrders, emptyOders } = orders.actions;
export default orders.reducer;
