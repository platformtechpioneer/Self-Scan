// بيانات التطبيق
const productsData = {
    "المواد الغذائية الأساسية": [
        { name: "رز مصري", price: 35, unit: "الكيلو" },
        { name: "مكرونة قلم", price: 18, unit: "الكيس" },
        { name: "سكر أبيض", price: 32, unit: "الكيلو" },
        { name: "زيت ذرة", price: 80, unit: "اللتر" },
        { name: "دقيق فاخر", price: 25, unit: "الكيلو" },
        { name: "شاي العروسة", price: 52, unit: "العلبة" },
        { name: "قهوة نسكافيه كلاسيك", price: 65, unit: "البرطمان الصغير" },
        { name: "ملح", price: 6, unit: "الكيس" },
        { name: "فول مدمس", price: 28, unit: "الكيلو" },
        { name: "عدس أصفر", price: 40, unit: "الكيلو" }
    ],
    "الألبان والأجبان": [
        { name: "لبن جهينة كامل الدسم", price: 35, unit: "اللتر" },
        { name: "جبنة بيضا (قريش)", price: 75, unit: "الكيلو" },
        { name: "جبنة رومي قديمة", price: 190, unit: "الكيلو" },
        { name: "زبادي جهينة", price: 12, unit: "العلبة" },
        { name: "جبنة مثلثات (لافاش كيري)", price: 45, unit: "العلبة" },
        { name: "جبنة شيدر", price: 160, unit: "الكيلو" },
        { name: "لبنة", price: 55, unit: "العلبة" },
        { name: "قشطة بلدي", price: 70, unit: "النصف كيلو" },
        { name: "زبدة لورباك", price: 120, unit: "العبوة الصغيرة" },
        { name: "حليب بودرة نيدو", price: 95, unit: "العلبة الصغيرة" }
    ],
    "اللحوم والدواجن والمجمدات": [
        { name: "لحمة بلدي", price: 410, unit: "الكيلو" },
        { name: "فراخ كاملة", price: 95, unit: "الكيلو" },
        { name: "كفتة جاهزة", price: 130, unit: "الكيلو" },
        { name: "برجر فراخ", price: 85, unit: "الكيلو" },
        { name: "سجق شرقي", price: 150, unit: "الكيلo" },
        { name: "بانيه جاهز", price: 125, unit: "الكيلو" },
        { name: "سمك فيليه", price: 190, unit: "الكيلو" },
        { name: "جمبري مجمد", price: 320, unit: "الكيلو" },
        { name: "بطاطس محمرة مجمدة", price: 45, unit: "الكيس" },
        { name: "ملوخية مجمدة", price: 25, unit: "الكيس" }
    ],
    "الأدوات المدرسية": [
        { name: "قلم جاف", price: 5, unit: "القطعة" },
        { name: "مقلمة", price: 35, unit: "" },
        { name: "حقيبة مدرسية", price: 250, unit: "" },
        { name: "كراسة", price: 10, unit: "" },
        { name: "مسطرة", price: 7, unit: "" },
        { name: "براية", price: 8, unit: "" },
        { name: "ممحاة", price: 3, unit: "" },
        { name: "علبة ألوان", price: 60, unit: "" },
        { name: "مقص", price: 15, unit: "" },
        { name: "غراء", price: 12, unit: "" }
    ],
    "الأدوات المنزلية": [
        { name: "أطباق بلاستيك", price: 25, unit: "الطقم" },
        { name: "كوبايات زجاج", price: 120, unit: "الطقم" },
        { name: "طقم معالق وشوك", price: 150, unit: "الطقم" },
        { name: "سكينة مطبخ", price: 60, unit: "" },
        { name: "طقم حِلل", price: 850, unit: "" },
        { name: "مكنسة", price: 120, unit: "" },
        { name: "مقشة", price: 45, unit: "" },
        { name: "جردل", price: 60, unit: "" },
        { name: "مفارش ترابيزة", price: 90, unit: "" },
        { name: "لمبة موفرة للطاقة", price: 55, unit: "" }
    ]
};

// حالة التطبيق
let currentUser = null;
let currentBranch = null;
let currentDepartment = null;
let verificationCode = null;
let signupData = null;

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkDarkModePreference();
    checkLanguagePreference();
    loadTransactions();
});

