// ===== Antalya Smile Design - Stok Yönetim Sistemi =====
// ===== Data Layer =====

const DB_KEYS = {
    STOCK: 'asd_stock',
    CATEGORIES: 'asd_categories',
    USAGE: 'asd_usage',
    SETTINGS: 'asd_settings'
};

// Default categories for dental clinic
const DEFAULT_CATEGORIES = [
    { id: 'cat-1', name: 'Zirkon Bloklar', description: 'Zirkonya bazlı CAD/CAM blokları', icon: 'fa-cube' },
    { id: 'cat-2', name: 'IPS e.max Bloklar', description: 'Lityum disilikat cam seramik blokları', icon: 'fa-cube' },
    { id: 'cat-3', name: 'PMMA Bloklar', description: 'Geçici kron ve köprü blokları', icon: 'fa-cube' },
    { id: 'cat-4', name: 'Kompozit Bloklar', description: 'Kompozit CAD/CAM blokları', icon: 'fa-cube' },
    { id: 'cat-5', name: 'Wax Bloklar', description: 'Mum bloklar', icon: 'fa-cube' },
    { id: 'cat-6', name: 'Frezler & Bitler', description: 'CAD/CAM freze uçları', icon: 'fa-screwdriver-wrench' },
    { id: 'cat-7', name: 'Sarf Malzemeler', description: 'Günlük sarf malzemeleri', icon: 'fa-kit-medical' },
    { id: 'cat-8', name: 'Implant Malzemeleri', description: 'İmplant ve üst yapı parçaları', icon: 'fa-tooth' }
];

// Default stock items for dental clinic
const DEFAULT_STOCK = [
    { id: 'stk-1', code: 'ZR-001', name: 'Zirkon Blok Multilayer', category: 'cat-1', brand: 'Ivoclar', color: 'A2', size: '98x14mm', quantity: 12, minQuantity: 5, price: 850, supplier: 'DentSupply', notes: 'Yüksek translüsensi' },
    { id: 'stk-2', code: 'ZR-002', name: 'Zirkon Blok Multilayer', category: 'cat-1', brand: 'Ivoclar', color: 'A3', size: '98x14mm', quantity: 8, minQuantity: 5, price: 850, supplier: 'DentSupply', notes: '' },
    { id: 'stk-3', code: 'ZR-003', name: 'Zirkon Blok Multilayer', category: 'cat-1', brand: 'Ivoclar', color: 'B1', size: '98x14mm', quantity: 3, minQuantity: 5, price: 850, supplier: 'DentSupply', notes: 'Stok azalıyor' },
    { id: 'stk-4', code: 'ZR-004', name: 'Zirkon Blok HT', category: 'cat-1', brand: 'Katana', color: 'A1', size: '98x18mm', quantity: 6, minQuantity: 3, price: 920, supplier: 'Kuraray', notes: '' },
    { id: 'stk-5', code: 'EM-001', name: 'IPS e.max CAD', category: 'cat-2', brand: 'Ivoclar', color: 'HT A2', size: 'C14', quantity: 15, minQuantity: 10, price: 320, supplier: 'DentSupply', notes: '' },
    { id: 'stk-6', code: 'EM-002', name: 'IPS e.max CAD', category: 'cat-2', brand: 'Ivoclar', color: 'LT BL2', size: 'C14', quantity: 4, minQuantity: 5, price: 340, supplier: 'DentSupply', notes: '' },
    { id: 'stk-7', code: 'PM-001', name: 'PMMA Geçici Blok', category: 'cat-3', brand: 'Yamahachi', color: 'A2', size: '98x20mm', quantity: 10, minQuantity: 5, price: 180, supplier: 'YamahachiTR', notes: '' },
    { id: 'stk-8', code: 'PM-002', name: 'PMMA Geçici Blok', category: 'cat-3', brand: 'Yamahachi', color: 'A3', size: '98x20mm', quantity: 0, minQuantity: 5, price: 180, supplier: 'YamahachiTR', notes: 'Yeniden sipariş verilmeli' },
    { id: 'stk-9', code: 'FR-001', name: 'Elmas Freze Ucu', category: 'cat-6', brand: 'VHF', color: '-', size: '2.5mm', quantity: 20, minQuantity: 10, price: 450, supplier: 'VHF Türkiye', notes: '' },
    { id: 'stk-10', code: 'FR-002', name: 'Karbür Freze Ucu', category: 'cat-6', brand: 'VHF', color: '-', size: '1.0mm', quantity: 2, minQuantity: 5, price: 380, supplier: 'VHF Türkiye', notes: 'Acil sipariş' },
];

