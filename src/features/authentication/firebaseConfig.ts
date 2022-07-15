import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD4_ZCHMLsopjzWMeeS8Igz0GoqqlewoRQ",
  authDomain: "pokemon-hosting.firebaseapp.com",
  projectId: "pokemon-hosting",
  storageBucket: "pokemon-hosting.appspot.com",
  messagingSenderId: "1096805410508",
  appId: "1:1096805410508:web:60519d6848e8143b534469"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();