// تهيئة التطبيق
function initializeApp() {
    // التحقق من وجود مستخدم مسجل الدخول
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showScreen('appScreen');
        updateAccountInfo();
    } else {
        showScreen('loginScreen');
    }
}

// إعداد المستمعين للأحداث
function setupEventListeners() {
    // تسجيل الدخول
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // إنشاء حساب
    document.getElementById('signupForm1').addEventListener('submit', handleSignupStep1);
    document.getElementById('verifySignupCode').addEventListener('click', verifySignupCode);
    document.getElementById('createAccountBtn').addEventListener('click', createAccount);
    
    // استعادة كلمة المرور
    document.getElementById('forgotPasswordLink').addEventListener('click', showForgotPassword);
    document.getElementById('sendCodeBtn').addEventListener('click', sendVerificationCode);
    document.getElementById('verifyCodeBtn').addEventListener('click', verifyCode);
    document.getElementById('resetPasswordBtn').addEventListener('click', resetPassword);
    
    // التنقل بين الشاشات
    document.getElementById('showSignup').addEventListener('click', () => showScreen('signupScreen'));
    document.getElementById('backToLoginFromSignup').addEventListener('click', () => showScreen('loginScreen'));
    document.getElementById('backToLoginFromForgot').addEventListener('click', () => showScreen('loginScreen'));
    
    // التبويبات الرئيسية
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // القائمة المنسدلة للإعدادات
    document.getElementById('settingsBtn').addEventListener('click', toggleSettingsDropdown);
    document.getElementById('accountLink').addEventListener('click', showAccountScreen);
    document.getElementById('settingsLink').addEventListener('click', showSettingsScreen);
    document.getElementById('logoutLink').addEventListener('click', handleLogout);
    
    // الفروع
    document.querySelectorAll('.branch-card').forEach(branch => {
        branch.addEventListener('click', function() {
            currentBranch = this.getAttribute('data-branch');
            document.getElementById('branchName').textContent = currentBranch;
            showScreen('departmentsScreen');
        });
    });
    
    // الأقسام
    document.querySelectorAll('.department-card').forEach(dept => {
        dept.addEventListener('click', function() {
            currentDepartment = this.getAttribute('data-department');
            document.getElementById('departmentName').textContent = currentDepartment;
            showProducts(currentDepartment);
            showScreen('productsScreen');
        });
    });
    
    // أزرار العودة
    document.getElementById('backToBranches').addEventListener('click', () => {
        showScreen('appScreen');
        switchTab('branches');
    });
    document.getElementById('backToDepartments').addEventListener('click', () => showScreen('departmentsScreen'));
    document.getElementById('backToAppFromAccount').addEventListener('click', () => showScreen('appScreen'));
    document.getElementById('backToAppFromSettings').addEventListener('click', () => showScreen('appScreen'));
    
    // الدفع
    document.getElementById('payNowBtn').addEventListener('click', processPayment);
    document.getElementById('closePaymentSuccess').addEventListener('click', () => {
        document.getElementById('paymentSuccess').style.display = 'none';
    });
    
    // الإعدادات
    document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
    document.getElementById('languageSelect').addEventListener('change', changeLanguage);
    
    // إغلاق القائمة المنسدلة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.icon-btn') && !event.target.closest('.dropdown-menu')) {
            document.getElementById('settingsDropdown').style.display = 'none';
        }
    });
}

// إظهار شاشة معينة
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    document.getElementById(screenId).classList.add('active');
}

// تسجيل الدخول
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const emoji = document.getElementById('loginEmoji');
    
    // في تطبيق حقيقي، هنا سيتم التحقق من الخادم
    // للمثال، سنتحقق من التخزين المحلي
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // تأثير الإيموجي السعيد
        emoji.textContent = '😊';
        emoji.classList.remove('emoji-sad');
        emoji.classList.add('emoji-happy');
        
        setTimeout(() => {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            showScreen('appScreen');
            updateAccountInfo();
        }, 800);
    } else {
        // تأثير الإيموجي الحزين
        emoji.textContent = '😢';
        emoji.classList.remove('emoji-happy');
        emoji.classList.add('emoji-sad');
        
        setTimeout(() => {
            emoji.textContent = '😊';
            emoji.classList.remove('emoji-sad');
        }, 1500);
        
        alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
}

