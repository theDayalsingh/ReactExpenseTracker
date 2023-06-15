import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./Auth/AuthForm";

function App() {
  return (
    <BrowserRouter>
    <AuthForm />
    <Routes>
      <Route path='/signup'>
      </Route>
      <Route path='/welcome'>
        Welcome to Expense Tracker
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;