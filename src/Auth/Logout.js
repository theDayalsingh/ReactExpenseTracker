import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/AuthReducer";
import Button from "react-bootstrap/Button";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/signup");
  };

  return <Button onClick={logoutHandler}>Logout</Button>;
}
