import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { LoggedInProvider } from "./contexts/LoggedInContext";
import ProductAdmin from "./pages/ProductAdmin";
function App() {
  return (
    <>
      <LoggedInProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/:productId" element={<ProductAdmin />} />
        </Routes>
      </LoggedInProvider>
    </>
  );
}

export default App;
