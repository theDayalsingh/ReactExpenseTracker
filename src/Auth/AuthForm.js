import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../redux/AuthReducer";
import store from "../redux/store";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [showError, setShowError] = useState("");
  const [signupInProgress, setSignupInProgress] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

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
        dispatch(
          authActions.login({
            token: data.idToken,
            email: data.email,
          })
        );
        console.log("State:", store.getState());
        if (isLogin) {
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

  const forgotPasswordHandler = () => {
    const enteredEmail = emailInputRef.current.value;
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!enteredEmail || !emailRegex.test(enteredEmail)) {
      setShowError("Please enter a valid email address");
      return;
    }
    if (enteredEmail || emailRegex.test(enteredEmail)) {
      setShowError("");
      return;
    }
    const passUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA3i7KwDYg7UeEtNbcek1azDb6-fUVPZ7s";
    fetch(passUrl, {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {});
  };
  const authImg =
    "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&w=600";
  return (
    <Container className="border border-5 m-5 rounded-5 bg-info border-primary text-center">
      <Row>
        <Col></Col>
        <Col xs={6} className="p-3 mt-5"><section>
        <h1 className="text-center text-warning border-5 bg-danger rounded-4 border-primary border-top border-bottom fs-1 fw-bold ">{isLogin ? "LOGIN" : "SIGN UP"}</h1>
        <form onSubmit={submitHandler}>
        <div>
            <input type="email" id="email" className="text-center px-5 py-2 my-2 mt-5" required ref={emailInputRef} placeholder="Enter Your Email"/>
          </div>
          <div>
          <input
          placeholder="Your Password"
          className="text-center px-5 py-2 my-2"
          type="password"
              id="password"
              required
              ref={passwordInputRef}
              />
              </div>
              {!isLogin && (
            <div>
                            <input
              placeholder="Confirm Password"
          className="text-center px-5 py-2 my-2"
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
          <div>
          <div>
          <button className="border border-3 bg-white text-success fw-bold fs-4 border-secondary mx-2 rounded-3 my-2 px-4 py-2">{isLogin ? "Login" : "Create Account"}</button>
                    </div>
            <button className="border border-3 bg-white text-primary fw-bold fs-4 border-secondary mx-1 rounded-3 my-2 px-4 py-2"
              type="button"
              onClick={switchAuthModeHandler}
              >
              {isLogin ? "Create new account" : "Login with existing account"}
              </button>
              {isLogin && (
                <button className="border border-3 bg-white text-danger fw-bold mx-1 fs-4 border-secondary rounded-3 my-2 px-4 py-2"
                type="button"
                onClick={forgotPasswordHandler}
                >
                Forgot Password
                </button>
                )}
                </div>
                </form>
                </section></Col>
        <Col><img className="rounded-5 py-2" src={authImg} alt="atm" /></Col>
        <Col></Col>
      </Row>
                </Container>
                );
              };

export default AuthForm;

