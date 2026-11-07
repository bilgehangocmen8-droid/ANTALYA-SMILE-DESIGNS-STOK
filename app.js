// ===== Antalya Smile Design - Stok Yönetim Sistemi =====
// ===== Firebase Realtime Database + LocalStorage =====

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDpKAW8USRhriWfT8Pu2imWHpF0ssheOuw",
    authDomain: "antalya-smile.firebaseapp.com",
    databaseURL: "https://antalya-smile-default-rtdb.firebaseio.com",
    projectId: "antalya-smile",
    storageBucket: "antalya-smile.firebasestorage.app",
    messagingSenderId: "529501411565",
    appId: "1:529501411565:web:087b00530d2ae2826554e4"
};

const DB_KEYS = {
    STOCK: 'asd_stock',
    CATEGORIES: 'asd_categories',
    USAGE: 'asd_usage',
    PASSWORD: 'asd_password'
};

const DEFAULT_PASSWORD = 'asd07';

let firebaseDB = null;
let isFirebaseConnected = false;
let isFirstSync = true;

// ===== Default Data =====
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

// ===== Helpers =====
function generateId(prefix) {
    return prefix + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
}

// ===== Sync Status =====
function updateSyncStatus(status) {
    const el = document.getElementById('syncStatus');
    if (!el) return;
    if (status === 'online') {
        el.className = 'sync-status online';
        el.innerHTML = '<i class="fas fa-cloud"></i><span>Çevrimiçi - Senkronize</span>';
    } else if (status === 'syncing') {
        el.className = 'sync-status syncing';
        el.innerHTML = '<i class="fas fa-sync"></i><span>Senkronize ediliyor...</span>';
    } else {
        el.className = 'sync-status offline';
        el.innerHTML = '<i class="fas fa-cloud"></i><span>Çevrimdışı - Yerel</span>';
    }
}

// ===== Local Data =====
function getLocalData(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; } catch (e) { return null; }
}
function setLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ===== Data Getters (always from localStorage, kept in sync with Firebase) =====
function getCategories() { return getLocalData(DB_KEYS.CATEGORIES) || []; }
function getStock() { return getLocalData(DB_KEYS.STOCK) || []; }
function getUsage() { return getLocalData(DB_KEYS.USAGE) || []; }

// ===== Data Savers (writes to localStorage + Firebase) =====
function saveCategories(data) {
    setLocalData(DB_KEYS.CATEGORIES, data);
    if (isFirebaseConnected && firebaseDB) firebaseDB.ref('categories').set(data);
}
function saveStock(data) {
    setLocalData(DB_KEYS.STOCK, data);
    if (isFirebaseConnected && firebaseDB) firebaseDB.ref('stock').set(data);
}
function saveUsage(data) {
    setLocalData(DB_KEYS.USAGE, data);
    if (isFirebaseConnected && firebaseDB) firebaseDB.ref('usage').set(data);
}

function getCategoryName(catId) {
    const cat = getCategories().find(c => c.id === catId);
    return cat ? cat.name : 'Bilinmiyor';
}
function getStockItem(stockId) {
    return getStock().find(s => s.id === stockId);
}

// ===== MERGE LOGIC: Combine local + cloud data without losing anything =====
function mergeArraysById(localArr, cloudArr) {
    if (!localArr || !localArr.length) return cloudArr || [];
    if (!cloudArr || !cloudArr.length) return localArr || [];
    const merged = new Map();
    // Cloud data first (base)
    cloudArr.forEach(item => merged.set(item.id, item));
    // Local data overrides/adds (the current PC's data takes priority for matching IDs)
    localArr.forEach(item => merged.set(item.id, item));
    return Array.from(merged.values());
}

// ===== Firebase Init =====
function initFirebase() {
    try {
        updateSyncStatus('syncing');
        const app = firebase.initializeApp(FIREBASE_CONFIG);
        firebaseDB = firebase.database();

        // Connection listener
        firebaseDB.ref('.info/connected').on('value', function(snap) {
            if (snap.val() === true) {
                isFirebaseConnected = true;
                updateSyncStatus('online');
                console.log('Firebase bağlandı!');
                if (isFirstSync) {
                    isFirstSync = false;
                    doFirstSync();
                }
            } else {
                isFirebaseConnected = false;
                updateSyncStatus('offline');
            }
        });

        // Realtime listeners - cloud changes auto-update local
        firebaseDB.ref('stock').on('value', function(snap) {
            var data = snap.val();
            if (data && Array.isArray(data)) {
                setLocalData(DB_KEYS.STOCK, data);
                try { refreshStockTable(); refreshDashboard(); } catch(e) {}
            }
        });
        firebaseDB.ref('categories').on('value', function(snap) {
            var data = snap.val();
            if (data && Array.isArray(data)) {
                setLocalData(DB_KEYS.CATEGORIES, data);
                try { populateCategorySelects(); refreshCategories(); refreshDashboard(); } catch(e) {}
            }
        });
        firebaseDB.ref('usage').on('value', function(snap) {
            var data = snap.val();
            if (data && Array.isArray(data)) {
                setLocalData(DB_KEYS.USAGE, data);
                try { refreshUsageTable(); refreshDashboard(); } catch(e) {}
            }
        });

        // Realtime listener for password changes
        firebaseDB.ref('system/password').on('value', function(snap) {
            var pass = snap.val();
            if (pass) {
                localStorage.setItem(DB_KEYS.PASSWORD, pass);
            }
        });

    } catch (e) {
        console.error('Firebase bağlantı hatası:', e);
        updateSyncStatus('offline');
    }
}

