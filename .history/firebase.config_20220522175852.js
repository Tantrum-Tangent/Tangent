// Import the functions you need from the SDKs you need
import {initializeApp, getApps} from "firebase/app"
import getFirestore from "firebase/firestore/lite"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnf4Rv50aaRNfwoszmiFnQQ5pGpnxniNQ",
  authDomain: "tantrum-44f6b.firebaseapp.com",
  projectId: "tantrum-44f6b",
  storageBucket: "tantrum-44f6b.appspot.com",
  messagingSenderId: "1024221832290",
  appId: "1:1024221832290:web:0f05b48ec794af490f5d3b",
  measurementId: "G-XJ2RWVNHCM",
};

// Initialize Firebase
if (getApps().length == 0) {
  const app = initializeApp(firebaseConfig)
}

export const db = firebase.firestore()