import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFZNX35rg8M-GLioy8astBCZ6o9k-w0dA",
  authDomain: "neighbourhood-app-6a4db.firebaseapp.com",
  projectId: "neighbourhood-app-6a4db",
  storageBucket: "neighbourhood-app-6a4db.firebasestorage.app",
  messagingSenderId: "546283235512",
  appId: "1:546283235512:web:30ffcba785151869512c4d",
  measurementId: "G-6DE9T78RXV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();