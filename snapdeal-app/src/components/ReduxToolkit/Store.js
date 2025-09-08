import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
// import thunk from "redux-thunk";
import cartReducer from "./CartSlice";

// combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
});

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //   middleware: [thunk],
});

export const persistor = persistStore(store);
