import { useDispatch } from "react-redux";
import { logOutReducer } from "../../features/authentication/loggedInSlice"
import { useNavigate } from "react-router-dom";

const LogOut: React.FunctionComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutButton = () => {
      dispatch(logOutReducer())
      navigate('/login')
  }

  return (
    <div>
        <button className="btn btn-danger m-2 mr-4 btn-outline-dark btn-md" onClick={logOutButton}>Log Out</button>
    </div>
  );
};

export default LogOut;