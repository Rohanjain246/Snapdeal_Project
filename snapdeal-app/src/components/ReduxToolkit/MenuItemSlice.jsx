import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "menuItem",
  initialState: {
    category: "",
    menuCategory: "",
    subCategory: "",
  },
  reducers: {
    selectedCategory: (state, action) => {
      state.category = action.payload;
    },
    menuCategory: (state, action) => {
      state.menuCategory = action.payload;
    },
    subCategory: (state, action) => {
      state.subCategory = action.payload;
    },
  },
});

export const { selectedCategory, menuCategory, subCategory } =
  CategorySlice.actions;
export default CategorySlice.reducer;
