/// <reference types="redux-persist" />

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 1000 },
      serializableCheck: false,
    }),
});

export type Dispatch = typeof store.dispatch;
