// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDs6JHPSV8UM2uKSSVUA1SNxWGyxAihaII",
    authDomain: "mockup-master-db.firebaseapp.com",
    projectId: "mockup-master-db",
    storageBucket: "mockup-master-db.firebasestorage.app",
    messagingSenderId: "68063883147",
    appId: "1:68063883147:web:07debadc7efe4aeccac98e"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, signInWithEmailAndPassword, signOut, onAuthStateChanged };
