import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logInReducer } from "../../features/authentication/loggedInSlice";
import { auth } from "../../features/authentication/firebaseConfig"
import GoogleLogIn from "./GoogleLogin";


const LogIn: React.FunctionComponent = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logInForm = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if(userName && password){
      signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log('**** user credentials ****');
        console.log(userCredential);
        console.log('**** user ***');
        console.log(user)
        dispatch(logInReducer(user))
        navigate('/')
      })
      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('*** Log in error ***');
        console.log(errorMessage);
      });

      setPassword('')
      setUserName('')
    }
  }

  return (
    <div className="border border-dark rounded p-4">
      <form >
        <h3 className= "border border-dark bg-danger text-white p-3">Log In</h3><br />
        <div className="mb-3">
          <label htmlFor="email">Email address</label><br /><br />
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="email"
            name= "email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label><br /><br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid px-5">
          <button onClick={(e) => logInForm(e)} type="submit" className="btn btn-danger mb-2 mt-3 btn-outline-dark btn-md">
            Log In
          </button>
        </div>
      </form>
        <div>
            <GoogleLogIn/> 
        </div>
    </div>
  );
};

export default LogIn;