

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartslice";

const isClient = typeof window !== "undefined";
const savedCart = isClient ? localStorage.getItem("cart") : null;
const cartItems = savedCart ? JSON.parse(savedCart) : [];

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  preloadedState: {
    cart: {
      listSP: cartItems,
      order: {},
    },
  },
});

store.subscribe(() => {
  if (isClient) {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart.listSP));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
