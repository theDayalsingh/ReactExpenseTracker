import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/storeContext";

export default function Logout(){
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/signup')
      };
    
return(
    <button onClick={logoutHandler}>Logout</button>
)
}