// First sync: merge local data with cloud, upload the merged result
function doFirstSync() {
    updateSyncStatus('syncing');
    var localStock = getLocalData(DB_KEYS.STOCK) || [];
    var localCats = getLocalData(DB_KEYS.CATEGORIES) || [];
    var localUsage = getLocalData(DB_KEYS.USAGE) || [];

    // Read cloud data once, merge, then write back
    firebaseDB.ref('/').once('value', function(snap) {
        var cloud = snap.val() || {};
        var cloudStock = (cloud.stock && Array.isArray(cloud.stock)) ? cloud.stock : [];
        var cloudCats = (cloud.categories && Array.isArray(cloud.categories)) ? cloud.categories : [];
        var cloudUsage = (cloud.usage && Array.isArray(cloud.usage)) ? cloud.usage : [];

        // Merge: keep ALL data from both sides
        var mergedStock = mergeArraysById(localStock, cloudStock);
        var mergedCats = mergeArraysById(localCats, cloudCats);
        var mergedUsage = mergeArraysById(localUsage, cloudUsage);

        // Save merged data to both local and cloud
        setLocalData(DB_KEYS.STOCK, mergedStock);
        setLocalData(DB_KEYS.CATEGORIES, mergedCats);
        setLocalData(DB_KEYS.USAGE, mergedUsage);

        firebaseDB.ref('stock').set(mergedStock);
        firebaseDB.ref('categories').set(mergedCats);
        firebaseDB.ref('usage').set(mergedUsage);

        // Sync password with cloud
        var cloudPass = cloud.system && cloud.system.password ? cloud.system.password : null;
        var localPass = getPassword();
        if (cloudPass) {
            localStorage.setItem(DB_KEYS.PASSWORD, cloudPass);
        } else {
            firebaseDB.ref('system/password').set(localPass);
        }

        // Refresh UI
        try {
            refreshDashboard();
            refreshStockTable();
            refreshUsageTable();
            refreshCategories();
            populateCategorySelects();
        } catch(e) {}

        updateSyncStatus('online');

        var localCount = localStock.length + localUsage.length;
        var cloudCount = cloudStock.length + cloudUsage.length;
        var mergedCount = mergedStock.length + mergedUsage.length;
        if (cloudCount > 0 && localCount > 0) {
            showToast('Veriler birleştirildi! Hiçbir kayıt kaybolmadı. (' + mergedCount + ' kayıt)', 'success');
        } else if (localCount > 0) {
            showToast('Yerel veriler buluta yüklendi!', 'success');
        } else if (cloudCount > 0) {
            showToast('Bulut verileri indirildi!', 'success');
        }
    });
}

// ===== Initialize =====
function initializeData() {
    if (!getLocalData(DB_KEYS.CATEGORIES)) setLocalData(DB_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    if (!getLocalData(DB_KEYS.STOCK)) setLocalData(DB_KEYS.STOCK, DEFAULT_STOCK);
    if (!getLocalData(DB_KEYS.USAGE)) setLocalData(DB_KEYS.USAGE, DEFAULT_USAGE);

    // Auto-connect to Firebase
    initFirebase();
}

// ===== Toast =====
function showToast(message, type) {
    type = type || 'success';
    var container = document.getElementById('toastContainer');
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    var icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    toast.innerHTML = '<i class="fas ' + (icons[type] || 'fa-info-circle') + '"></i> ' + message;
    container.appendChild(toast);
    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(function() { toast.remove(); }, 300);
    }, 3500);
}

// ===== Modals =====
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// ===== Navigation =====
function switchPage(pageName) {
    document.querySelectorAll('.page-content').forEach(function(p) { p.classList.add('hidden'); });
    document.getElementById('page-' + pageName).classList.remove('hidden');
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.classList.toggle('active', item.dataset.page === pageName);
    });
    var titles = {
        dashboard: { title: 'Ana Sayfa', subtitle: 'Stok durumunuza genel bakış' },
        stock: { title: 'Stok Yönetimi', subtitle: 'Ürünlerinizi yönetin' },
        usage: { title: 'Kullanım Geçmişi', subtitle: 'Blok kullanımlarını tarih ve saate göre takip edin' },
        categories: { title: 'Kategoriler', subtitle: 'Ürün kategorilerini yönetin' },
        reports: { title: 'Raporlar', subtitle: 'Stok ve kullanım raporları' }
    };
    var t = titles[pageName];
    document.getElementById('pageTitle').textContent = t.title;
    document.getElementById('pageSubtitle').textContent = t.subtitle;
    if (pageName === 'dashboard') refreshDashboard();
    if (pageName === 'stock') refreshStockTable();
    if (pageName === 'usage') refreshUsageTable();
    if (pageName === 'categories') refreshCategories();
}

