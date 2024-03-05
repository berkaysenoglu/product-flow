import { createSlice } from "@reduxjs/toolkit";
import ProductsData from "./products.json";

const productSlice = createSlice({
  name: "products",
  initialState: ProductsData.products,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, name, price, category } = action.payload;
      const updatedProduct = state.find((product) => product.id == id);
      if (updatedProduct) {
        updatedProduct.name = name;
        updatedProduct.price = price;
        updatedProduct.category = category;
      }
    },
  },
});
export const { addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
