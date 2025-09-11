import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    selectedItem: {},
    isBuyNow: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    currentCartItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    isBuyNowAction: (state, action) => {
      state.isBuyNow = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  currentCartItem,
  isBuyNowAction,
} = cartSlice.actions;
export default cartSlice.reducer;
