import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
require('firebase/auth');

const app = firebase.initializeApp({
  apiKey: "AIzaSyA2I_11vW_TwByIh4-MuBbIEvt50RbRlW4",
  authDomain: "braintumor-69e44.firebaseapp.com",
  projectId: "braintumor-69e44",
  storageBucket: "braintumor-69e44.appspot.com",
  messagingSenderId: "90247967895",
  appId: "1:90247967895:web:c34c95c579bc63360ee5d2"
})

export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
