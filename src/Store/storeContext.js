import React, { useState, useEffect } from "react";
import axios from "axios"

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  email: "",
  setEmail: () => {},
  expItems: [],
  addExpense: () => {},
  deleteExpense: () => {},
  editExpense: () => {},
  updateExpense: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const storedEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(storedEmail);
  const [expItems, setExpItems] = useState([])

  const firebaseDB = `https://reactexpense-fe1e8-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}`

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${firebaseDB}.json`);
      const data = response.data;
      const loadedExpItems = [];

      for (const key in data) {
        loadedExpItems.push({
          id: key,
          amount: data[key].amount,
          description: data[key].description,
          category: data[key].category,
        });
      }

      setExpItems(loadedExpItems);
    };

    fetchData();
  }, []);

  const addExpense = async(amountSpent, description, category) => {
    const newExpItem = {
      amount: amountSpent,
      description: description,
      category: category
    };
    const res = await axios.post(`${firebaseDB}.json`, newExpItem)
    console.log(res)

    const resGet = await axios.get(`${firebaseDB}/${res.data.name}.json`)
    const loadedExpItem = {
      id: res.data.name,
      amount: resGet.data.amount,
      description: resGet.data.description,
      category: resGet.data.category,
    };
    setExpItems((prevExpItems) => [...prevExpItems, loadedExpItem]);
  };
  const deleteExpense = async (id) => {
    await axios.delete(`${firebaseDB}/${id}.json`);
    setExpItems((prevExpItems) => prevExpItems.filter((expItem) => expItem.id !== id));
  };

  

  const editExpense = async (id, amountSpent, description, category) => {
    const resGet = await axios.get(`${firebaseDB}/${id}.json`)
    amountSpent = resGet.data.amount
    description = resGet.data.description
    category = resGet.data.category
  };
  
  const updateExpense = async (updatedExpense) => {
    try {
      const response = await axios.put(`${firebaseDB}/${updatedExpense.id}.json`, 
        {
          id: updatedExpense.id,
          amount: updatedExpense.amount,
          description: updatedExpense.description,
          category: updatedExpense.category
        },
      );
      window.location.reload(false)
      
      if (!response.ok) {
        throw new Error('Failed to update expense');
      }
    } catch (error) {
      console.error(error);
    }

  }

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
          window.location.href = "/signup"; 
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
    addExpense: addExpense,
    expItems: expItems,
    deleteExpense: deleteExpense,
    editExpense: editExpense,
    updateExpense: updateExpense
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;