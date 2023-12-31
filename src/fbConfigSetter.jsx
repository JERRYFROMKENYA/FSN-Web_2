import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "./firebaseConfig";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth"

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app)
export const provider = new GoogleAuthProvider();