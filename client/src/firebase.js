// Import the functions you need from the SDKs you need
import * as firebase from "firebase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzmV1YEgUqYke0QGncKBhRs1QUtSKfEIU",
  authDomain: "assessment-f6371.firebaseapp.com",
  projectId: "assessment-f6371",
  storageBucket: "assessment-f6371.appspot.com",
  messagingSenderId: "761773012739",
  appId: "1:761773012739:web:44c94e9bfb01b8fdc49b36"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();