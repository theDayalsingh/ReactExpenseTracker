import { BrowserRouter, Routes, Route} from "react-router-dom";
import AuthForm from "./Auth/AuthForm";
import UpdateProfile from "./pages/updateProfile";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <BrowserRouter>
    <AuthForm />
      <Routes>
        <Route path="/signup"/>
        <Route exact path="/welcome" element={<Welcome/>}/>
        <Route path="/profile" element={<UpdateProfile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;