// Default usage history
const DEFAULT_USAGE = [
    { id: 'use-1', stockId: 'stk-1', date: '2026-09-17', time: '09:30', quantity: 1, patient: 'Ahmet Yılmaz', doctor: 'Dr. Mehmet', notes: 'Üst çene köprü' },
    { id: 'use-2', stockId: 'stk-5', date: '2026-09-17', time: '10:15', quantity: 2, patient: 'Fatma Demir', doctor: 'Dr. Ayşe', notes: 'Veneer' },
    { id: 'use-3', stockId: 'stk-2', date: '2026-09-16', time: '14:00', quantity: 1, patient: 'Ali Kaya', doctor: 'Dr. Mehmet', notes: 'Tek diş kron' },
    { id: 'use-4', stockId: 'stk-7', date: '2026-09-16', time: '11:30', quantity: 1, patient: 'Zeynep Çelik', doctor: 'Dr. Ayşe', notes: 'Geçici köprü' },
    { id: 'use-5', stockId: 'stk-9', date: '2026-09-15', time: '16:45', quantity: 2, patient: '-', doctor: 'Teknisyen', notes: 'Rutin değişim' },
    { id: 'use-6', stockId: 'stk-4', date: '2026-09-15', time: '09:00', quantity: 1, patient: 'Mustafa Arslan', doctor: 'Dr. Mehmet', notes: 'İmplant üstü kron' },
    { id: 'use-7', stockId: 'stk-1', date: '2026-09-14', time: '13:20', quantity: 1, patient: 'Elif Şahin', doctor: 'Dr. Ayşe', notes: '3 üyeli köprü' },
    { id: 'use-8', stockId: 'stk-5', date: '2026-09-14', time: '10:00', quantity: 3, patient: 'Hasan Öztürk', doctor: 'Dr. Mehmet', notes: 'Ön grup veneer' },
    { id: 'use-9', stockId: 'stk-3', date: '2026-09-13', time: '15:30', quantity: 1, patient: 'Ayşe Korkmaz', doctor: 'Dr. Ayşe', notes: 'Kron restorasyonu' },
    { id: 'use-10', stockId: 'stk-6', date: '2026-09-12', time: '11:00', quantity: 1, patient: 'Murat Aksoy', doctor: 'Dr. Mehmet', notes: 'İnley restorasyon' },
];

// ===== Helper Functions =====
function generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
}

function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function initializeData() {
    if (!getData(DB_KEYS.CATEGORIES)) {
        setData(DB_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    }
    if (!getData(DB_KEYS.STOCK)) {
        setData(DB_KEYS.STOCK, DEFAULT_STOCK);
    }
    if (!getData(DB_KEYS.USAGE)) {
        setData(DB_KEYS.USAGE, DEFAULT_USAGE);
    }
}

function getCategories() { return getData(DB_KEYS.CATEGORIES) || []; }
function getStock() { return getData(DB_KEYS.STOCK) || []; }
function getUsage() { return getData(DB_KEYS.USAGE) || []; }

function getCategoryName(catId) {
    const cats = getCategories();
    const cat = cats.find(c => c.id === catId);
    return cat ? cat.name : 'Bilinmiyor';
}

function getStockItem(stockId) {
    const stock = getStock();
    return stock.find(s => s.id === stockId);
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Modal Functions =====
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// ===== Navigation =====
function switchPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));

    // Show target page
    document.getElementById(`page-${pageName}`).classList.remove('hidden');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageName);
    });

    // Update page title
    const titles = {
        dashboard: { title: 'Ana Sayfa', subtitle: 'Stok durumunuza genel bakış' },
        stock: { title: 'Stok Yönetimi', subtitle: 'Ürünlerinizi yönetin' },
        usage: { title: 'Kullanım Geçmişi', subtitle: 'Blok kullanımlarını tarih ve saate göre takip edin' },
        categories: { title: 'Kategoriler', subtitle: 'Ürün kategorilerini yönetin' },
        reports: { title: 'Raporlar', subtitle: 'Stok ve kullanım raporları' }
    };

    const t = titles[pageName];
    document.getElementById('pageTitle').textContent = t.title;
    document.getElementById('pageSubtitle').textContent = t.subtitle;

    // Refresh page data
    if (pageName === 'dashboard') refreshDashboard();
    if (pageName === 'stock') refreshStockTable();
    if (pageName === 'usage') refreshUsageTable();
    if (pageName === 'categories') refreshCategories();
}

// ===== DateTime Display =====
function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
        weekday: 'long'
    };
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('tr-TR', options);
}