// إنشاء حساب - الخطوة الأولى
function handleSignupStep1(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // التحقق من عدم وجود مستخدم بنفس البريد الإلكتروني
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        alert('هذا البريد الإلكتروني مسجل بالفعل');
        return;
    }
    
    // حفظ بيانات التسجيل مؤقتاً
    signupData = { name, username, email, password };
    
    // إرسال رمز التحقق
    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // تخزين الرمز مؤقتاً
    localStorage.setItem('signupVerificationCode', verificationCode);
    localStorage.setItem('signupVerificationEmail', email);
    
    alert(`تم إرسال رمز التحقق إلى بريدك الإلكتروني. الرمز: ${verificationCode} (هذا للاختبار فقط)`);
    
    document.getElementById('signupStep1').style.display = 'none';
    document.getElementById('signupStep2').style.display = 'block';
}

// التحقق من رمز إنشاء الحساب
function verifySignupCode() {
    const enteredCode = document.getElementById('signupVerificationCode').value;
    const savedCode = localStorage.getItem('signupVerificationCode');
    
    if (enteredCode === savedCode) {
        document.getElementById('signupStep2').style.display = 'none';
        document.getElementById('signupStep3').style.display = 'block';
    } else {
        alert('رمز التحقق غير صحيح');
    }
}

// إنشاء الحساب بعد التحقق
function createAccount() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(signupData);
    localStorage.setItem('users', JSON.stringify(users));
    
    // تنظيف البيانات المؤقتة
    localStorage.removeItem('signupVerificationCode');
    localStorage.removeItem('signupVerificationEmail');
    signupData = null;
    
    alert('تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.');
    showScreen('loginScreen');
}

// إظهار شاشة استعادة كلمة المرور
function showForgotPassword(e) {
    e.preventDefault();
    showScreen('forgotPasswordScreen');
    document.getElementById('forgotStep1').style.display = 'block';
    document.getElementById('forgotStep2').style.display = 'none';
    document.getElementById('forgotStep3').style.display = 'none';
}

// إرسال رمز التحقق
function sendVerificationCode() {
    const email = document.getElementById('forgotEmail').value;
    
    if (!email) {
        alert('يرجى إدخال البريد الإلكتروني');
        return;
    }
    
    // في تطبيق حقيقي، هنا سيتم إرسال الرمز إلى البريد الإلكتروني
    // للمثال، سننشئ رمزاً عشوائياً
    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // تخزين الرمز مؤقتاً (في تطبيق حقيقي، سيتم تخزينه في قاعدة البيانات)
    localStorage.setItem('tempVerificationCode', verificationCode);
    localStorage.setItem('tempVerificationEmail', email);
    
    alert(`تم إرسال رمز التحقق إلى بريدك الإلكتروني. الرمز: ${verificationCode} (هذا للاختبار فقط)`);
    
    document.getElementById('forgotStep1').style.display = 'none';
    document.getElementById('forgotStep2').style.display = 'block';
}

// التحقق من الرمز
function verifyCode() {
    const enteredCode = document.getElementById('verificationCode').value;
    const savedCode = localStorage.getItem('tempVerificationCode');
    
    if (enteredCode === savedCode) {
        document.getElementById('forgotStep2').style.display = 'none';
        document.getElementById('forgotStep3').style.display = 'block';
    } else {
        alert('رمز التحقق غير صحيح');
    }
}

// إعادة تعيين كلمة المرور
function resetPassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('كلمتا المرور غير متطابقتين');
        return;
    }
    
    const email = localStorage.getItem('tempVerificationEmail');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        // تنظيف البيانات المؤقتة
        localStorage.removeItem('tempVerificationCode');
        localStorage.removeItem('tempVerificationEmail');
        
        alert('تم تغيير كلمة المرور بنجاح');
        showScreen('loginScreen');
    } else {
        alert('لم يتم العثور على مستخدم بهذا البريد الإلكتروني');
    }
}

