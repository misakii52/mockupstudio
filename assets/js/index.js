// ===============================
// FIREBASE IMPORTS
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ===============================
// FIREBASE CONFIG (ADMIN İLE AYNI)
// ===============================
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// ===============================
// INIT
// ===============================
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===============================
// HTML ELEMENTS
// ===============================
const categoriesContainer = document.getElementById("categories");
const productsContainer = document.getElementById("products");

// ===============================
// LOAD CATEGORIES
// ===============================
onValue(ref(db, "categories"), (snapshot) => {
  categoriesContainer.innerHTML = "";

  if (!snapshot.exists()) {
    categoriesContainer.innerHTML = "<p>No categories found.</p>";
    return;
  }

  snapshot.forEach((child) => {
    const category = child.val();

    const div = document.createElement("div");
    div.className =
      "bg-white p-4 rounded shadow text-center font-medium hover:bg-gray-50";

    div.textContent = category.name;

    categoriesContainer.appendChild(div);
  });
});

// ===============================
// LOAD PRODUCTS
// ===============================
onValue(ref(db, "products"), (snapshot) => {
  productsContainer.innerHTML = "";

  if (!snapshot.exists()) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  snapshot.forEach((child) => {
    const product = child.val();

    const card = document.createElement("div");
    card.