// ===== Dashboard Functions =====
function refreshDashboard() {
    const stock = getStock();
    const usage = getUsage();

    // Stats
    const total = stock.reduce((sum, s) => sum + s.quantity, 0);
    const available = stock.filter(s => s.quantity > s.minQuantity).length;
    const low = stock.filter(s => s.quantity > 0 && s.quantity <= s.minQuantity).length;
    const out = stock.filter(s => s.quantity === 0).length;

    document.getElementById('totalStock').textContent = total;
    document.getElementById('availableStock').textContent = available;
    document.getElementById('lowStock').textContent = low;
    document.getElementById('outOfStock').textContent = out;

    // Recent usage
    const recentUsageList = document.getElementById('recentUsageList');
    const sortedUsage = [...usage].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
    }).slice(0, 5);

    if (sortedUsage.length === 0) {
        recentUsageList.innerHTML = '<p class="empty-message">Henüz kullanım kaydı yok</p>';
    } else {
        recentUsageList.innerHTML = sortedUsage.map(u => {
            const stockItem = getStockItem(u.stockId);
            const name = stockItem ? stockItem.name : 'Silinmiş Ürün';
            const color = stockItem ? stockItem.color : '-';
            return `
                <div class="recent-item">
                    <div class="recent-item-info">
                        <div class="recent-item-icon"><i class="fas fa-cube"></i></div>
                        <div class="recent-item-text">
                            <span class="recent-item-name">${name} (${color})</span>
                            <span class="recent-item-detail">${u.patient || '-'} • ${u.doctor || '-'}</span>
                        </div>
                    </div>
                    <div class="recent-item-meta">
                        <div class="recent-item-date">${formatDate(u.date)} ${u.time}</div>
                        <div class="recent-item-quantity">${u.quantity} adet</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Low stock alerts
    const lowStockList = document.getElementById('lowStockList');
    const lowStockItems = stock.filter(s => s.quantity <= s.minQuantity);

    if (lowStockItems.length === 0) {
        lowStockList.innerHTML = '<p class="empty-message">Tüm stoklar yeterli seviyede</p>';
    } else {
        lowStockList.innerHTML = lowStockItems.map(s => {
            const iconClass = s.quantity === 0 ? 'danger' : 'warning';
            const icon = s.quantity === 0 ? 'fa-times-circle' : 'fa-exclamation-triangle';
            return `
                <div class="recent-item">
                    <div class="recent-item-info">
                        <div class="recent-item-icon ${iconClass}"><i class="fas ${icon}"></i></div>
                        <div class="recent-item-text">
                            <span class="recent-item-name">${s.name} (${s.color})</span>
                            <span class="recent-item-detail">${getCategoryName(s.category)} • ${s.brand}</span>
                        </div>
                    </div>
                    <div class="recent-item-meta">
                        <div class="recent-item-quantity" style="color: ${s.quantity === 0 ? 'var(--danger)' : 'var(--warning)'}">
                            ${s.quantity} / ${s.minQuantity}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Category chart
    renderCategoryChart();
}

function renderCategoryChart() {
    const stock = getStock();
    const categories = getCategories();
    const container = document.getElementById('categoryChart');

    const categoryData = categories.map(cat => {
        const items = stock.filter(s => s.category === cat.id);
        const total = items.reduce((sum, s) => sum + s.quantity, 0);
        return { name: cat.name, total };
    }).filter(c => c.total > 0);

    if (categoryData.length === 0) {
        container.innerHTML = '<p class="empty-message">Stok verisi bulunamadı</p>';
        return;
    }

    const maxVal = Math.max(...categoryData.map(c => c.total));
    const colors = ['#1a73a7', '#26c6da', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#1abc9c', '#e67e22'];

    container.innerHTML = categoryData.map((c, i) => {
        const height = maxVal > 0 ? (c.total / maxVal) * 160 : 4;
        const color = colors[i % colors.length];
        return `
            <div class="chart-bar-wrapper">
                <div class="chart-bar" style="height: ${height}px; background: ${color};">
                    <span class="chart-bar-value">${c.total}</span>
                </div>
                <span class="chart-bar-label">${c.name}</span>
            </div>
        `;
    }).join('');
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ===== Stock Management =====
function populateCategorySelects() {
    const categories = getCategories();
    const selects = ['stockCategory', 'stockCategoryFilter', 'usageCategoryFilter'];

    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;

        const currentVal = select.value;
        // Keep the first option
        const firstOption = select.querySelector('option:first-child');
        select.innerHTML = '';
        select.appendChild(firstOption);

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });

        select.value = currentVal;
    });
}

