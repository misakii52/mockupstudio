import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Sayfa yüklendi, Firebase test ediliyor...");
    
    try {
        // Ürünleri getir
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsGrid = document.getElementById('productsGrid');
        
        if (querySnapshot.empty) {
            productsGrid.innerHTML = '<p>Henüz ürün yok. Firebase\'de products koleksiyonunu oluşturun.</p>';
            return;
        }
        
        productsGrid.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCard = `
                <a href="product.html?id=${doc.id}" class="product-card">
                    <div class="product-image">
                        <img src="${product.images?.[0] || 'https://via.placeholder.com/300'}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <div class="product-price">$${product.price || '0.00'}</div>
                    </div>
                </a>
            `;
            productsGrid.innerHTML += productCard;
        });
        
        console.log(`${querySnapshot.size} ürün yüklendi.`);
        
    } catch (error) {
        console.error("Firebase hatası:", error);
        document.getElementById('productsGrid').innerHTML = `
            <p style="color: red; text-align: center;">
                Firebase bağlantı hatası:<br>
                ${error.message}<br><br>
                1. Firebase Console'da Firestore oluşturdunuz mu?<br>
                2. "products" koleksiyonu var mı?<br>
                3. Security Rules "test mode"da mı?
            </p>
        `;
    }
});
