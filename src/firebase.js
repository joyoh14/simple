// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPHzgxaYK70dn-mrqmx4p_hM-NfhmZfD0",
  authDomain: "chatting-7799f.firebaseapp.com",
  projectId: "chatting-7799f",
  storageBucket: "chatting-7799f.appspot.com",
  messagingSenderId: "980001021935",
  appId: "1:980001021935:web:af9724c4f08a8ed6a7e01a",
  measurementId: "G-FZRQRK054D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase();