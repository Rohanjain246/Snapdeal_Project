import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    storeProduct: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { storeProduct } = products.actions;
export default products.reducer;
