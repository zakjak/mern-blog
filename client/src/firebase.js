// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-80f0e.firebaseapp.com",
  projectId: "blog-app-80f0e",
  storageBucket: "blog-app-80f0e.appspot.com",
  messagingSenderId: "958731656534",
  appId: "1:958731656534:web:884fab6228ba44d3658af7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app