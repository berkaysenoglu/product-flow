import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { LoggedInProvider } from "./contexts/LoggedInContext";

import ProductAdmin from "./pages/ProductAdmin";
import { ProductDetail } from "./pages/ProductDetail";
import { SearchTextProvider } from "./contexts/SearchTextContext";

function App() {
  return (
    <>
      <LoggedInProvider>
        <SearchTextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/:productId" element={<ProductDetail />} />
          </Routes>
        </SearchTextProvider>
      </LoggedInProvider>
    </>
  );
}

export default App;
