import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.productsFromServer = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default productSlice.reducer;
