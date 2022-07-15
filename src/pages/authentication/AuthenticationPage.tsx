import LogIn from "../../components/authentication/LogIn";
import SignIn from "../../components/authentication/SingIn";

const AuthenticatorPage = () => {

    return (
      <div>
        <br />
        <h3>Sign in/Log in to see the Pokémon universe!</h3>
        <div className="d-flex justify-content-around">
          <div className="p-4">
            <SignIn/>
          </div>
          <div className="p-4">
            <LogIn/>
          </div>
        </div>
      </div>
    );
  };
  
  export default AuthenticatorPage;