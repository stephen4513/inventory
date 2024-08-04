import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDllB-S6VqNuTkYcsmMGBRHJHkr0koxf2s",
  authDomain: "pantry-b1755.firebaseapp.com",
  projectId: "pantry-b1755",
  storageBucket: "pantry-b1755.appspot.com",
  messagingSenderId: "152610047279",
  appId: "1:152610047279:web:21160220871b66ada30dda",
  measurementId: "G-CS4T59W7N7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google sign-in error", error);
  }
};

export { app, auth, firestore, storage, signInWithGoogle };
