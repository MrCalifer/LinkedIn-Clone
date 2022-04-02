import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "linkedin-clone-90902.firebaseapp.com",
  projectId: "linkedin-clone-90902",
  storageBucket: "your-stroage-bucket",
  messagingSenderId: "264718620838",
  appId: "your-app-id",
  measurementId: "G-LM2VR00002"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const strorage = firebase.storage();

export {auth , provider , strorage};
export default db;
