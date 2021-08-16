import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./MainNav.css";

export const MainNav = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    // history.replace("/");
  };
  return (
    <header>
      <Link to="/">
        <div className="logo">
          Todo<span>Site</span>
        </div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className="btnlogout" onClick={logoutHandler}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
