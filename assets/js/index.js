// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔴 AYNI CONFIG – ADMIN PANELDE KULLANDIĞININ AYNISI
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// HTML elements
const categoriesContainer = document.getElementById("categories");
const productsContainer = document.getElementById("products");

/* =========================
   LOAD CATEGORIES
========================= */
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
      "bg-white p-4 rounded shadow text-center font-medium cursor-pointer hover:bg-gray-50";
    div.textContent = category.name;

    categoriesContainer.appendChild(div);
  });
});

/* =========================
   LOAD PRODUCTS
========================= */
onValue(ref(db, "products"), (snapshot) => {
  productsContainer.innerHTML = "";

  if (!snapshot.exists()) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  snapshot.forEach((child) => {
    const product = child.val();

    const card = document.createElement("div");
    card.className = "bg-white rounded shadow p-4";

    card.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">${product.title}</h3>
      <p class="text-gray-600 mb-2">${product.description || ""}</p>
      <p class="font-bold mb-3">$${product.price}</p>
      <a href="${product.link}" target="_blank"
         class="block text-center bg-black text-white py-2 rounded hover:bg-gray-800">
         Buy on Gumroad
      </a>
    `;

    productsContainer.appendChild(card);
  });
});
