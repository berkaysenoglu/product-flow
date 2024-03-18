import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Sepetteki ürünlerin listesi
  totalPrice: 0, // Sepetteki toplam fiyat
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        // Eğer ürün sepette yoksa yeni ürün olarak ekle
        state.items.push({ ...newItem, quantity: 1 });
      }

      // Sepet toplam fiyatını güncelle
      state.totalPrice += newItem.price;
    },
    // Sepetten ürün çıkarma işlemi
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      const existingItem = state.items.find((item) => item.id === idToRemove);

      if (existingItem) {
        // Eğer ürün sepette varsa miktarını azalt
        existingItem.quantity--;

        // Eğer ürünün miktarı 0'a düştüyse sepetteki ürünü kaldır
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== idToRemove);
        }

        // Sepet toplam fiyatını güncelle
        state.totalPrice -= existingItem.price;
      }
    },
    // Sepetten tüm ürünleri kaldırma işlemi
    removeAllFromCart: (state) => {
      // Sepetten tüm ürünleri kaldır
      state.items = [];
      // Sepet toplam fiyatını sıfırla
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, removeAllFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
