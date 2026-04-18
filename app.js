let selectedType = "income";
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// switch between income and expense tabs
function setType(type) {
  selectedType = type;

  const incomeTab = document.getElementById("incomeTab");
  const expenseTab = document.getElementById("expenseTab");

  if (incomeTab && expenseTab) {
    incomeTab.classList.remove("active");
    expenseTab.classList.remove("active");

    if (type === "income") {
      incomeTab.classList.add("active");
    } else {
      expenseTab.classList.add("active");
    }
  }
}

// save data
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// add new entry
function addEntry() {
  const descInput = document.getElementById("desc");
  const amountInput = document.getElementById("amount");

  if (!descInput || !amountInput) return;

  const desc = descInput.value.trim();
  const amount = Number(amountInput.value);

  if (desc === "" || amount <= 0 || isNaN(amount)) {
    alert("Please enter a description and a valid amount.");
    return;
  }

  const transaction = {
    desc: desc,
    amount: amount,
    type: selectedType
  };

  transactions.push(transaction);
  saveTransactions();

  descInput.value = "";
  amountInput.value = "";

  updateUI();
}

// delete entry
function deleteEntry(index) {
  transactions.splice(index, 1);
  saveTransactions();
  updateUI();
}

// update home page and health page totals
function updateUI() {
  let income = 0;
  let expenses = 0;

  const list = document.getElementById("list");
  if (list) {
    list.innerHTML = "";
  }

  transactions.forEach((t, index) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expenses += t.amount;
    }

    if (list) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${t.desc} - $${t.amount} (${t.type})</span>
        <button class="delete-btn" onclick="deleteEntry(${index})">X</button>
      `;
      list.appendChild(li);
    }
  });

  const incomeEl = document.getElementById("income");
  const expensesEl = document.getElementById("expenses");
  const balanceEl = document.getElementById("balance");

  if (incomeEl) incomeEl.textContent = "$" + income;
  if (expensesEl) expensesEl.textContent = "$" + expenses;
  if (balanceEl) balanceEl.textContent = "$" + (income - expenses);

  const healthIncome = document.getElementById("healthIncome");
  const healthExpenses = document.getElementById("healthExpenses");
  const healthBalance = document.getElementById("healthBalance");

  if (healthIncome) healthIncome.textContent = "$" + income;
  if (healthExpenses) healthExpenses.textContent = "$" + expenses;
  if (healthBalance) healthBalance.textContent = "$" + (income - expenses);
}

// financial health check
function checkHealth() {
  let income = 0;
  let expenses = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expenses += t.amount;
    }
  });

  const message = document.getElementById("healthMessage");
  const advice = document.getElementById("healthAdvice");
  const animation = document.getElementById("healthAnimation");

  if (!message || !advice || !animation) return;

  if (transactions.length === 0) {
    message.textContent = "No financial data available yet.";
    advice.textContent = "Add some income and expenses first.";
    animation.textContent = "📊";
    animation.className = "health-animation";
    return;
  }

  if (income >= expenses) {
    message.textContent = "You are in good financial health.";
    advice.textContent = "Nice work — your income is covering your spending. Keep building healthy saving habits.";
    animation.textContent = "💸💰✨";
    animation.className = "health-animation good-anim";
    message.className = "good-health";
  } else {
    message.textContent = "You are in poor financial health.";
    advice.textContent = "Your expenses are higher than your income. Try reducing spending and improving saving habits.";
    animation.textContent = "🛑⚠️";
    animation.className = "health-animation bad-anim";
    message.className = "bad-health";
  }
}

// load data when page opens
updateUI();