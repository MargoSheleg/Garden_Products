import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    pushToCart(state, action) {
      state.cart.push(action.payload);
    },

    makeCartEmpty(state) {
      state.cart = [];
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter((obj) => {
        return obj.id !== action.payload.id;
      });
    },

    getCartFromLocalStorage(state) {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      state.cart = storedCart || [];
    },

    saveCartAtLocalStorage(state) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    addQuantityKeyToCart(state) {
      state.cart = state.cart.map((el) => ({ ...el, quantity: 1 }));
    },
  },
});

export const {
  pushToCart,
  makeCartEmpty,
  removeFromCart,
  getCartFromLocalStorage,
  saveCartAtLocalStorage,
  addQuantityKeyToCart,
} = cartSlice.actions;
export default cartSlice.reducer;
