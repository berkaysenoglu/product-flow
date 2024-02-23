import "./App.css";
import { LoggedInProvider } from "./contexts/LoggedInContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
function App() {
  return (
    <>
      <Login></Login>
    </>
  );
}

export default App;
