import React, { useState, useRef, useContext } from "react";
import "./AuthForm.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const isEmpty = (value) => value.trim() === "";
const isNotEightChar = (value) => value.trim().length <= 5;
const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [isLogin, setisLogin] = useState(true);
  const [formInputsValidity, setformInputsValidity] = useState({
    name: true,
    password: true,
  });
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  axios.defaults.headers = {
    "content-type": "application/json",
  };
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    console.log(values);
  };
  const switchAuthMode = () => {
    setisLogin((prevState) => !prevState);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const enteredName = values.username;
    const enteredPassword = values.password;
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
    axios
      .post(url, values)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((data) => {
        authCtx.login(data.token);
        history.push("/todo");
      })
      .catch((err) => {
        setError("Authentication failed");
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
              name="username"
              value={values.username}
              onChange={handleChange}
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
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
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
