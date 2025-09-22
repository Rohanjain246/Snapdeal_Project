import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cartReducer from "./CartSlice";
import productReducer from "./ProductSlice";
import CategorySlice from "./MenuItemSlice";
import PincodeSlice from "./PincodeSlice";

// combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  menuItem: CategorySlice,
  pincode: PincodeSlice,
});

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "products", "pincode", "menuItem"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