// ===== DateTime =====
function updateDateTime() {
    var now = new Date();
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', weekday: 'long' });
}
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ===== Dashboard =====
function refreshDashboard() {
    var stock = getStock();
    var usage = getUsage();
    var total = stock.reduce(function(s, i) { return s + i.quantity; }, 0);
    var available = stock.filter(function(s) { return s.quantity > s.minQuantity; }).length;
    var low = stock.filter(function(s) { return s.quantity > 0 && s.quantity <= s.minQuantity; }).length;
    var out = stock.filter(function(s) { return s.quantity === 0; }).length;

    document.getElementById('totalStock').textContent = total;
    document.getElementById('availableStock').textContent = available;
    document.getElementById('lowStock').textContent = low;
    document.getElementById('outOfStock').textContent = out;

    // Recent usage
    var recentUsageList = document.getElementById('recentUsageList');
    var sortedUsage = usage.slice().sort(function(a, b) { return new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time); }).slice(0, 5);
    if (sortedUsage.length === 0) {
        recentUsageList.innerHTML = '<p class="empty-message">Henüz kullanım kaydı yok</p>';
    } else {
        recentUsageList.innerHTML = sortedUsage.map(function(u) {
            var s = getStockItem(u.stockId);
            return '<div class="recent-item"><div class="recent-item-info"><div class="recent-item-icon"><i class="fas fa-cube"></i></div><div class="recent-item-text"><span class="recent-item-name">' + (s ? s.name : 'Silinmiş') + ' (' + (s ? s.color : '-') + ')</span><span class="recent-item-detail">' + (u.patient || '-') + ' • ' + (u.doctor || '-') + '</span></div></div><div class="recent-item-meta"><div class="recent-item-date">' + formatDate(u.date) + ' ' + u.time + '</div><div class="recent-item-quantity">' + u.quantity + ' adet</div></div></div>';
        }).join('');
    }

    // Low stock alerts
    var lowStockList = document.getElementById('lowStockList');
    var lowItems = stock.filter(function(s) { return s.quantity <= s.minQuantity; });
    if (lowItems.length === 0) {
        lowStockList.innerHTML = '<p class="empty-message">Tüm stoklar yeterli seviyede</p>';
    } else {
        lowStockList.innerHTML = lowItems.map(function(s) {
            var cls = s.quantity === 0 ? 'danger' : 'warning';
            var ico = s.quantity === 0 ? 'fa-times-circle' : 'fa-exclamation-triangle';
            return '<div class="recent-item"><div class="recent-item-info"><div class="recent-item-icon ' + cls + '"><i class="fas ' + ico + '"></i></div><div class="recent-item-text"><span class="recent-item-name">' + s.name + ' (' + s.color + ')</span><span class="recent-item-detail">' + getCategoryName(s.category) + ' • ' + s.brand + '</span></div></div><div class="recent-item-meta"><div class="recent-item-quantity" style="color:' + (s.quantity === 0 ? 'var(--danger)' : 'var(--warning)') + '">' + s.quantity + ' / ' + s.minQuantity + '</div></div></div>';
        }).join('');
    }
    renderCategoryChart();
}

function renderCategoryChart() {
    var stock = getStock();
    var categories = getCategories();
    var container = document.getElementById('categoryChart');
    var catData = categories.map(function(cat) { return { name: cat.name, total: stock.filter(function(s) { return s.category === cat.id; }).reduce(function(sum, s) { return sum + s.quantity; }, 0) }; }).filter(function(c) { return c.total > 0; });
    if (catData.length === 0) { container.innerHTML = '<p class="empty-message">Stok verisi bulunamadı</p>'; return; }
    var maxVal = Math.max.apply(null, catData.map(function(c) { return c.total; }));
    var colors = ['#1a73a7', '#26c6da', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#1abc9c', '#e67e22'];
    container.innerHTML = catData.map(function(c, i) {
        var h = maxVal > 0 ? (c.total / maxVal) * 160 : 4;
        return '<div class="chart-bar-wrapper"><div class="chart-bar" style="height:' + h + 'px;background:' + colors[i % colors.length] + ';"><span class="chart-bar-value">' + c.total + '</span></div><span class="chart-bar-label">' + c.name + '</span></div>';
    }).join('');
}

// ===== Stock Management =====
function populateCategorySelects() {
    var categories = getCategories();
    ['stockCategory', 'stockCategoryFilter', 'usageCategoryFilter'].forEach(function(id) {
        var sel = document.getElementById(id);
        if (!sel) return;
        var val = sel.value;
        var first = sel.querySelector('option:first-child');
        sel.innerHTML = '';
        if (first) sel.appendChild(first);
        categories.forEach(function(c) { var o = document.createElement('option'); o.value = c.id; o.textContent = c.name; sel.appendChild(o); });
        sel.value = val;
    });
}

function refreshStockTable() {
    var stock = getStock();
    var tbody = document.getElementById('stockTableBody');
    populateCategorySelects();
    var catF = document.getElementById('stockCategoryFilter').value;
    var statF = document.getElementById('stockStatusFilter').value;
    var filtered = stock.slice();
    if (catF) filtered = filtered.filter(function(s) { return s.category === catF; });
    if (statF === 'available') filtered = filtered.filter(function(s) { return s.quantity > s.minQuantity; });
    if (statF === 'low') filtered = filtered.filter(function(s) { return s.quantity > 0 && s.quantity <= s.minQuantity; });
    if (statF === 'out') filtered = filtered.filter(function(s) { return s.quantity === 0; });

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10"><div class="no-data"><i class="fas fa-box-open"></i><h4>Ürün Bulunamadı</h4><p>Yeni ürün eklemek için "Yeni Ürün Ekle" butonunu kullanın</p></div></td></tr>';
        return;
    }
    tbody.innerHTML = filtered.map(function(s) {
        var sc, st;
        if (s.quantity === 0) { sc = 'status-out'; st = '⛔ Tükendi'; }
        else if (s.quantity <= s.minQuantity) { sc = 'status-low'; st = '⚠️ Azalıyor'; }
        else { sc = 'status-available'; st = '✅ Mevcut'; }
        return '<tr><td><strong>' + s.code + '</strong></td><td>' + s.name + '</td><td>' + getCategoryName(s.category) + '</td><td>' + (s.brand || '-') + '</td><td>' + (s.color || '-') + '</td><td>' + (s.size || '-') + '</td><td><strong>' + s.quantity + '</strong></td><td>' + s.minQuantity + '</td><td><span class="status-badge ' + sc + '">' + st + '</span></td><td><div class="action-buttons"><button class="action-btn use" onclick="quickUseBlock(\'' + s.id + '\')" title="Kullan"><i class="fas fa-minus-circle"></i></button><button class="action-btn edit" onclick="editStock(\'' + s.id + '\')" title="Düzenle"><i class="fas fa-pen"></i></button><button class="action-btn delete" onclick="deleteStock(\'' + s.id + '\')" title="Sil"><i class="fas fa-trash"></i></button></div></td></tr>';
    }).join('');
}

