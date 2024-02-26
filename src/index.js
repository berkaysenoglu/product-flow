import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoggedInProvider } from "./contexts/LoggedInContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LoggedInProvider>
      <Routes>
        <Route path="/login" element={<App />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </LoggedInProvider>
  </BrowserRouter>
);
