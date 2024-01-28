import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { categorySlice } from "./slices/categorySlice";

export default configureStore({
  reducer: {
    products: productSlice,
    categories: categorySlice,
  },
});
