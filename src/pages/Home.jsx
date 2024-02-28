import React, { useEffect } from "react";
import ProductLayout from "../layout/ProductLayout";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { useNavigate } from "react-router-dom";
import ProductLayoutDeneme from "../layout/ProductLayout";

const Home = () => {
  const navigate = useNavigate();
  const { loggedIn } = useLoggedInContext();

  useEffect(() => {
    // react outcontext
    if (loggedIn !== true) {
      navigate("/login");
    }
  }, []);
  console.log("isLoggedIn:", loggedIn);
  return <ProductLayout />;
};
export default Home;
