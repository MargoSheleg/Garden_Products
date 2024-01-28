import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
    const response = await fetch("");
    const data = await response.json();

    return data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoriesFromServer: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categoriesFromServer = action.payload;
      })
      .addCase(fetchAllCategories.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
