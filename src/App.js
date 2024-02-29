import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoggedInProvider } from "./contexts/LoggedInContext";
function App() {
  return (
    <>
      <LoggedInProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </LoggedInProvider>
    </>
  );
}

export default App;