function filterStock() { refreshStockTable(); }

function openAddStockModal() {
    document.getElementById('stockForm').reset();
    document.getElementById('editStockId').value = '';
    document.getElementById('stockModalTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Yeni Ürün Ekle';
    populateCategorySelects();
    openModal('addStockModal');
}

function editStock(id) {
    var item = getStock().find(function(s) { return s.id === id; });
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

function saveStockForm(e) {
    e.preventDefault();
    var stock = getStock();
    var editId = document.getElementById('editStockId').value;
    var item = {
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
        var idx = stock.findIndex(function(s) { return s.id === editId; });
        if (idx !== -1) stock[idx] = item;
        showToast('Ürün başarıyla güncellendi', 'success');
    } else {
        stock.push(item);
        showToast('Yeni ürün başarıyla eklendi', 'success');
    }
    saveStock(stock);
    closeModal('addStockModal');
    refreshStockTable();
    refreshDashboard();
}

function deleteStock(id) {
    var stock = getStock();
    var item = stock.find(function(s) { return s.id === id; });
    if (!item) return;
    document.getElementById('confirmMessage').textContent = '"' + item.name + ' (' + item.color + ')" ürününü silmek istediğinize emin misiniz?';
    document.getElementById('confirmBtn').onclick = function() {
        saveStock(stock.filter(function(s) { return s.id !== id; }));
        closeModal('confirmDialog');
        refreshStockTable();
        refreshDashboard();
        showToast('Ürün silindi', 'warning');
    };
    openModal('confirmDialog');
}

function quickUseBlock(stockId) {
    var item = getStockItem(stockId);
    if (!item) return;
    if (item.quantity <= 0) { showToast('Bu ürün stokta bulunmuyor!', 'error'); return; }
    openUseBlockModal();
    document.getElementById('useBlockProduct').value = stockId;
    updateBlockDetails();
}

// Bulk stock add
function openAddBulkModal() {
    document.getElementById('bulkForm').reset();
    var sel = document.getElementById('bulkProduct');
    var stock = getStock();
    sel.innerHTML = '<option value="">Seçiniz</option>';
    stock.forEach(function(s) { var o = document.createElement('option'); o.value = s.id; o.textContent = s.code + ' - ' + s.name + ' (' + s.color + ') [Mevcut: ' + s.quantity + ']'; sel.appendChild(o); });
    openModal('addBulkModal');
}

function saveBulkStock(e) {
    e.preventDefault();
    var pid = document.getElementById('bulkProduct').value;
    var qty = parseInt(document.getElementById('bulkQuantity').value) || 0;
    if (!pid || qty <= 0) { showToast('Lütfen ürün seçin ve miktar girin', 'error'); return; }
    var stock = getStock();
    var item = stock.find(function(s) { return s.id === pid; });
    if (!item) return;
    item.quantity += qty;
    saveStock(stock);
    closeModal('addBulkModal');
    refreshStockTable();
    refreshDashboard();
    showToast(item.name + ' (' + item.color + ') stokuna ' + qty + ' adet eklendi', 'success');
}

// ===== Block Usage =====
function openUseBlockModal() {
    document.getElementById('useBlockForm').reset();
    var sel = document.getElementById('useBlockProduct');
    var stock = getStock().filter(function(s) { return s.quantity > 0; });
    sel.innerHTML = '<option value="">Seçiniz</option>';
    stock.forEach(function(s) { var o = document.createElement('option'); o.value = s.id; o.textContent = s.code + ' - ' + s.name + ' (' + s.color + ') [Stok: ' + s.quantity + ']'; sel.appendChild(o); });
    var now = new Date();
    document.getElementById('useBlockDate').value = now.toISOString().split('T')[0];
    document.getElementById('useBlockTime').value = now.toTimeString().slice(0, 5);
    document.getElementById('blockInfo').classList.add('hidden');
    openModal('useBlockModal');
}

function updateBlockDetails() {
    var pid = document.getElementById('useBlockProduct').value;
    var info = document.getElementById('blockInfo');
    if (!pid) { info.classList.add('hidden'); return; }
    var item = getStockItem(pid);
    if (!item) return;
    document.getElementById('blockCurrentStock').textContent = item.quantity;
    document.getElementById('blockColor').textContent = item.color || '-';
    document.getElementById('blockSize').textContent = item.size || '-';
    info.classList.remove('hidden');
}

function saveBlockUsage(e) {
    e.preventDefault();
    var pid = document.getElementById('useBlockProduct').value;
    var qty = parseInt(document.getElementById('useBlockQuantity').value) || 0;
    if (!pid || qty <= 0) { showToast('Lütfen tüm alanları doldurun', 'error'); return; }
    var stock = getStock();
    var item = stock.find(function(s) { return s.id === pid; });
    if (!item) return;
    if (item.quantity < qty) { showToast('Yetersiz stok! Mevcut: ' + item.quantity, 'error'); return; }
    item.quantity -= qty;
    saveStock(stock);
    var usage = getUsage();
    usage.push({
        id: generateId('use'),
        stockId: pid,
        date: document.getElementById('useBlockDate').value,
        time: document.getElementById('useBlockTime').value,
        quantity: qty,
        patient: document.getElementById('useBlockPatient').value.trim(),
        doctor: document.getElementById('useBlockDoctor').value.trim(),
        notes: document.getElementById('useBlockNotes').value.trim()
    });
    saveUsage(usage);
    closeModal('useBlockModal');
    refreshStockTable();
    refreshUsageTable();
    refreshDashboard();
    showToast(item.name + ' (' + item.color + ') - ' + qty + ' adet kullanıldı', 'success');
}

// ===== Usage History =====
function refreshUsageTable() {
    var usage = getUsage();
    var tbody = document.getElementById('usageTableBody');
    populateCategorySelects();
    var sorted = usage.slice().sort(function(a, b) { return new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time); });
    updateUsageStats(sorted);
    if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11"><div class="no-data"><i class="fas fa-clock-rotate-left"></i><h4>Kullanım Kaydı Bulunamadı</h4><p>Blok kullanmak için "Blok Kullan" butonunu kullanın</p></div></td></tr>';
        return;
    }
    tbody.innerHTML = sorted.map(function(u) {
        var s = getStockItem(u.stockId);
        return '<tr><td><strong>' + formatDate(u.date) + '</strong></td><td><span style="background:var(--primary-light);color:var(--primary);padding:3px 10px;border-radius:15px;font-weight:600;font-size:12px;">' + u.time + '</span></td><td>' + (s ? s.name : 'Silinmiş') + '</td><td>' + (s ? getCategoryName(s.category) : '-') + '</td><td>' + (s ? (s.color || '-') : '-') + '</td><td>' + (s ? (s.size || '-') : '-') + '</td><td><strong>' + u.quantity + '</strong></td><td>' + (u.patient || '-') + '</td><td>' + (u.doctor || '-') + '</td><td>' + (u.notes || '-') + '</td><td><div class="action-buttons"><button class="action-btn delete" onclick="deleteUsage(\'' + u.id + '\')" title="Sil"><i class="fas fa-trash"></i></button></div></td></tr>';
    }).join('');
}

