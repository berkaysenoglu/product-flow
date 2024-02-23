import { createContext, useContext, useState } from "react";
import usersData from "../users.json";
import { useNavigate } from "react-router-dom";
const LoggedInContext = createContext();

const LoggedInProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const onFinish = (values) => {
    let user = usersData.users.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (user) {
      setLoggedIn(true);
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  return (
    <LoggedInContext.Provider value={{ loggedIn, onFinish }}>
      {children}
    </LoggedInContext.Provider>
  );
};
const useLoggedInContext = () => useContext(LoggedInContext);
export { useLoggedInContext, LoggedInProvider };