function refreshStockTable() {
    const stock = getStock();
    const tbody = document.getElementById('stockTableBody');
    populateCategorySelects();

    const categoryFilter = document.getElementById('stockCategoryFilter').value;
    const statusFilter = document.getElementById('stockStatusFilter').value;

    let filtered = [...stock];

    if (categoryFilter) {
        filtered = filtered.filter(s => s.category === categoryFilter);
    }

    if (statusFilter) {
        if (statusFilter === 'available') filtered = filtered.filter(s => s.quantity > s.minQuantity);
        if (statusFilter === 'low') filtered = filtered.filter(s => s.quantity > 0 && s.quantity <= s.minQuantity);
        if (statusFilter === 'out') filtered = filtered.filter(s => s.quantity === 0);
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="10">
                <div class="no-data">
                    <i class="fas fa-box-open"></i>
                    <h4>Ürün Bulunamadı</h4>
                    <p>Yeni ürün eklemek için "Yeni Ürün Ekle" butonunu kullanın</p>
                </div>
            </td></tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(s => {
        let statusClass, statusText;
        if (s.quantity === 0) {
            statusClass = 'status-out';
            statusText = '⛔ Tükendi';
        } else if (s.quantity <= s.minQuantity) {
            statusClass = 'status-low';
            statusText = '⚠️ Azalıyor';
        } else {
            statusClass = 'status-available';
            statusText = '✅ Mevcut';
        }

        return `
            <tr>
                <td><strong>${s.code}</strong></td>
                <td>${s.name}</td>
                <td>${getCategoryName(s.category)}</td>
                <td>${s.brand || '-'}</td>
                <td>${s.color || '-'}</td>
                <td>${s.size || '-'}</td>
                <td><strong>${s.quantity}</strong></td>
                <td>${s.minQuantity}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn use" onclick="quickUseBlock('${s.id}')" title="Kullan">
                            <i class="fas fa-minus-circle"></i>
                        </button>
                        <button class="action-btn edit" onclick="editStock('${s.id}')" title="Düzenle">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button class="action-btn delete" onclick="deleteStock('${s.id}')" title="Sil">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterStock() {
    refreshStockTable();
}

function openAddStockModal() {
    document.getElementById('stockForm').reset();
    document.getElementById('editStockId').value = '';
    document.getElementById('stockModalTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Yeni Ürün Ekle';
    populateCategorySelects();
    openModal('addStockModal');
}

function editStock(id) {
    const stock = getStock();
    const item = stock.find(s => s.id === id);
    if (!item) return;

    document.getElementById('editStockId').value = item.id;
    document.getElementById('stockCode').value = item.code;
    document.getElementById('stockName').value = item.name;
    document.getElementById('stockBrand').value = item.brand || '';
    document.getElementById('stockColor').value = item.color || '';
    document.getElementById('stockSize').value = item.size || '';
    document.getElementById('stockQuantity').value = item.quantity;
    document.getElementById('stockMinQuantity').value = item.minQuantity;
    document.getElementById('stockPrice').value = item.price || '';
    document.getElementById('stockSupplier').value = item.supplier || '';
    document.getElementById('stockNotes').value = item.notes || '';

    populateCategorySelects();
    document.getElementById('stockCategory').value = item.category;

    document.getElementById('stockModalTitle').innerHTML = '<i class="fas fa-pen"></i> Ürün Düzenle';
    openModal('addStockModal');
}

function saveStock(e) {
    e.preventDefault();

    const stock = getStock();
    const editId = document.getElementById('editStockId').value;

    const item = {
        id: editId || generateId('stk'),
        code: document.getElementById('stockCode').value.trim(),
        name: document.getElementById('stockName').value.trim(),
        category: document.getElementById('stockCategory').value,
        brand: document.getElementById('stockBrand').value.trim(),
        color: document.getElementById('stockColor').value.trim(),
        size: document.getElementById('stockSize').value.trim(),
        quantity: parseInt(document.getElementById('stockQuantity').value) || 0,
        minQuantity: parseInt(document.getElementById('stockMinQuantity').value) || 0,
        price: parseFloat(document.getElementById('stockPrice').value) || 0,
        supplier: document.getElementById('stockSupplier').value.trim(),
        notes: document.getElementById('stockNotes').value.trim()
    };

    if (editId) {
        const index = stock.findIndex(s => s.id === editId);
        if (index !== -1) stock[index] = item;
        showToast('Ürün başarıyla güncellendi', 'success');
    } else {
        stock.push(item);
        showToast('Yeni ürün başarıyla eklendi', 'success');
    }

    setData(DB_KEYS.STOCK, stock);
    closeModal('addStockModal');
    refreshStockTable();
    refreshDashboard();
}

function deleteStock(id) {
    const stock = getStock();
    const item = stock.find(s => s.id === id);
    if (!item) return;

    document.getElementById('confirmMessage').textContent =
        `"${item.name} (${item.color})" ürününü silmek istediğinize emin misiniz?`;

    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.onclick = () => {
        const updatedStock = stock.filter(s => s.id !== id);
        setData(DB_KEYS.STOCK, updatedStock);
        closeModal('confirmDialog');
        refreshStockTable();
        refreshDashboard();
        showToast('Ürün silindi', 'warning');
    };

    openModal('confirmDialog');
}

// ===== Quick Use Block =====
function quickUseBlock(stockId) {
    const stockItem = getStockItem(stockId);
    if (!stockItem) return;

    if (stockItem.quantity <= 0) {
        showToast('Bu ürün stokta bulunmuyor!', 'error');
        return;
    }

    // Pre-fill the use block modal
    openUseBlockModal();
    document.getElementById('useBlockProduct').value = stockId;
    updateBlockDetails();
}

// ===== Bulk Stock Entry =====
function openAddBulkModal() {
    document.getElementById('bulkForm').reset();
    const select = document.getElementById('bulkProduct');
    const stock = getStock();

    select.innerHTML = '<option value="">Seçiniz</option>';
    stock.forEach(s => {
        const option = document.createElement('option');
        option.value = s.id;
        option.textContent = `${s.code} - ${s.name} (${s.color}) [Mevcut: ${s.quantity}]`;
        select.appendChild(option);
    });

    openModal('addBulkModal');
}

function saveBulkStock(e) {
    e.preventDefault();

    const productId = document.getElementById('bulkProduct').value;
    const quantity = parseInt(document.getElementById('bulkQuantity').value) || 0;
    const notes = document.getElementById('bulkNotes').value.trim();

    if (!productId || quantity <= 0) {
        showToast('Lütfen ürün seçin ve miktar girin', 'error');
        return;
    }

    const stock = getStock();
    const item = stock.find(s => s.id === productId);
    if (!item) return;

    item.quantity += quantity;
    setData(DB_KEYS.STOCK, stock);

    closeModal('addBulkModal');
    refreshStockTable();
    refreshDashboard();
    showToast(`${item.name} (${item.color}) stokuna ${quantity} adet eklendi`, 'success');
}

// ===== Block Usage =====
function openUseBlockModal() {
    document.getElementById('useBlockForm').reset();
    const select = document.getElementById('useBlockProduct');
    const stock = getStock().filter(s => s.quantity > 0);

    select.innerHTML = '<option value="">Seçiniz</option>';
    stock.forEach(s => {
        const option = document.createElement('option');
        option.value = s.id;
        option.textContent = `${s.code} - ${s.name} (${s.color}) [Stok: ${s.quantity}]`;
        select.appendChild(option);
    });

    // Set current date and time
    const now = new Date();
    document.getElementById('useBlockDate').value = now.toISOString().split('T')[0];
    document.getElementById('useBlockTime').value = now.toTimeString().slice(0, 5);

    document.getElementById('blockInfo').classList.add('hidden');
    openModal('useBlockModal');
}

function updateBlockDetails() {
    const productId = document.getElementById('useBlockProduct').value;
    const blockInfo = document.getElementById('blockInfo');

    if (!productId) {
        blockInfo.classList.add('hidden');
        return;
    }

    const item = getStockItem(productId);
    if (!item) return;

    document.getElementById('blockCurrentStock').textContent = item.quantity;
    document.getElementById('blockColor').textContent = item.color || '-';
    document.getElementById('blockSize').textContent = item.size || '-';
    blockInfo.classList.remove('hidden');
}

function saveBlockUsage(e) {
    e.preventDefault();

    const productId = document.getElementById('useBlockProduct').value;
    const quantity = parseInt(document.getElementById('useBlockQuantity').value) || 0;
    const date = document.getElementById('useBlockDate').value;
    const time = document.getElementById('useBlockTime').value;
    const patient = document.getElementById('useBlockPatient').value.trim();
    const doctor = document.getElementById('useBlockDoctor').value.trim();
    const notes = document.getElementById('useBlockNotes').value.trim();

    if (!productId || quantity <= 0) {
        showToast('Lütfen tüm alanları doldurun', 'error');
        return;
    }

    // Check stock
    const stock = getStock();
    const item = stock.find(s => s.id === productId);
    if (!item) return;

    if (item.quantity < quantity) {
        showToast(`Yetersiz stok! Mevcut: ${item.quantity}`, 'error');
        return;
    }

    // Reduce stock
    item.quantity -= quantity;
    setData(DB_KEYS.STOCK, stock);

    // Add usage record
    const usage = getUsage();
    usage.push({
        id: generateId('use'),
        stockId: productId,
        date: date,
        time: time,
        quantity: quantity,
        patient: patient,
        doctor: doctor,
        notes: notes
    });
    setData(DB_KEYS.USAGE, usage);

    closeModal('useBlockModal');
    refreshStockTable();
    refreshUsageTable();
    refreshDashboard();
    showToast(`${item.name} (${item.color}) - ${quantity} adet kullanıldı`, 'success');
}

// ===== Usage History =====
function refreshUsageTable() {
    const usage = getUsage();
    const tbody = document.getElementById('usageTableBody');
    populateCategorySelects();

    // Sort by date and time (newest first)
    let sorted = [...usage].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
    });

    // Update stats
    updateUsageStats(sorted);

    if (sorted.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="11">
                <div class="no-data">
                    <i class="fas fa-clock-rotate-left"></i>
                    <h4>Kullanım Kaydı Bulunamadı</h4>
                    <p>Blok kullanmak için "Blok Kullan" butonunu kullanın</p>
                </div>
            </td></tr>
        `;
        return;
    }

    tbody.innerHTML = sorted.map(u => {
        const stockItem = getStockItem(u.stockId);
        const name = stockItem ? stockItem.name : 'Silinmiş Ürün';
        const category = stockItem ? getCategoryName(stockItem.category) : '-';
        const color = stockItem ? (stockItem.color || '-') : '-';
        const size = stockItem ? (stockItem.size || '-') : '-';

        return `
            <tr>
                <td><strong>${formatDate(u.date)}</strong></td>
                <td><span style="background: var(--primary-light); color: var(--primary); padding: 3px 10px; border-radius: 15px; font-weight: 600; font-size: 12px;">${u.time}</span></td>
                <td>${name}</td>
                <td>${category}</td>
                <td>${color}</td>
                <td>${size}</td>
                <td><strong>${u.quantity}</strong></td>
                <td>${u.patient || '-'}</td>
                <td>${u.doctor || '-'}</td>
                <td>${u.notes || '-'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn delete" onclick="deleteUsage('${u.id}')" title="Kaydı Sil">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function updateUsageStats(usageData) {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];

    const totalUsed = usageData.reduce((sum, u) => sum + u.quantity, 0);
    const todayUsed = usageData.filter(u => u.date === today).reduce((sum, u) => sum + u.quantity, 0);
    const weekUsed = usageData.filter(u => u.date >= weekAgoStr).reduce((sum, u) => sum + u.quantity, 0);

    document.getElementById('totalUsedBlocks').textContent = totalUsed;
    document.getElementById('todayUsedBlocks').textContent = todayUsed;
    document.getElementById('weekUsedBlocks').textContent = weekUsed;
}

function filterUsageHistory() {
    const startDate = document.getElementById('usageDateStart').value;
    const endDate = document.getElementById('usageDateEnd').value;
    const categoryFilter = document.getElementById('usageCategoryFilter').value;
    const searchText = document.getElementById('usageSearchInput').value.toLowerCase().trim();

    const usage = getUsage();
    const tbody = document.getElementById('usageTableBody');

    let filtered = [...usage];

    if (startDate) {
        filtered = filtered.filter(u => u.date >= startDate);
    }
    if (endDate) {
        filtered = filtered.filter(u => u.date <= endDate);
    }
    if (categoryFilter) {
        filtered = filtered.filter(u => {
            const stockItem = getStockItem(u.stockId);
            return stockItem && stockItem.category === categoryFilter;
        });
    }
    if (searchText) {
        filtered = filtered.filter(u => {
            const stockItem = getStockItem(u.stockId);
            const name = stockItem ? stockItem.name.toLowerCase() : '';
            const patient = (u.patient || '').toLowerCase();
            const doctor = (u.doctor || '').toLowerCase();
            const notes = (u.notes || '').toLowerCase();
            return name.includes(searchText) || patient.includes(searchText) ||
                   doctor.includes(searchText) || notes.includes(searchText);
        });
    }

    // Sort by date/time
    filtered.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
    });

    updateUsageStats(filtered);

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="11">
                <div class="no-data">
                    <i class="fas fa-search"></i>
                    <h4>Sonuç Bulunamadı</h4>
                    <p>Filtreleri değiştirerek tekrar deneyin</p>
                </div>
            </td></tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(u => {
        const stockItem = getStockItem(u.stockId);
        const name = stockItem ? stockItem.name : 'Silinmiş Ürün';
        const category = stockItem ? getCategoryName(stockItem.category) : '-';
        const color = stockItem ? (stockItem.color || '-') : '-';
        const size = stockItem ? (stockItem.size || '-') : '-';

        return `
            <tr>
                <td><strong>${formatDate(u.date)}</strong></td>
                <td><span style="background: var(--primary-light); color: var(--primary); padding: 3px 10px; border-radius: 15px; font-weight: 600; font-size: 12px;">${u.time}</span></td>
                <td>${name}</td>
                <td>${category}</td>
                <td>${color}</td>
                <td>${size}</td>
                <td><strong>${u.quantity}</strong></td>
                <td>${u.patient || '-'}</td>
                <td>${u.doctor || '-'}</td>
                <td>${u.notes || '-'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn delete" onclick="deleteUsage('${u.id}')" title="Kaydı Sil">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function clearUsageFilters() {
    document.getElementById('usageDateStart').value = '';
    document.getElementById('usageDateEnd').value = '';
    document.getElementById('usageCategoryFilter').value = '';
    document.getElementById('usageSearchInput').value = '';
    refreshUsageTable();
}

function deleteUsage(id) {
    const usage = getUsage();
    const record = usage.find(u => u.id === id);
    if (!record) return;

    const stockItem = getStockItem(record.stockId);
    const name = stockItem ? stockItem.name : 'Silinmiş Ürün';

    document.getElementById('confirmMessage').textContent =
        `"${name}" kullanım kaydını silmek istediğinize emin misiniz? Stok miktarı geri yüklenmeyecektir.`;

    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.onclick = () => {
        const updated = usage.filter(u => u.id !== id);
        setData(DB_KEYS.USAGE, updated);
        closeModal('confirmDialog');
        refreshUsageTable();
        refreshDashboard();
        showToast('Kullanım kaydı silindi', 'warning');
    };

    openModal('confirmDialog');
}

function exportUsageHistory() {
    const usage = getUsage();
    if (usage.length === 0) {
        showToast('Dışa aktarılacak veri yok', 'warning');
        return;
    }

    const sorted = [...usage].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
    });

    let csv = '\uFEFF'; // BOM for Turkish characters
    csv += 'Tarih;Saat;Ürün Adı;Kategori;Renk/Ton;Boyut;Miktar;Hasta Adı;Doktor;Notlar\n';

    sorted.forEach(u => {
        const stockItem = getStockItem(u.stockId);
        const name = stockItem ? stockItem.name : 'Silinmiş Ürün';
        const category = stockItem ? getCategoryName(stockItem.category) : '-';
        const color = stockItem ? (stockItem.color || '-') : '-';
        const size = stockItem ? (stockItem.size || '-') : '-';

        csv += `${formatDate(u.date)};${u.time};${name};${category};${color};${size};${u.quantity};${u.patient || '-'};${u.doctor || '-'};${u.notes || '-'}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AntalyaSmileDesign_KullanimGecmisi_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Kullanım geçmişi dışa aktarıldı', 'success');
}

// ===== Categories =====
function refreshCategories() {
    const categories = getCategories();
    const stock = getStock();
    const container = document.getElementById('categoriesGrid');

    container.innerHTML = categories.map(cat => {
        const items = stock.filter(s => s.category === cat.id);
        const totalQty = items.reduce((sum, s) => sum + s.quantity, 0);
        const totalItems = items.length;

        return `
            <div class="category-card">
                <div class="category-card-actions">
                    <button class="action-btn edit" onclick="editCategory('${cat.id}')" title="Düzenle">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteCategory('${cat.id}')" title="Sil">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="category-card-icon">
                    <i class="fas ${cat.icon || 'fa-cube'}"></i>
                </div>
                <h4>${cat.name}</h4>
                <p>${cat.description || 'Açıklama yok'}</p>
                <div class="category-card-stats">
                    <div class="category-stat">
                        <span class="category-stat-value">${totalItems}</span>
                        <span class="category-stat-label">Ürün Çeşidi</span>
                    </div>
                    <div class="category-stat">
                        <span class="category-stat-value">${totalQty}</span>
                        <span class="category-stat-label">Toplam Adet</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openAddCategoryModal() {
    document.getElementById('categoryForm').reset();
    document.getElementById('editCategoryId').value = '';
    openModal('addCategoryModal');
}

function editCategory(id) {
    const categories = getCategories();
    const cat = categories.find(c => c.id === id);
    if (!cat) return;

    document.getElementById('editCategoryId').value = cat.id;
    document.getElementById('categoryName').value = cat.name;
    document.getElementById('categoryDescription').value = cat.description || '';
    document.getElementById('categoryIcon').value = cat.icon || 'fa-cube';
    openModal('addCategoryModal');
}

function saveCategory(e) {
    e.preventDefault();

    const categories = getCategories();
    const editId = document.getElementById('editCategoryId').value;

    const cat = {
        id: editId || generateId('cat'),
        name: document.getElementById('categoryName').value.trim(),
        description: document.getElementById('categoryDescription').value.trim(),
        icon: document.getElementById('categoryIcon').value
    };

    if (editId) {
        const index = categories.findIndex(c => c.id === editId);
        if (index !== -1) categories[index] = cat;
        showToast('Kategori güncellendi', 'success');
    } else {
        categories.push(cat);
        showToast('Yeni kategori eklendi', 'success');
    }

    setData(DB_KEYS.CATEGORIES, categories);
    closeModal('addCategoryModal');
    refreshCategories();
    populateCategorySelects();
}

function deleteCategory(id) {
    const stock = getStock();
    const hasItems = stock.some(s => s.category === id);

    if (hasItems) {
        showToast('Bu kategoride ürünler var! Önce ürünleri başka kategoriye taşıyın.', 'error');
        return;
    }

    const categories = getCategories();
    const cat = categories.find(c => c.id === id);

    document.getElementById('confirmMessage').textContent =
        `"${cat.name}" kategorisini silmek istediğinize emin misiniz?`;

    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.onclick = () => {
        const updated = categories.filter(c => c.id !== id);
        setData(DB_KEYS.CATEGORIES, updated);
        closeModal('confirmDialog');
        refreshCategories();
        populateCategorySelects();
        showToast('Kategori silindi', 'warning');
    };

    openModal('confirmDialog');
}

// ===== Reports =====
function generateStockReport() {
    const stock = getStock();
    const reportOutput = document.getElementById('reportOutput');
    const reportTitle = document.getElementById('reportTitle');
    const reportContent = document.getElementById('reportContent');

    reportTitle.innerHTML = '<i class="fas fa-warehouse" style="margin-right: 8px;"></i> Stok Durumu Raporu';
    reportOutput.classList.remove('hidden');

    const totalValue = stock.reduce((sum, s) => sum + (s.quantity * s.price), 0);

    let html = `
        <div style="margin-bottom: 20px; display: flex; gap: 30px;">
            <div><strong>Rapor Tarihi:</strong> ${new Date().toLocaleDateString('tr-TR')}</div>
            <div><strong>Toplam Ürün Çeşidi:</strong> ${stock.length}</div>
            <div><strong>Toplam Stok Değeri:</strong> ₺${totalValue.toLocaleString('tr-TR')}</div>
        </div>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Kod</th>
                    <th>Ürün Adı</th>
                    <th>Kategori</th>
                    <th>Marka</th>
                    <th>Renk</th>
                    <th>Boyut</th>
                    <th>Miktar</th>
                    <th>Min. Stok</th>
                    <th>Birim Fiyat</th>
                    <th>Toplam Değer</th>
                    <th>Durum</th>
                </tr>
            </thead>
            <tbody>
    `;

    stock.forEach(s => {
        let status;
        if (s.quantity === 0) status = '⛔ Tükendi';
        else if (s.quantity <= s.minQuantity) status = '⚠️ Azalıyor';
        else status = '✅ Yeterli';

        html += `
            <tr>
                <td>${s.code}</td>
                <td>${s.name}</td>
                <td>${getCategoryName(s.category)}</td>
                <td>${s.brand || '-'}</td>
                <td>${s.color || '-'}</td>
                <td>${s.size || '-'}</td>
                <td><strong>${s.quantity}</strong></td>
                <td>${s.minQuantity}</td>
                <td>₺${(s.price || 0).toLocaleString('tr-TR')}</td>
                <td>₺${(s.quantity * (s.price || 0)).toLocaleString('tr-TR')}</td>
                <td>${status}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    reportContent.innerHTML = html;
}

function generateUsageReport() {
    const usage = getUsage();
    const reportOutput = document.getElementById('reportOutput');
    const reportTitle = document.getElementById('reportTitle');
    const reportContent = document.getElementById('reportContent');

    reportTitle.innerHTML = '<i class="fas fa-chart-line" style="margin-right: 8px;"></i> Kullanım Raporu';
    reportOutput.classList.remove('hidden');

    const sorted = [...usage].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
    });

    const totalUsed = usage.reduce((sum, u) => sum + u.quantity, 0);

    // Group by product
    const byProduct = {};
    usage.forEach(u => {
        const item = getStockItem(u.stockId);
        const key = item ? `${item.name} (${item.color})` : 'Bilinmiyor';
        if (!byProduct[key]) byProduct[key] = 0;
        byProduct[key] += u.quantity;
    });

    let html = `
        <div style="margin-bottom: 20px; display: flex; gap: 30px;">
            <div><strong>Rapor Tarihi:</strong> ${new Date().toLocaleDateString('tr-TR')}</div>
            <div><strong>Toplam Kullanım:</strong> ${totalUsed} adet</div>
            <div><strong>Toplam Kayıt:</strong> ${usage.length}</div>
        </div>
        <h4 style="margin-bottom: 12px;">Ürün Bazlı Kullanım</h4>
        <table class="report-table">
            <thead><tr><th>Ürün</th><th>Toplam Kullanım</th></tr></thead>
            <tbody>
    `;

    Object.entries(byProduct).sort((a, b) => b[1] - a[1]).forEach(([name, qty]) => {
        html += `<tr><td>${name}</td><td><strong>${qty}</strong></td></tr>`;
    });

    html += `</tbody></table>
        <h4 style="margin: 20px 0 12px;">Detaylı Kullanım Geçmişi</h4>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Tarih</th><th>Saat</th><th>Ürün</th><th>Miktar</th><th>Hasta</th><th>Doktor</th><th>Not</th>
                </tr>
            </thead>
            <tbody>
    `;

    sorted.forEach(u => {
        const item = getStockItem(u.stockId);
        const name = item ? `${item.name} (${item.color})` : 'Silinmiş';
        html += `
            <tr>
                <td>${formatDate(u.date)}</td>
                <td>${u.time}</td>
                <td>${name}</td>
                <td><strong>${u.quantity}</strong></td>
                <td>${u.patient || '-'}</td>
                <td>${u.doctor || '-'}</td>
                <td>${u.notes || '-'}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    reportContent.innerHTML = html;
}

function generateLowStockReport() {
    const stock = getStock();
    const reportOutput = document.getElementById('reportOutput');
    const reportTitle = document.getElementById('reportTitle');
    const reportContent = document.getElementById('reportContent');

    reportTitle.innerHTML = '<i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i> Azalan Stok Raporu';
    reportOutput.classList.remove('hidden');

    const lowItems = stock.filter(s => s.quantity <= s.minQuantity);

    if (lowItems.length === 0) {
        reportContent.innerHTML = '<div class="no-data"><i class="fas fa-check-circle" style="color: var(--success);"></i><h4>Tüm stoklar yeterli seviyede!</h4></div>';
        return;
    }

    let html = `
        <div style="margin-bottom: 20px; background: var(--danger-light); padding: 12px 20px; border-radius: 8px; color: var(--danger); font-weight: 600;">
            ⚠️ ${lowItems.length} ürün kritik stok seviyesinde!
        </div>
        <table class="report-table">
            <thead>
                <tr><th>Kod</th><th>Ürün</th><th>Marka</th><th>Renk</th><th>Mevcut</th><th>Minimum</th><th>Eksik</th><th>Tedarikçi</th><th>Durum</th></tr>
            </thead>
            <tbody>
    `;

    lowItems.forEach(s => {
        const deficit = s.minQuantity - s.quantity;
        const status = s.quantity === 0 ? '⛔ ACİL' : '⚠️ DÜŞÜK';
        html += `
            <tr style="background: ${s.quantity === 0 ? 'var(--danger-light)' : 'var(--warning-light)'}">
                <td>${s.code}</td>
                <td><strong>${s.name}</strong></td>
                <td>${s.brand || '-'}</td>
                <td>${s.color || '-'}</td>
                <td><strong>${s.quantity}</strong></td>
                <td>${s.minQuantity}</td>
                <td style="color: var(--danger); font-weight: 700;">${deficit > 0 ? deficit : 0}</td>
                <td>${s.supplier || '-'}</td>
                <td><strong>${status}</strong></td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    reportContent.innerHTML = html;
}

function generateMonthlyReport() {
    const usage = getUsage();
    const stock = getStock();
    const reportOutput = document.getElementById('reportOutput');
    const reportTitle = document.getElementById('reportTitle');
    const reportContent = document.getElementById('reportContent');

    reportTitle.innerHTML = '<i class="fas fa-calendar-alt" style="margin-right: 8px;"></i> Aylık Analiz Raporu';
    reportOutput.classList.remove('hidden');

    // Group usage by month
    const byMonth = {};
    usage.forEach(u => {
        const month = u.date.substring(0, 7); // YYYY-MM
        if (!byMonth[month]) byMonth[month] = { count: 0, quantity: 0 };
        byMonth[month].count++;
        byMonth[month].quantity += u.quantity;
    });

    // Group by doctor
    const byDoctor = {};
    usage.forEach(u => {
        const doc = u.doctor || 'Belirtilmemiş';
        if (!byDoctor[doc]) byDoctor[doc] = 0;
        byDoctor[doc] += u.quantity;
    });

    const totalValue = stock.reduce((sum, s) => sum + (s.quantity * s.price), 0);

    let html = `
        <div style="margin-bottom: 20px; display: flex; gap: 30px; flex-wrap: wrap;">
            <div><strong>Rapor Tarihi:</strong> ${new Date().toLocaleDateString('tr-TR')}</div>
            <div><strong>Toplam Stok Değeri:</strong> ₺${totalValue.toLocaleString('tr-TR')}</div>
        </div>
        <h4 style="margin-bottom: 12px;">Aylık Kullanım Özeti</h4>
        <table class="report-table">
            <thead><tr><th>Ay</th><th>İşlem Sayısı</th><th>Kullanılan Miktar</th></tr></thead>
            <tbody>
    `;

    Object.entries(byMonth).sort((a, b) => b[0].localeCompare(a[0])).forEach(([month, data]) => {
        const [y, m] = month.split('-');
        const monthName = new Date(y, m - 1).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
        html += `<tr><td>${monthName}</td><td>${data.count}</td><td><strong>${data.quantity}</strong></td></tr>`;
    });

    html += `</tbody></table>
        <h4 style="margin: 20px 0 12px;">Doktor Bazlı Kullanım</h4>
        <table class="report-table">
            <thead><tr><th>Doktor</th><th>Toplam Kullanım</th></tr></thead>
            <tbody>
    `;

    Object.entries(byDoctor).sort((a, b) => b[1] - a[1]).forEach(([doc, qty]) => {
        html += `<tr><td>${doc}</td><td><strong>${qty}</strong></td></tr>`;
    });

    html += '</tbody></table>';
    reportContent.innerHTML = html;
}

function printReport() {
    window.print();
}

// ===== Global Search =====
function setupGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) return;

        // Search in stock
        const stock = getStock();
        const results = stock.filter(s =>
            s.name.toLowerCase().includes(query) ||
            s.code.toLowerCase().includes(query) ||
            s.brand.toLowerCase().includes(query) ||
            (s.color && s.color.toLowerCase().includes(query))
        );

        if (results.length > 0) {
            switchPage('stock');
            // Highlight results
            const tbody = document.getElementById('stockTableBody');
            setTimeout(() => {
                tbody.querySelectorAll('tr').forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(query)) {
                        row.classList.add('highlight-row');
                    }
                });
            }, 100);
        }
    });
}

// ===== Sidebar Toggle =====
function setupSidebar() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Navigation clicks
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            switchPage(page);

            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
}

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    setupSidebar();
    setupGlobalSearch();
    updateDateTime();
    setInterval(updateDateTime, 60000);

    // Set default dates for usage filter
    const today = new Date();
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    document.getElementById('usageDateEnd').value = today.toISOString().split('T')[0];
    document.getElementById('usageDateStart').value = monthAgo.toISOString().split('T')[0];

    // Initial page load
    refreshDashboard();
    populateCategorySelects();
});
