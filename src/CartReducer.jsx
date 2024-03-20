import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        if (existingItem.quantity >= existingItem.stock) {
          existingItem.quantity = existingItem.stock;
        } else {
          existingItem.quantity++;
        }
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      if (!existingItem || existingItem.quantity < existingItem.stock) {
        state.totalPrice += newItem.price;
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && quantity <= existingItem.stock) {
        existingItem.quantity = quantity;

        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },

    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      const existingItem = state.items.find((item) => item.id === idToRemove);

      if (existingItem) {
        existingItem.quantity--;

        if (existingItem.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== idToRemove);
        }

        state.totalPrice -= existingItem.price;
        if (state.totalPrice < 0) {
          state.totalPrice = 0;
        }
      }
    },

    removeAllFromCart: (state) => {
      state.items = [];

      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, removeAllFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