// تبديل التبويبات
function switchTab(tabName) {
    // إزالة النشاط من جميع التبويبات
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // إضافة النشاط للتبويب المحدد
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// تبديل القائمة المنسدلة للإعدادات
function toggleSettingsDropdown() {
    const dropdown = document.getElementById('settingsDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// إظهار شاشة الحساب
function showAccountScreen(e) {
    e.preventDefault();
    document.getElementById('settingsDropdown').style.display = 'none';
    showScreen('accountScreen');
    updateAccountInfo();
}

// إظهار شاشة الإعدادات
function showSettingsScreen(e) {
    e.preventDefault();
    document.getElementById('settingsDropdown').style.display = 'none';
    showScreen('settingsScreen');
}

// تسجيل الخروج
function handleLogout(e) {
    e.preventDefault();
    document.getElementById('settingsDropdown').style.display = 'none';
    currentUser = null;
    localStorage.removeItem('currentUser');
    showScreen('loginScreen');
}

// تحديث معلومات الحساب
function updateAccountInfo() {
    if (currentUser) {
        document.getElementById('accountName').textContent = currentUser.name;
        document.getElementById('accountUsername').textContent = currentUser.username;
        document.getElementById('accountEmail').textContent = currentUser.email;
    }
}

// إظهار المنتجات
function showProducts(department) {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    
    if (productsData[department]) {
        productsData[department].forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>${product.unit ? '/' + product.unit : ''}</p>
                </div>
                <div class="product-price">${product.price} جنيه</div>
            `;
            productsList.appendChild(productItem);
        });
    }
}

// معالجة الدفع - المعدلة
function processPayment() {
    const paymentCode = document.getElementById('paymentCode').value;
    const paymentResult = document.getElementById('paymentResult');
    
    if (paymentCode !== 'A2025') {
        paymentResult.innerHTML = '<p style="color: #ef4444;">كود الدفع غير صحيح</p>';
        return;
    }
    
    // المنتجات الثابتة
    const selectedProducts = [
        { name: "كيلو تفاح", price: 40, unit: "الكيلو" },
        { name: "كيلو موز", price: 30, unit: "الكيلو" },
        { name: "خدمة", price: 1, unit: "الخدمة" }
    ];
    
    let total = 0;
    
    // حساب الإجمالي
    selectedProducts.forEach(product => {
        total += product.price;
    });
    
    // حفظ المعاملة
    saveTransaction(selectedProducts, total);
    
    // عرض المنتجات المختارة والمجموع
    let productsHTML = '<h3>المنتجات المختارة:</h3><ul>';
    selectedProducts.forEach(product => {
        productsHTML += `<li>${product.name} - ${product.price} جنيه ${product.unit ? '/' + product.unit : ''}</li>`;
    });
    productsHTML += `</ul><p><strong>الإجمالي: ${total} جنيه</strong></p>`;
    productsHTML += '<button id="completePayment" class="btn-primary">اكمل عملية الدفع</button>';
    
    paymentResult.innerHTML = productsHTML;
    
    // إضافة مستمع للزر الجديد
    document.getElementById('completePayment').addEventListener('click', function() {
        document.getElementById('paymentSuccess').style.display = 'flex';
        // تحديث قائمة المعاملات
        loadTransactions();
    });
}

// حفظ المعاملة
function saveTransaction(products, total) {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    const transaction = {
        id: Date.now(),
        date: new Date().toLocaleDateString('ar-EG'),
        time: new Date().toLocaleTimeString('ar-EG'),
        products: products.map(p => p.name),
        total: total
    };
    
    transactions.unshift(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// تحميل المعاملات
function loadTransactions() {
    const transactionsList = document.getElementById('transactionsList');
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    if (transactions.length === 0) {
        transactionsList.innerHTML = '<p>لا توجد معاملات سابقة</p>';
        return;
    }
    
    transactionsList.innerHTML = '';
    
    transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        transactionItem.innerHTML = `
            <div class="transaction-header">
                <span class="transaction-date">${transaction.date} - ${transaction.time}</span>
                <span class="transaction-amount">${transaction.total} جنيه</span>
            </div>
            <div class="transaction-products">${transaction.products.join('، ')}</div>
        `;
        transactionsList.appendChild(transactionItem);
    });
}

// تبديل الوضع الداكن
function toggleDarkMode() {
    const isDarkMode = document.getElementById('darkModeToggle').checked;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
}

// تغيير اللغة
function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    localStorage.setItem('language', selectedLanguage);
    
    // في تطبيق حقيقي، هنا سيتم تغيير جميع النصوص بناءً على اللغة المختارة
    alert(`تم تغيير اللغة إلى ${selectedLanguage === 'ar' ? 'العربية' : 'الإنجليزية'}`);
}

// التحقق من تفضيلات الوضع الداكن
function checkDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.getElementById('darkModeToggle').checked = darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
}

// التحقق من تفضيلات اللغة
function checkLanguagePreference() {
    const language = localStorage.getItem('language') || 'ar';
    document.getElementById('languageSelect').value = language;
}
