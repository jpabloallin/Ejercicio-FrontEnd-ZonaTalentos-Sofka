import { createUserWithEmailAndPassword } from 'firebase/auth'
import React,{ useState }  from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logInReducer } from "../../features/authentication/loggedInSlice"
import { auth } from '../../features/authentication/firebaseConfig'

const SignIn = () => {
  
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const signInForm = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    if(password && userName) {
      createUserWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("****user****");
          
          console.log(user);
          dispatch(logInReducer(user))
      
          navigate('/')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('*** sign in error ***');
          console.log(errorMessage);
        });
        setUserName('')
        setPassword('')
    }
  }

  return (
    <div className="border border-dark rounded p-4">
      <form >
        <h3 className="border border-dark bg-danger text-white p-3">Sign In</h3><br />
        <div className="mb-3">
          <label>Email address</label><br /><br />
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
          <button onClick={(e) => signInForm(e)} type="submit" className="btn btn-danger mb-2 mt-3 btn-outline-dark btn-md">
            Sign In
          </button>
        </div>
        <div>

        </div>
      </form>
    </div>
  );
};

export default SignIn