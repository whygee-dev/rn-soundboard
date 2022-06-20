import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { AVPlaybackStatus } from "../types";

type InitialState = { fetchTimeout: ReturnType<typeof setTimeout> | null; playbackStatus: AVPlaybackStatus };

const initialState: InitialState = { fetchTimeout: null, playbackStatus: null };

const extrasSlice = createSlice({
  name: "extras",
  initialState: initialState,
  reducers: {
    setFetchTimeout(state, action: PayloadAction<ReturnType<typeof setTimeout> | null>) {
      state.fetchTimeout = action.payload;
    },
  },
});

const { actions, reducer } = extrasSlice;

export const { setFetchTimeout } = actions;

export const selectFetchTimeout = (state: RootState) => state.extras.fetchTimeout;

export default reducer;
