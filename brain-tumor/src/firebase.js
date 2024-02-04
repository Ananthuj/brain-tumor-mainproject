import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
require('firebase/auth');

const app = firebase.initializeApp({
  apiKey: "AIzaSyCBLWC2qrazI7U1j6t7YkzU_WfTv4frrJw",
  authDomain: "skincare-91a86.firebaseapp.com",
  projectId: "skincare-91a86",
  storageBucket: "skincare-91a86.appspot.com",
  messagingSenderId: "214231299988",
  appId: "1:214231299988:web:18122d7212ac098df4c181"
})

export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
