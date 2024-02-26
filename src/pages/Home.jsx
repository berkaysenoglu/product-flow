import React, { useEffect } from "react";
import ProductLayout from "../layout/ProductLayout";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { loggedIn } = useLoggedInContext();

  useEffect(() => {
    if (loggedIn !== true) {
      navigate("/login");
    }
  }, []);
  console.log(loggedIn);
  return <ProductLayout />;
};
export default Home;