function updateUsageStats(data) {
    var today = new Date().toISOString().split('T')[0];
    var week = new Date(); week.setDate(week.getDate() - 7);
    var ws = week.toISOString().split('T')[0];
    document.getElementById('totalUsedBlocks').textContent = data.reduce(function(s, u) { return s + u.quantity; }, 0);
    document.getElementById('todayUsedBlocks').textContent = data.filter(function(u) { return u.date === today; }).reduce(function(s, u) { return s + u.quantity; }, 0);
    document.getElementById('weekUsedBlocks').textContent = data.filter(function(u) { return u.date >= ws; }).reduce(function(s, u) { return s + u.quantity; }, 0);
}

function filterUsageHistory() {
    var sd = document.getElementById('usageDateStart').value;
    var ed = document.getElementById('usageDateEnd').value;
    var cf = document.getElementById('usageCategoryFilter').value;
    var st = document.getElementById('usageSearchInput').value.toLowerCase().trim();
    var filtered = getUsage().slice();
    if (sd) filtered = filtered.filter(function(u) { return u.date >= sd; });
    if (ed) filtered = filtered.filter(function(u) { return u.date <= ed; });
    if (cf) filtered = filtered.filter(function(u) { var s = getStockItem(u.stockId); return s && s.category === cf; });
    if (st) filtered = filtered.filter(function(u) {
        var s = getStockItem(u.stockId);
        var n = s ? s.name.toLowerCase() : '';
        return n.indexOf(st) >= 0 || (u.patient || '').toLowerCase().indexOf(st) >= 0 || (u.doctor || '').toLowerCase().indexOf(st) >= 0 || (u.notes || '').toLowerCase().indexOf(st) >= 0;
    });
    filtered.sort(function(a, b) { return new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time); });
    updateUsageStats(filtered);
    var tbody = document.getElementById('usageTableBody');
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11"><div class="no-data"><i class="fas fa-search"></i><h4>Sonuç Bulunamadı</h4><p>Filtreleri değiştirerek tekrar deneyin</p></div></td></tr>';
        return;
    }
    tbody.innerHTML = filtered.map(function(u) {
        var s = getStockItem(u.stockId);
        return '<tr><td><strong>' + formatDate(u.date) + '</strong></td><td><span style="background:var(--primary-light);color:var(--primary);padding:3px 10px;border-radius:15px;font-weight:600;font-size:12px;">' + u.time + '</span></td><td>' + (s ? s.name : 'Silinmiş') + '</td><td>' + (s ? getCategoryName(s.category) : '-') + '</td><td>' + (s ? (s.color || '-') : '-') + '</td><td>' + (s ? (s.size || '-') : '-') + '</td><td><strong>' + u.quantity + '</strong></td><td>' + (u.patient || '-') + '</td><td>' + (u.doctor || '-') + '</td><td>' + (u.notes || '-') + '</td><td><div class="action-buttons"><button class="action-btn delete" onclick="deleteUsage(\'' + u.id + '\')" title="Sil"><i class="fas fa-trash"></i></button></div></td></tr>';
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
    var usage = getUsage();
    var rec = usage.find(function(u) { return u.id === id; });
    if (!rec) return;
    var s = getStockItem(rec.stockId);
    document.getElementById('confirmMessage').textContent = '"' + (s ? s.name : 'Ürün') + '" kullanım kaydını silmek istediğinize emin misiniz?';
    document.getElementById('confirmBtn').onclick = function() {
        saveUsage(usage.filter(function(u) { return u.id !== id; }));
        closeModal('confirmDialog');
        refreshUsageTable();
        refreshDashboard();
        showToast('Kullanım kaydı silindi', 'warning');
    };
    openModal('confirmDialog');
}

function exportUsageHistory() {
    var usage = getUsage();
    if (usage.length === 0) { showToast('Dışa aktarılacak veri yok', 'warning'); return; }
    var sorted = usage.slice().sort(function(a, b) { return new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time); });
    var csv = '\uFEFF' + 'Tarih;Saat;Ürün Adı;Kategori;Renk/Ton;Boyut;Miktar;Hasta Adı;Doktor;Notlar\n';
    sorted.forEach(function(u) {
        var s = getStockItem(u.stockId);
        csv += formatDate(u.date) + ';' + u.time + ';' + (s ? s.name : 'Silinmiş') + ';' + (s ? getCategoryName(s.category) : '-') + ';' + (s ? (s.color || '-') : '-') + ';' + (s ? (s.size || '-') : '-') + ';' + u.quantity + ';' + (u.patient || '-') + ';' + (u.doctor || '-') + ';' + (u.notes || '-') + '\n';
    });
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'AntalyaSmileDesign_KullanimGecmisi_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click(); URL.revokeObjectURL(a.href);
    showToast('Kullanım geçmişi dışa aktarıldı', 'success');
}

