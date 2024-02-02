import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import cartSlice from "./slices/cartSlice";

export default configureStore({
  reducer: {
    products: productSlice,
    categories: categorySlice,
    cart: cartSlice,
  },
});
