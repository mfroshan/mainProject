// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAjIfUXHUrMGi89I7PbyIcOTU4Orwdjn1E",
  authDomain: "mainproject-6d4ef.firebaseapp.com",
  projectId: "mainproject-6d4ef",
  storageBucket: "mainproject-6d4ef.appspot.com",
  messagingSenderId: "482453140286",
  appId: "1:482453140286:web:193479265574ad2df1b26f",
  measurementId: "G-DNDS2SNE5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);