import { useState, useRef, useContext } from "react";
import AuthContext from "../Store/storeContext";
import classes from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [showError, setShowError] = useState("");
  const [signupInProgress, setSignupInProgress] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation
    if (!isLogin) {
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        setPasswordMatch(false);
        return;
      } else {
        setPasswordMatch(true);
      }
    }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3i7KwDYg7UeEtNbcek1azDb6-fUVPZ7s";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3i7KwDYg7UeEtNbcek1azDb6-fUVPZ7s";
      setSignupInProgress(true);
      setSignupSuccess("");
      setShowError("");
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          if (!isLogin) {
            setSignupSuccess("Signup Successful, you may login");
          }
          setShowError("");
          return res.json();
        } else {
          return res.json().then((data) => {
            setShowError(data.error.message);
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        if(isLogin){
            navigate("/welcome");
        }        
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setSignupInProgress(false);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
        )}
        {!passwordMatch && (
          <p style={{ color: "red" }}>Passwords do not match</p>
  )}
    {showError && <p style={{ color: "red" }}>{showError}</p>}
    {signupInProgress && <p>Sending Request...</p>}
    {signupSuccess && <p style={{ color: "green" }}>{signupSuccess}</p>}
    <div className={classes.actions}>
      <button>{isLogin ? "Login" : "Create Account"}</button>
      <button
        type="button"
        className={classes.toggle}
        onClick={switchAuthModeHandler}
      >
        {isLogin ? "Create new account" : "Login with existing account"}
      </button>
    </div>
  </form>
</section>
);
};

export default AuthForm;