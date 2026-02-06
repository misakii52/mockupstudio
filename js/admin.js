import { db } from './firebase-config.js';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- KATEGORİ İŞLEMLERİ ---
export const handleCategories = () => {
    const categoryForm = document.getElementById('categoryForm');
    const categoryList = document.getElementById('categoryList');
    if (!categoryForm) return;

    // Gerçek zamanlı dinle ve listele
    const q = query(collection(db, "categories"), orderBy("order", "asc"));
    onSnapshot(q, (snapshot) => {
        categoryList.innerHTML = '';
        snapshot.forEach((docSnap) => {
            const cat = docSnap.data();
            categoryList.innerHTML += `
                <tr>
                    <td>${cat.name}</td>
                    <td>${cat.order}</td>
                    <td><button onclick="deleteItem('categories', '${docSnap.id}')">Sil</button></td>
                </tr>`;
        });
    });

    // Kategori Ekle
    categoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "categories"), {
                name: document.getElementById('categoryName').value,
                order: parseInt(document.getElementById('categoryOrder').value) || 0,
                inHeader: document.getElementById('inHeader').checked,
                isActive: true
            });
            categoryForm.reset();
        } catch (err) { alert("Hata: " + err.message); }
    });
};

// --- ÜRÜN İŞLEMLERİ ---
export const handleProducts = () => {
    const productForm = document.getElementById('productForm');
    const pCategory = document.getElementById('pCategory');
    if (!productForm) return;

    // Ürün formundaki kategori seçim kutusunu doldur
    onSnapshot(collection(db, "categories"), (snapshot) => {
        pCategory.innerHTML = '<option value="">Seçiniz...</option>';
        snapshot.forEach((doc) => {
            pCategory.innerHTML += `<option value="${doc.id}">${doc.data().name}</option>`;
        });
    });

    // Ürün Ekle
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "products"), {
                title: document.getElementById('pName').value,
                price: parseFloat(document.getElementById('pPrice').value),
                categoryId: pCategory.value,
                categoryName: pCategory.options[pCategory.selectedIndex].text,
                imageUrl: document.getElementById('pImg').value,
                createdAt: new Date()
            });
            productForm.reset();
            alert("Ürün eklendi!");
        } catch (err) { alert("Hata: " + err.message); }
    });
};

// Global silme fonksiyonu
window.deleteItem = async (col, id) => {
    if (confirm('Silmek istediğine emin misin?')) {
        await deleteDoc(doc(db, col, id));
    }
};