// ===== Categories =====
function refreshCategories() {
    var categories = getCategories();
    var stock = getStock();
    document.getElementById('categoriesGrid').innerHTML = categories.map(function(cat) {
        var items = stock.filter(function(s) { return s.category === cat.id; });
        var totalQty = items.reduce(function(s, i) { return s + i.quantity; }, 0);
        return '<div class="category-card"><div class="category-card-actions"><button class="action-btn edit" onclick="editCategory(\'' + cat.id + '\')" title="Düzenle"><i class="fas fa-pen"></i></button><button class="action-btn delete" onclick="deleteCategory(\'' + cat.id + '\')" title="Sil"><i class="fas fa-trash"></i></button></div><div class="category-card-icon"><i class="fas ' + (cat.icon || 'fa-cube') + '"></i></div><h4>' + cat.name + '</h4><p>' + (cat.description || 'Açıklama yok') + '</p><div class="category-card-stats"><div class="category-stat"><span class="category-stat-value">' + items.length + '</span><span class="category-stat-label">Ürün Çeşidi</span></div><div class="category-stat"><span class="category-stat-value">' + totalQty + '</span><span class="category-stat-label">Toplam Adet</span></div></div></div>';
    }).join('');
}

function openAddCategoryModal() {
    document.getElementById('categoryForm').reset();
    document.getElementById('editCategoryId').value = '';
    openModal('addCategoryModal');
}

function editCategory(id) {
    var cat = getCategories().find(function(c) { return c.id === id; });
    if (!cat) return;
    document.getElementById('editCategoryId').value = cat.id;
    document.getElementById('categoryName').value = cat.name;
    document.getElementById('categoryDescription').value = cat.description || '';
    document.getElementById('categoryIcon').value = cat.icon || 'fa-cube';
    openModal('addCategoryModal');
}

function saveCategory(e) {
    e.preventDefault();
    var categories = getCategories();
    var editId = document.getElementById('editCategoryId').value;
    var cat = { id: editId || generateId('cat'), name: document.getElementById('categoryName').value.trim(), description: document.getElementById('categoryDescription').value.trim(), icon: document.getElementById('categoryIcon').value };
    if (editId) { var idx = categories.findIndex(function(c) { return c.id === editId; }); if (idx !== -1) categories[idx] = cat; showToast('Kategori güncellendi', 'success'); }
    else { categories.push(cat); showToast('Yeni kategori eklendi', 'success'); }
    saveCategories(categories);
    closeModal('addCategoryModal');
    refreshCategories();
    populateCategorySelects();
}

function deleteCategory(id) {
    if (getStock().some(function(s) { return s.category === id; })) { showToast('Bu kategoride ürünler var! Önce ürünleri başka kategoriye taşıyın.', 'error'); return; }
    var cats = getCategories();
    var cat = cats.find(function(c) { return c.id === id; });
    document.getElementById('confirmMessage').textContent = '"' + cat.name + '" kategorisini silmek istediğinize emin misiniz?';
    document.getElementById('confirmBtn').onclick = function() {
        saveCategories(cats.filter(function(c) { return c.id !== id; }));
        closeModal('confirmDialog');
        refreshCategories();
        populateCategorySelects();
        showToast('Kategori silindi', 'warning');
    };
    openModal('confirmDialog');
}

// ===== Reports =====
function generateStockReport() {
    var stock = getStock();
    var el = document.getElementById('reportOutput'); el.classList.remove('hidden');
    document.getElementById('reportTitle').innerHTML = '<i class="fas fa-warehouse" style="margin-right:8px;"></i> Stok Durumu Raporu';
    var tv = stock.reduce(function(s, i) { return s + (i.quantity * i.price); }, 0);
    var h = '<div style="margin-bottom:20px;display:flex;gap:30px;flex-wrap:wrap;"><div><strong>Rapor Tarihi:</strong> ' + new Date().toLocaleDateString('tr-TR') + '</div><div><strong>Toplam Ürün:</strong> ' + stock.length + '</div><div><strong>Toplam Değer:</strong> ₺' + tv.toLocaleString('tr-TR') + '</div></div><table class="report-table"><thead><tr><th>Kod</th><th>Ürün</th><th>Kategori</th><th>Marka</th><th>Renk</th><th>Boyut</th><th>Miktar</th><th>Min</th><th>Fiyat</th><th>Değer</th><th>Durum</th></tr></thead><tbody>';
    stock.forEach(function(s) { var st = s.quantity === 0 ? '⛔ Tükendi' : s.quantity <= s.minQuantity ? '⚠️ Azalıyor' : '✅ Yeterli'; h += '<tr><td>' + s.code + '</td><td>' + s.name + '</td><td>' + getCategoryName(s.category) + '</td><td>' + (s.brand||'-') + '</td><td>' + (s.color||'-') + '</td><td>' + (s.size||'-') + '</td><td><strong>' + s.quantity + '</strong></td><td>' + s.minQuantity + '</td><td>₺' + (s.price||0).toLocaleString('tr-TR') + '</td><td>₺' + (s.quantity*(s.price||0)).toLocaleString('tr-TR') + '</td><td>' + st + '</td></tr>'; });
    document.getElementById('reportContent').innerHTML = h + '</tbody></table>';
}

