import React from "react";
import LoginForm from "../components/LoginForm";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
const Login = () => {
  return (
    <>
      <div className="login-page-wrapper">
        <img
          style={{ width: "33%", marginTop: "1.2rem" }}
          src="/new-logo-product.png"
          alt=""
        />
        <div className="login-wrapper">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
