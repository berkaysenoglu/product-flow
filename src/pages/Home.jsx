import React, { useEffect } from "react";
import ProductLayout from "../layout/ProductLayout";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { loggedIn } = useLoggedInContext();

  const navigate = useNavigate();
  console.log(loggedIn);
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);

  if (loggedIn) {
    {
      return <ProductLayout />;
    }
  }
};
export default Home;
