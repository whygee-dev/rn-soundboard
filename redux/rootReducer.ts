import { combineReducers } from "@reduxjs/toolkit";
import { default as samplesReducer } from "./slices/samplesSlice";
import { default as extrasReducer } from "./slices/extrasSlice";

export const rootReducer = combineReducers({
  samples: samplesReducer,
  extras: extrasReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
