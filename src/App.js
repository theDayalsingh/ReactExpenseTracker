import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthForm from "./Auth/AuthForm";
import UpdateProfile from "./pages/updateProfile";
import TheNav from "./pages/theNav";
import DailyExpRedux from "./pages/DailyExpRedux";
import { useSelector } from "react-redux";
import VerifyEmail from "./Auth/VerifyEmail";
import Welcome from "./pages/welcome";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  return (
    <div className={isDarkTheme ? "App dark" : "App"}>
      <BrowserRouter>
        {isLoggedIn && <TheNav />}
        <Routes>
          <Route path="/signup" element={<AuthForm />} />
          <Route exact path="/welcome" element={<Welcome />} />
          <Route path="/profile" element={<UpdateProfile />} />
          <Route path="/dailyexp" element={<DailyExpRedux />} />
          <Route path="/verify" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
