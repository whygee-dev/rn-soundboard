import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_SAMPLES } from "../../tools/constants";
import { RootState } from "../rootReducer";
import { Sample, SampleFilter, SampleType, SAMPLE_FILTERS } from "../types";

type InitialState = { activeSamples: Sample[]; librarySamples: Sample[]; searchSamples: Sample[]; searchInput: string; filters: SampleFilter[] };

const initialState: InitialState = {
  librarySamples: DEFAULT_SAMPLES,
  activeSamples: DEFAULT_SAMPLES,
  searchSamples: [],
  searchInput: "",
  filters: SAMPLE_FILTERS,
};

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
      if (action.payload.type === SampleType.DEFAULT) return;

      const active = state.activeSamples.findIndex((sample) => sample.id === action.payload.id);

      if (active !== -1) {
        state.activeSamples[active] = DEFAULT_SAMPLES[active];
      }

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

    setFilters(state, action: PayloadAction<SampleFilter[]>) {
      state.filters = action.payload;
    },

    addFilter(state, action: PayloadAction<SampleFilter>) {
      state.filters.push(action.payload);
    },

    removeFilter(state, action: PayloadAction<SampleFilter>) {
      state.filters = state.filters.filter((f) => f.type !== action.payload.type);
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
  setFilters,
  addFilter,
  removeFilter,
} = actions;

export const selectActiveSamples = (state: RootState) => state.samples.activeSamples;
export const selectLibrarySamples = (state: RootState) => state.samples.librarySamples;
export const selectFilteredLibrarySamples = (state: RootState) =>
  state.samples.librarySamples.filter((s) => state.samples.filters.find((f) => f.type === s.type));
export const selectSearchSamples = (state: RootState) => state.samples.searchSamples;
export const selectSearchInput = (state: RootState) => state.samples.searchInput;
export const selectFilters = (state: RootState) => state.samples.filters;

export default reducer;
