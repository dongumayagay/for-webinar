import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCISC7YyGgWLEONzcVLeuZCBJjuTD9Nmg0",
    authDomain: "bsittodo.firebaseapp.com",
    projectId: "bsittodo",
    storageBucket: "bsittodo.appspot.com",
    messagingSenderId: "573362735199",
    appId: "1:573362735199:web:ede1a6c6479fb5cf7533ea",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
