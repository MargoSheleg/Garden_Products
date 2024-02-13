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
    onlyDiscountedProducts: [],
  },
  reducers: {
    getOnlyDiscountedProducts(state) {
      state.productsFromServer.filter((el) => {
        return el.discont_price !== null;
      });
    },
  },
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

export const { getOnlyDiscountedProducts } = productSlice.actions;
export default productSlice.reducer;
