import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cartReducer from "./CartSlice";
import productReducer from "./ProductSlice";

// combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "products"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
