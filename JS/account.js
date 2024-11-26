// Проверяем, вошёл ли пользователь
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
    alert("Сначала войдите в систему!");
    window.location.href = "login.html"; // Если пользователь не вошёл, перенаправляем на страницу входа
} else {
    // Отображаем имя пользователя
    document.getElementById("username").textContent = loggedUser.username;

    // Инициализируем баланс, если его нет или если это не число
    if (typeof loggedUser.balance !== "number") {
        loggedUser.balance = 0; // Установить стартовый баланс, если его нет
    }

    // Инициализируем историю операций, если её нет или если это не массив
    if (!Array.isArray(loggedUser.transactions)) {
        loggedUser.transactions = [];
    }

    // Сохраняем изменения в localStorage
    saveUserData();

    // Отображаем баланс
    updateUserInterface();
}

function saveUserData() {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
}

// Функция для пополнения баланса
function addFunds() {
    const amount = parseFloat(prompt("Введите сумму пополнения:"));
    if (isNaN(amount) || amount <= 0) {
        alert("Введите корректную сумму!");
        return;
    }
    loggedUser.balance += amount; // Увеличиваем баланс
    logTransaction("Пополнение", amount);
    saveUserData();
    alert(`Баланс успешно пополнен на ${amount} ₽`);
    updateUserInterface();
}

// Функция для списания средств
function spendFunds() {
    const amount = parseFloat(prompt("Введите сумму списания:"));
    if (isNaN(amount) || amount <= 0) {
        alert("Введите корректную сумму!");
        return;
    }
    if (amount > loggedUser.balance) {
        alert("Недостаточно средств на балансе!");
        return;
    }
    loggedUser.balance -= amount; // Уменьшаем баланс
    logTransaction("Списание", -amount);
    saveUserData();
    alert(`Средства в размере ${amount} ₽ успешно списаны`);
    updateUserInterface();
}

// Функция для добавления записи в лог операций
function logTransaction(type, amount) {
    const date = new Date().toLocaleString(); // Получаем текущую дату и время
    const transaction = {
        type,
        amount,
        date
    };
    loggedUser.transactions.push(transaction); // Добавляем операцию в массив
}

// Функция для обновления интерфейса
function updateUserInterface() {
    document.getElementById("balance").textContent = loggedUser.balance;

    // Отображаем лог операций
    const transactionLog = document.getElementById("transaction-log");
    transactionLog.innerHTML = ""; // Очищаем предыдущий лог
    loggedUser.transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.textContent = `${transaction.date}: ${transaction.type} ${transaction.amount} ₽`;
        transactionLog.appendChild(li);
    });
}

// Функция для выхода
function logout() {
    localStorage.removeItem("loggedUser"); // Удаляем данные пользователя
    window.location.href = "login.html"; // Перенаправляем на страницу входа
}

// Функции для обработки действий пользователя
function editProfile() {
    alert("Редактирование профиля пока недоступно. Эта функция в разработке.");
}

function viewBookings() {
    alert("Ваши бронирования: Пока нет активных заказов.");
}

function logout() {
    const confirmLogout = confirm("Вы действительно хотите выйти?");
    console.log("Logout function called");
    localStorage.removeItem("loggedUser");
    if (confirmLogout) {
        window.location.href = "index.html"; // Переход на главную страницу
    }
}
