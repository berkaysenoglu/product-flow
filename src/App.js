import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { LoggedInProvider } from "./contexts/LoggedInContext";
import ProductAdmin from "./pages/ProductAdmin";
import { ProductDetail } from "./pages/ProductDetail";

function App() {
  return (
    <>
      <LoggedInProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/:productId" element={<ProductDetail />} />
        </Routes>
      </LoggedInProvider>
    </>
  );
}

export default App;
