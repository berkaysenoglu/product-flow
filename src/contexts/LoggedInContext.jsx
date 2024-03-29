import { createContext, useContext, useState } from "react";
import usersData from "../users.json";
import { useNavigate } from "react-router-dom";
const LoggedInContext = createContext();

const LoggedInProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(() => {
    if (sessionStorage.getItem("loggedIn") == null) {
      sessionStorage.setItem("loggedIn", "false");
    }
    return sessionStorage.getItem("loggedIn") === "true";
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    if (sessionStorage.getItem("isAdmin") == null) {
      sessionStorage.setItem("isAdmin", "false");
    }
    return sessionStorage.getItem("isAdmin") === "true";
  });
  const [userName, setUserName] = useState(() => {
    return sessionStorage.getItem("userName") || "";
  });
  const [balance, setBalance] = useState(() => {
    return parseFloat(sessionStorage.getItem("balance")) || 0;
  });
  const onFinish = (values) => {
    let user = usersData.users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      sessionStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
      navigate("/");
      sessionStorage.setItem("userName", user.name + " " + user.surname);
      sessionStorage.setItem("balance", user.balance);
      setUserName(user.name + " " + user.surname);
      setBalance(user.balance);
    } else {
      sessionStorage.setItem("loggedIn", "false");
      setLoggedIn(false);
      navigate("/login");
    }
    if (user.role == "admin") {
      setIsAdmin(true);
      sessionStorage.setItem("isAdmin", "true");
    } else {
      setIsAdmin(false);
      sessionStorage.setItem("isAdmin", false);
    }
  };

  return (
    <LoggedInContext.Provider
      value={{
        loggedIn,
        onFinish,
        isAdmin,
        setLoggedIn,
        userName,
        balance,
        setBalance,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};
const useLoggedInContext = () => useContext(LoggedInContext);
export { useLoggedInContext, LoggedInProvider };
