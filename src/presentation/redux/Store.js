import { combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { favsReducer } from "./FavsReducer";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer } from "./AuthReducer";

const rootReducer = combineReducers({
  favs: favsReducer,
  auth: authReducer,
});

const config = { key: "root", storage: AsyncStorage };
const persistedReducer = persistReducer(config, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistore = persistStore(store);
