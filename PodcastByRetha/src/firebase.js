// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLTF2wYKc-HxEuayZpjzLYU6340RRDGTE",
  authDomain: "podcastbyretha-da575.firebaseapp.com",
  projectId: "podcastbyretha-da575",
  storageBucket: "podcastbyretha-da575.appspot.com",
  messagingSenderId: "1065931867775",
  appId: "1:1065931867775:web:6381607b43d5973441614a",
  measurementId: "G-2EP3QJ2ELR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
