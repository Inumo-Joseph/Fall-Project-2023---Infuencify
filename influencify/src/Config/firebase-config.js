// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore } from "@firebase/firestore"
// import {firestore} from 'firebase'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBTkZM6Ipwc3Lp3q-CaL3onBCi_T2aEeQ",
  authDomain: "influencify-e7f08.firebaseapp.com",
  projectId: "influencify-e7f08",
  storageBucket: "influencify-e7f08.appspot.com",
  messagingSenderId: "486463211333",
  appId: "1:486463211333:web:7e35e4aa99b6e1f348a02c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

