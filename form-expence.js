if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert("Please login to access this page.");
    window.location.href = "login.html";
}
function toggleMenu() {
    document.querySelector('.nav-bar ul').classList.toggle('active');
}

window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('loginLink').style.display = "none";
        document.getElementById('logoutBtn').style.display = "inline-block";
    }

    expenses.forEach(exp => {
        addRowToTable(exp.name, exp.category, exp.amount);
        total += exp.amount;
    });
    updateTotalDisplay();
};

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = "index.html";
}

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let total = 0;

function addExpense() {
    const nameInput = document.getElementById('expenseName');
    const amountInput = document.getElementById('expenseAmount');
    const categoryInput = document.getElementById('expenseCategory');

    const name = nameInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const expenseObj = { name, category, amount };
    expenses.push(expenseObj);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    addRowToTable(name, category, amount);
    total += amount;
    updateTotalDisplay();

    nameInput.value = "";
    amountInput.value = "";
}

function addRowToTable(name, category, amount) {
    const tableBody = document.getElementById('expenseTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${category}</td>
        <td>₹${amount}</td>
        <td><button class="delete-btn" onclick="deleteExpense(this, ${amount}, '${name}')">Delete</button></td>
    `;
    tableBody.appendChild(newRow);
}

function deleteExpense(button, amount, name) {
    const row = button.closest('tr');
    row.remove();

    expenses = expenses.filter(exp => !(exp.name === name && exp.amount === amount));
    localStorage.setItem('expenses', JSON.stringify(expenses));

    total -= amount;
    updateTotalDisplay();
}

function updateTotalDisplay() {
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}
