import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  email: "",
  setEmail: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const storedEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(storedEmail);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (userIsLoggedIn) {
      const loginTime = Date.now();
      localStorage.setItem("loginTime", loginTime);

      const checkInactive = () => {
        const currentTime = Date.now();
        const loginTime = localStorage.getItem("loginTime");
        const inactiveTime = currentTime - loginTime;
        const minutesInactive = Math.floor(inactiveTime / 1000 / 60);

        if (minutesInactive >= 5) {
          logoutHandler();
          window.location.href = "/signup"; // Redirect to the logout page
        }
      };

      const timer = setInterval(checkInactive, 1000);

      return () => clearInterval(timer);
    }
  }, [userIsLoggedIn]);

  const setEmailHandler = (email) => {
    setEmail(email);
    localStorage.setItem("email", email);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    email,
    setEmail: setEmailHandler,
  };
  // console.log(contextValue.email)

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;