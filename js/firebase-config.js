// FIREBASE KONFİGÜRASYONU - UĞUR TEST PROJESİ
const firebaseConfig = {
    apiKey: "AIzaSyBNZwe5xiM0GhO2WJURqvtkQPtkwszL4gY",
    authDomain: "ugur-test-54b90.firebaseapp.com",
    projectId: "ugur-test-54b90",
    storageBucket: "ugur-test-54b90.firebasestorage.app",
    messagingSenderId: "910605152227",
    appId: "1:910605152227:web:49c43ef15a142908b6bad6",
    measurementId: "G-LMK90XWD7Z"
};

// Firebase SDK'larını import et
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firestore ve Auth servislerini al
const db = getFirestore(app);
const auth = getAuth(app);

// Export et
export { 
    db, 
    auth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
};
