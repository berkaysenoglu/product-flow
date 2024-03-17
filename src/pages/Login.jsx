import React from "react";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { useEffect } from "react";
import WaveSVG from "../components/WaveSVG";
const Login = () => {
  const navigate = useNavigate();
  const { loggedIn } = useLoggedInContext();
  useEffect(() => {
    if (loggedIn === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);
  return (
    <>
      <div className="login-page-wrapper">
        <img className="login-image" src="/new-logo-product.png" alt="" />
        <div className="login-wrapper">
          <LoginForm />
        </div>
        <WaveSVG />
      </div>
    </>
  );
};

export default Login;
