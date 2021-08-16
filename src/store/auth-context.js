import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
export const AuthContextProvider = (props) => {
  const innitialToken = localStorage.getItem("token");
  const [idtoken, setIdToken] = useState(innitialToken);
  const userIsLogin = !!idtoken;
  const loginHandler = (token) => {
    setIdToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = (token) => {
    setIdToken(null);
    localStorage.removeItem("token");
  };
  const contextValue = {
    token: idtoken,
    isLoggedIn: userIsLogin,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
