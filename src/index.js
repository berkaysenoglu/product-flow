import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductReducer";
const store = configureStore({
  reducer: {
    products: ProductReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
