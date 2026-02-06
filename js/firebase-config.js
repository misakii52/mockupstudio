import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBNZwe5xiM0GhO2WJURqvtkQPtkwszL4gY",
    authDomain: "ugur-test-54b90.firebaseapp.com",
    projectId: "ugur-test-54b90",
    storageBucket: "ugur-test-54b90.firebasestorage.app",
    messagingSenderId: "910605152227",
    appId: "1:910605152227:web:49c43ef15a142908b6bad6",
    measurementId: "G-LMK90XWD7Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
