<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kategori Yönetimi</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-container">
        <!-- Sidebar -->
        <aside class="admin-sidebar">
            <!-- Sidebar içeriği -->
        </aside>

        <!-- Main Content -->
        <main class="admin-main">
            <header class="admin-header">
                <h1>Kategori Yönetimi</h1>
                <button class="btn-logout" id="logoutBtn">Çıkış Yap</button>
            </header>

            <!-- Kategori Form -->
            <form id="categoryForm">
                <input type="hidden" id="categoryId">
                
                <div class="form-group">
                    <label for="categoryName">Kategori Adı *</label>
                    <input type="text" id="categoryName" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="categoryOrder">Sıra</label>
                    <input type="number" id="categoryOrder" class="form-control" value="0">
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="inHeader"> Header'da göster
                    </label>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="inFooter"> Footer'da göster
                    </label>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="isActive" checked> Aktif
                    </label>
                </div>
                
                <button type="submit" class="btn-primary">Kategoriyi Kaydet</button>
            </form>

            <!-- Kategori Listesi -->
            <div id="categoriesList"></div>
        </main>
    </div>

    <!-- Firebase ve Admin JS -->
    <script type="module" src="../js/firebase-config.js"></script>
    <script type="module" src="../js/admin.js"></script>
    
    <script type="module">
        import { auth, onAuthStateChanged } from '../js/firebase-config.js';
        
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.href = 'login.html';
            } else {
                // Kategorileri yükle
                const categories = await adminFirestore.loadCollection('categories', renderCategories);
                
                // Form submit
                document.getElementById('categoryForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    await adminCategories.saveCategory();
                });
            }
        });
        
        function renderCategories(categories) {
            const container = document.getElementById('categoriesList');
            if (!container) return;
            
            let html = '<h2>Kategori Listesi</h2>';
            
            if (categories.length === 0) {
                html += '<p>Henüz kategori yok.</p>';
            } else {
                html += '<table class="table"><thead><tr><th>Ad</th><th>Sıra</th><th>Header</th><th>Footer</th><th>Durum</th><th>İşlemler</th></tr></thead><tbody>';
                
                categories.forEach(category => {
                    html += `
                        <tr>
                            <td>${category.name}</td>
                            <td>${category.order || 0}</td>
                            <td>${category.inHeader ? '✓' : '✗'}</td>
                            <td>${category.inFooter ? '✓' : '✗'}</td>
                            <td>${category.isActive !== false ? 'Aktif' : 'Pasif'}</td>
                            <td>
                                <button class="btn-edit" onclick="editCategory('${category.id}')">Düzenle</button>
                                <button class="btn-danger" onclick="deleteCategory('${category.id}')">Sil</button>
                            </td>
                        </tr>
                    `;
                });
                
                html += '</tbody></table>';
            }
            
            container.innerHTML = html;
        }
        
        // Global fonksiyonlar
        window.editCategory = async function(categoryId) {
            await adminCategories.loadCategoryForm(categoryId);
            document.getElementById('categoryForm').scrollIntoView();
        };
        
        window.deleteCategory = async function(categoryId) {
            await adminFirestore.deleteDocument('categories', categoryId, () => {
                location.reload();
            });
        };
    </script>
</body>
</html>
