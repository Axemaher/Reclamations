// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIwfXnUIwdieCBx-r7azWte0wExkhl9YE",
  authDomain: "reclamations-909bd.firebaseapp.com",
  projectId: "reclamations-909bd",
  storageBucket: "reclamations-909bd.firebasestorage.app",
  messagingSenderId: "560741995161",
  appId: "1:560741995161:web:c05accad5930dc53d85e08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}