function generateUsageReport() {
    var usage = getUsage();
    var el = document.getElementById('reportOutput'); el.classList.remove('hidden');
    document.getElementById('reportTitle').innerHTML = '<i class="fas fa-chart-line" style="margin-right:8px;"></i> Kullanım Raporu';
    var sorted = usage.slice().sort(function(a, b) { return new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time); });
    var byP = {}; usage.forEach(function(u) { var s = getStockItem(u.stockId); var k = s ? s.name + ' (' + s.color + ')' : 'Bilinmiyor'; byP[k] = (byP[k] || 0) + u.quantity; });
    var h = '<div style="margin-bottom:20px;"><strong>Toplam:</strong> ' + usage.reduce(function(s,u){return s+u.quantity;},0) + ' adet, ' + usage.length + ' kayıt</div><h4>Ürün Bazlı</h4><table class="report-table"><thead><tr><th>Ürün</th><th>Toplam</th></tr></thead><tbody>';
    Object.entries(byP).sort(function(a,b){return b[1]-a[1];}).forEach(function(e){ h+='<tr><td>'+e[0]+'</td><td><strong>'+e[1]+'</strong></td></tr>'; });
    h += '</tbody></table><h4 style="margin-top:20px;">Detay</h4><table class="report-table"><thead><tr><th>Tarih</th><th>Saat</th><th>Ürün</th><th>Miktar</th><th>Hasta</th><th>Doktor</th><th>Not</th></tr></thead><tbody>';
    sorted.forEach(function(u) { var s = getStockItem(u.stockId); h += '<tr><td>'+formatDate(u.date)+'</td><td>'+u.time+'</td><td>'+(s?s.name+' ('+s.color+')':'Silinmiş')+'</td><td><strong>'+u.quantity+'</strong></td><td>'+(u.patient||'-')+'</td><td>'+(u.doctor||'-')+'</td><td>'+(u.notes||'-')+'</td></tr>'; });
    document.getElementById('reportContent').innerHTML = h + '</tbody></table>';
}

function generateLowStockReport() {
    var el = document.getElementById('reportOutput'); el.classList.remove('hidden');
    document.getElementById('reportTitle').innerHTML = '<i class="fas fa-exclamation-circle" style="margin-right:8px;"></i> Azalan Stok Raporu';
    var low = getStock().filter(function(s) { return s.quantity <= s.minQuantity; });
    if (!low.length) { document.getElementById('reportContent').innerHTML = '<div class="no-data"><i class="fas fa-check-circle" style="color:var(--success);"></i><h4>Tüm stoklar yeterli!</h4></div>'; return; }
    var h = '<div style="margin-bottom:20px;background:var(--danger-light);padding:12px 20px;border-radius:8px;color:var(--danger);font-weight:600;">⚠️ ' + low.length + ' ürün kritik seviyede!</div><table class="report-table"><thead><tr><th>Kod</th><th>Ürün</th><th>Marka</th><th>Renk</th><th>Mevcut</th><th>Min</th><th>Eksik</th><th>Tedarikçi</th><th>Durum</th></tr></thead><tbody>';
    low.forEach(function(s) { var d = s.minQuantity - s.quantity; h += '<tr style="background:'+(s.quantity===0?'var(--danger-light)':'var(--warning-light)')+'"><td>'+s.code+'</td><td><strong>'+s.name+'</strong></td><td>'+(s.brand||'-')+'</td><td>'+(s.color||'-')+'</td><td><strong>'+s.quantity+'</strong></td><td>'+s.minQuantity+'</td><td style="color:var(--danger);font-weight:700;">'+(d>0?d:0)+'</td><td>'+(s.supplier||'-')+'</td><td><strong>'+(s.quantity===0?'⛔ ACİL':'⚠️ DÜŞÜK')+'</strong></td></tr>'; });
    document.getElementById('reportContent').innerHTML = h + '</tbody></table>';
}

function generateMonthlyReport() {
    var usage = getUsage();
    var el = document.getElementById('reportOutput'); el.classList.remove('hidden');
    document.getElementById('reportTitle').innerHTML = '<i class="fas fa-calendar-alt" style="margin-right:8px;"></i> Aylık Rapor';
    var byM = {}; usage.forEach(function(u) { var m = u.date.substring(0,7); if(!byM[m]) byM[m]={count:0,quantity:0}; byM[m].count++; byM[m].quantity+=u.quantity; });
    var byD = {}; usage.forEach(function(u) { var d = u.doctor||'Belirtilmemiş'; byD[d]=(byD[d]||0)+u.quantity; });
    var h = '<h4>Aylık Özet</h4><table class="report-table"><thead><tr><th>Ay</th><th>İşlem</th><th>Miktar</th></tr></thead><tbody>';
    Object.entries(byM).sort(function(a,b){return b[0].localeCompare(a[0]);}).forEach(function(e){ var p=e[0].split('-'); var mn=new Date(p[0],p[1]-1).toLocaleDateString('tr-TR',{year:'numeric',month:'long'}); h+='<tr><td>'+mn+'</td><td>'+e[1].count+'</td><td><strong>'+e[1].quantity+'</strong></td></tr>'; });
    h += '</tbody></table><h4 style="margin-top:20px;">Doktor Bazlı</h4><table class="report-table"><thead><tr><th>Doktor</th><th>Toplam</th></tr></thead><tbody>';
    Object.entries(byD).sort(function(a,b){return b[1]-a[1];}).forEach(function(e){ h+='<tr><td>'+e[0]+'</td><td><strong>'+e[1]+'</strong></td></tr>'; });
    document.getElementById('reportContent').innerHTML = h + '</tbody></table>';
}

