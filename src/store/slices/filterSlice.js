import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    fromVal: 0,
    toVal: 0,
    isDiscounted: false,
    showByDefault: true,
    showHighLow: false,
    showLowHigh: false,
  },
  reducers: {
    assignFromVal(state, action) {
      state.fromVal = action.payload;
    },
    assignToVal(state, action) {
      state.toVal = action.payload;
    },
    changeIsDiscounted(state, action) {
      state.isDiscounted = action.payload;
    },
    changeShowByDefault(state, action) {
      state.showByDefault = action.payload;
    },
    changeShowHighLow(state, action) {
      state.showHighLow = action.payload;
    },
    changeShowLowHigh(state, action) {
      state.showLowHigh = action.payload;
    },
  },
});

export const {
  assignFromVal,
  assignToVal,
  changeIsDiscounted,
  changeShowByDefault,
  changeShowHighLow,
  changeShowLowHigh,
} = filterSlice.actions;
export default filterSlice.reducer;
