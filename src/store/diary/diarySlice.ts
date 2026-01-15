import { createSlice } from '@reduxjs/toolkit';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    initialized: false,
    entries: [],
  },
  reducers: {
    addEntry: (state, action) => {
      state.entries = [action.payload, ...state.entries];
    },
    initEntries: (state, action) => {
      state.entries.push(...action.payload);
      state.initialized = true;
    },
  },
  selectors: {
    diaryEntries: (state) => state.entries,
    initialized: (state) => state.initialized,
  },
});

export const { addEntry, initEntries } = diarySlice.actions;
export const { diaryEntries, initialized } = diarySlice.selectors;

export default diarySlice.reducer;
