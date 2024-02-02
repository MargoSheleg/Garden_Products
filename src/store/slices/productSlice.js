import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    const response = await fetch("http://localhost:3333/products/all");
    const data = await response.json();

    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productsFromServer: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.productsFromServer = action.payload;
      })
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default productSlice.reducer;