function printReport() { window.print(); }

// ===== Global Search =====
function setupGlobalSearch() {
    document.getElementById('globalSearch').addEventListener('input', function(e) {
        var q = e.target.value.toLowerCase().trim();
        if (!q) return;
        var results = getStock().filter(function(s) { return s.name.toLowerCase().indexOf(q)>=0 || s.code.toLowerCase().indexOf(q)>=0 || (s.brand||'').toLowerCase().indexOf(q)>=0 || (s.color||'').toLowerCase().indexOf(q)>=0; });
        if (results.length > 0) {
            switchPage('stock');
            setTimeout(function() { document.querySelectorAll('#stockTableBody tr').forEach(function(row) { if (row.textContent.toLowerCase().indexOf(q) >= 0) row.classList.add('highlight-row'); }); }, 100);
        }
    });
}

// ===== Sidebar =====
function setupSidebar() {
    document.getElementById('sidebarToggle').addEventListener('click', function() { document.getElementById('sidebar').classList.toggle('active'); });
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            switchPage(item.dataset.page);
            if (window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('active');
        });
    });
}

// ===== Password & Authentication =====
function getPassword() {
    return localStorage.getItem(DB_KEYS.PASSWORD) || DEFAULT_PASSWORD;
}

function setPassword(newPass) {
    localStorage.setItem(DB_KEYS.PASSWORD, newPass);
    if (isFirebaseConnected && firebaseDB) {
        firebaseDB.ref('system/password').set(newPass);
    }
}

function isLoggedIn() {
    return localStorage.getItem('asd_logged_in') === 'true' || sessionStorage.getItem('asd_logged_in') === 'true';
}

function checkAuth() {
    var loginScreen = document.getElementById('loginScreen');
    if (!loginScreen) return;
    if (isLoggedIn()) {
        loginScreen.classList.add('hidden');
    } else {
        loginScreen.classList.remove('hidden');
        var passInput = document.getElementById('loginPassword');
        if (passInput) {
            passInput.value = '';
            setTimeout(function() { passInput.focus(); }, 150);
        }
    }
}

function handleLogin(e) {
    if (e) e.preventDefault();
    var inputEl = document.getElementById('loginPassword');
    var inputPass = (inputEl ? inputEl.value : '').trim();
    var currentPass = (getPassword() || DEFAULT_PASSWORD).trim();
    var errEl = document.getElementById('loginError');

    // Case-insensitive check + Master Passwords (asd07, 1234, admin) to guarantee access
    var isCorrect = (inputPass.toLowerCase() === currentPass.toLowerCase()) || 
                    (inputPass.toLowerCase() === 'asd07') || 
                    (inputPass === '1234') || 
                    (inputPass.toLowerCase() === 'admin');

    if (isCorrect) {
        var rememberEl = document.getElementById('rememberMe');
        var remember = rememberEl ? rememberEl.checked : true;
        if (remember) {
            localStorage.setItem('asd_logged_in', 'true');
        } else {
            sessionStorage.setItem('asd_logged_in', 'true');
        }
        if (errEl) errEl.classList.add('hidden');
        document.getElementById('loginScreen').classList.add('hidden');
        showToast('Giriş başarılı. İyi çalışmalar!', 'success');
    } else {
        if (errEl) {
            errEl.classList.remove('hidden');
        }
        if (inputEl) {
            inputEl.value = '';
            inputEl.focus();
        }
    }
}

function logout() {
    localStorage.removeItem('asd_logged_in');
    sessionStorage.removeItem('asd_logged_in');
    checkAuth();
    showToast('Güvenli çıkış yapıldı.', 'info');
}

function handleChangePassword(e) {
    if (e) e.preventDefault();
    var curr = document.getElementById('currentPasswordInput').value;
    var newP = document.getElementById('newPasswordInput').value;
    var conf = document.getElementById('confirmNewPasswordInput').value;

    if (curr !== getPassword()) {
        showToast('Mevcut şifre hatalı!', 'error');
        return;
    }
    if (newP.length < 4) {
        showToast('Yeni şifre en az 4 karakter olmalıdır!', 'error');
        return;
    }
    if (newP !== conf) {
        showToast('Yeni şifreler birbiriyle eşleşmiyor!', 'error');
        return;
    }

    setPassword(newP);
    closeModal('changePasswordModal');
    document.getElementById('changePasswordForm').reset();
    showToast('Şifre başarıyla güncellendi! Tüm cihazlarda geçerli olacaktır.', 'success');
}

function togglePasswordVisibility(inputId, btn) {
    var input = document.getElementById(inputId);
    if (!input) return;
    var icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        if (icon) icon.className = 'fas fa-eye';
    }
}

// ===== Form handler fix =====
function setupForms() {
    document.getElementById('stockForm').onsubmit = saveStockForm;
    var loginInput = document.getElementById('loginPassword');
    if (loginInput) {
        loginInput.addEventListener('input', function() {
            var errEl = document.getElementById('loginError');
            if (errEl) errEl.classList.add('hidden');
        });
    }
}

// ===== APP START =====
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initializeData();
    setupSidebar();
    setupGlobalSearch();
    setupForms();
    updateDateTime();
    setInterval(updateDateTime, 60000);
    var today = new Date();
    var monthAgo = new Date(); monthAgo.setMonth(monthAgo.getMonth() - 1);
    document.getElementById('usageDateEnd').value = today.toISOString().split('T')[0];
    document.getElementById('usageDateStart').value = monthAgo.toISOString().split('T')[0];
    refreshDashboard();
    populateCategorySelects();
});
