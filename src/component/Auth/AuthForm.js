import React, { useState, useRef, useContext } from "react";
import "./AuthForm.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const isEmpty = (value) => value.trim() === "";
const isNotEightChar = (value) => value.trim().length <= 5;
const AuthForm = () => {
  const history = useHistory();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [isLogin, setisLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [formInputsValidity, setformInputsValidity] = useState({
    name: true,
    password: true,
  });

  const switchAuthMode = () => {
    setisLogin((prevState) => !prevState);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredNameisValid = !isEmpty(enteredName);
    const enteredPasswordisValid = !isNotEightChar(enteredPassword);
    const formIsValid = enteredNameisValid && enteredPasswordisValid;
    setformInputsValidity({
      name: enteredNameisValid,
      password: enteredPasswordisValid,
    });
    if (!formIsValid) {
      return;
    }
    let url;
    if (isLogin) {
      url = "https://todo-mvc-api-typeorm.herokuapp.com/auth/login";
    } else {
      url = "https://todo-mvc-api-typeorm.herokuapp.com/auth/register";
    }
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: enteredName,
        password: enteredPassword,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.message) {
              errorMessage = data.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.token);
        history.push("/todo");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const nameInputClasses = formInputsValidity.name
    ? "control"
    : "control invalid";
  const passwordInputClasses = formInputsValidity.password
    ? "control"
    : "control invalid";
  return (
    <div className="container">
      <div className="auth">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <p className="error">{error}</p>
        <form action="" method="post" onSubmit={handleFormSubmit}>
          <div className={nameInputClasses}>
            <label htmlFor="username" className="label">
              Full name:
            </label>
            <input
              type="text"
              id="username"
              ref={nameInputRef}
              placeholder="E.g: Nguyễn Văn A"
            />
            {!formInputsValidity.name && (
              <p className="error">Name must not be empty!</p>
            )}
          </div>
          <div className={passwordInputClasses}>
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input type="password" id="password" ref={passwordInputRef} />
            {!formInputsValidity.password && (
              <p className="error">
                Password must be have more than 8 character!
              </p>
            )}
          </div>
          <div className="action">
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="btnsubmit"
            >
              {isLogin ? "Log In" : "Create Account"}
            </button>
            <button
              type="button"
              className="btntoggle"
              onClick={switchAuthMode}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AuthForm;
