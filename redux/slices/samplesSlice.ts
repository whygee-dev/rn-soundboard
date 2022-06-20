import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_SAMPLES } from "../../tools/constants";
import { RootState } from "../rootReducer";
import { Sample } from "../types";

type InitialState = { activeSamples: Sample[]; librarySamples: Sample[]; searchSamples: Sample[]; searchInput: string };

const initialState: InitialState = { librarySamples: DEFAULT_SAMPLES, activeSamples: DEFAULT_SAMPLES, searchSamples: [], searchInput: "" };

const samplesSlice = createSlice({
  name: "samples",
  initialState: initialState,
  reducers: {
    setActiveSamples(state, action: PayloadAction<Sample[]>) {
      state.activeSamples = action.payload;
    },

    addActiveSampleAt(state, action: PayloadAction<{ position: number; sample: Sample }>) {
      state.activeSamples[action.payload.position] = action.payload.sample;
    },

    setLibrarySamples(state, action: PayloadAction<Sample[]>) {
      state.librarySamples = action.payload;
    },

    addLibrarySample(state, action: PayloadAction<Sample>) {
      state.librarySamples.push(action.payload);
    },

    removeLibrarySample(state, action: PayloadAction<Sample>) {
      state.librarySamples = state.librarySamples.filter((s) => s.id !== action.payload.id);
    },

    updateLibrarySample(state, action: PayloadAction<Sample>) {
      const index = state.librarySamples.findIndex((s) => s.id === action.payload.id);

      if (index === -1) return;

      state.librarySamples[index] = action.payload;
    },

    setSearchSamples(state, action: PayloadAction<Sample[]>) {
      state.searchSamples = action.payload;
    },

    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload;
    },
  },
});

const { actions, reducer } = samplesSlice;

export const {
  setLibrarySamples,
  setActiveSamples,
  setSearchSamples,
  setSearchInput,
  addActiveSampleAt,
  removeLibrarySample,
  addLibrarySample,
  updateLibrarySample,
} = actions;

export const selectActiveSamples = (state: RootState) => state.samples.activeSamples;
export const selectLibrarySamples = (state: RootState) => state.samples.librarySamples;
export const selectSearchSamples = (state: RootState) => state.samples.searchSamples;
export const selectSearchInput = (state: RootState) => state.samples.searchInput;

export default reducer;
