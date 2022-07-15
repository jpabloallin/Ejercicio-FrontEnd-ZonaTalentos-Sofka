import { signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../features/authentication/firebaseConfig"
import { logInReducer } from "../../features/authentication/loggedInSlice"
import { useNavigate } from "react-router-dom";
import { Button, Container, Image } from "react-bootstrap";


const GoogleLogIn: React.FunctionComponent = () => {

  const providerGoogleAuth = new GoogleAuthProvider();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signInWithGoogleButton = () => {

    signInWithPopup(auth, providerGoogleAuth)
    .then((result) => {
      const credential:OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      const user = result.user;

      dispatch(logInReducer(user))
      navigate('/')
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  return (
    <Container>
      <Button variant="dark" size="sm" onClick={signInWithGoogleButton}>
        <Image src={"https://freepngimg.com/thumb/google/66912-logo-now-google-plus-search-free-transparent-image-hd.png"} className="rounded" width="30"/>
          Log in with Google
      </Button>
    </Container>
  );
};

export default GoogleLogIn;