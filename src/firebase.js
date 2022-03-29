import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCMNIcsrYnE3CmI8GxI91AimesIY2UK4mY",
  authDomain: "linkedin-clone-90902.firebaseapp.com",
  projectId: "linkedin-clone-90902",
  storageBucket: "linkedin-clone-90902.appspot.com",
  messagingSenderId: "264718620838",
  appId: "1:264718620838:web:1425bb3a6326683546bc67",
  measurementId: "G-LM2VR00002"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const strorage = firebase.storage();

export {auth , provider , strorage};
export default db;