import { db } from './firebase-config.js';
import { collection, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Menüyü (Header) Getir
const loadHeader = () => {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    const q = query(collection(db, "categories"), where("inHeader", "==", true));
    onSnapshot(q, (snapshot) => {
        nav.innerHTML = '';
        snapshot.forEach(doc => {
            nav.innerHTML += `<a href="category.html?id=${doc.id}">${doc.data().name}</a>`;
        });
    });
};

// Ürünleri Getir
const loadProducts = () => {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    onSnapshot(collection(db, "products"), (snapshot) => {
        grid.innerHTML = '';
        snapshot.forEach(doc => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.imageUrl}">
                    <h3>${p.title}</h3>
                    <p>${p.price} TL</p>
                </div>`;
        });
    });
};

loadHeader();
loadProducts();
