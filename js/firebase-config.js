// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNZwe5xiM0GhO2WJURqvtkQPtkwszL4gY",
  authDomain: "ugur-test-54b90.firebaseapp.com",
  projectId: "ugur-test-54b90",
  storageBucket: "ugur-test-54b90.firebasestorage.app",
  messagingSenderId: "910605152227",
  appId: "1:910605152227:web:49c43ef15a142908b6bad6",
  measurementId: "G-LMK90XWD7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Export the instances
export { db, auth };
