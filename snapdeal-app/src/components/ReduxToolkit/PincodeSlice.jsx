import { createSlice } from "@reduxjs/toolkit";

const PincodeSlice = createSlice({
  name: "pincode",
  initialState: {
    pincode: "",
    alert: false,
  },
  reducers: {
    addPincode: (state, action) => {
      state.pincode = action.payload;
    },
    removePincode: (state) => {
      state.pincode = "";
    },
    alertBar: (state, action) => {
      state.alert = action.payload;
    },
  },
});
export const { addPincode, removePincode, alertBar } = PincodeSlice.actions;
export default PincodeSlice.reducer;
