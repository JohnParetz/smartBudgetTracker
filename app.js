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
// delete all 
function clearAll() {
  if (confirm("Are you sure you want to delete all transactions?")) {
    transactions = [];
    localStorage.removeItem("transactions");
    updateUI();
  }
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

// profile page
function getTotals() {
  let income = 0;
  let expenses = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expenses += t.amount;
    }
  });

  return {
    income: income,
    expenses: expenses,
    balance: income - expenses
  };
}

function saveProfile() {
  const nameInput = document.getElementById("profileName");
  const goalInput = document.getElementById("savingsGoal");

  if (!nameInput || !goalInput) return;

  const profile = {
    name: nameInput.value.trim(),
    goal: Number(goalInput.value)
  };

  if (profile.name === "" || profile.goal <= 0) {
    alert("Please enter your name and a valid savings goal.");
    return;
  }

  localStorage.setItem("profile", JSON.stringify(profile));
  displayProfile();

  nameInput.value = "";
  goalInput.value = "";
}

function displayProfile() {
  const profileMessage = document.getElementById("profileMessage");
  const goalMessage = document.getElementById("goalMessage");
  const balanceGoalMessage = document.getElementById("balanceGoalMessage");

  if (!profileMessage || !goalMessage || !balanceGoalMessage) return;

  const profile = JSON.parse(localStorage.getItem("profile"));
  const totals = getTotals();

  if (!profile) {
    profileMessage.textContent = "No profile saved yet.";
    goalMessage.textContent = "";
    balanceGoalMessage.textContent = "";
    return;
  }

  profileMessage.textContent = "Welcome, " + profile.name + "!";
  goalMessage.textContent = "Savings goal: $" + profile.goal + " | Current balance: $" + totals.balance;

  if (totals.balance >= profile.goal) {
    balanceGoalMessage.textContent = "✅ Goal met! You reached your monthly savings goal.";
    balanceGoalMessage.className = "goal-success";
  } else {
    const difference = profile.goal - totals.balance;
    balanceGoalMessage.textContent = "❌ Goal not met yet. You need $" + difference + " more to reach your goal.";
    balanceGoalMessage.className = "goal-fail";
  }
}

function showTip(type) {
  const tipMessage = document.getElementById("tipMessage");
  if (!tipMessage) return;

  if (type === "saving") {
    tipMessage.textContent = "Saving Tip: Try setting aside a small amount right after you receive income.";
  } else if (type === "spending") {
    tipMessage.textContent = "Spending Tip: Review your largest expenses and see where you can reduce costs.";
  } else {
    tipMessage.textContent = "Goal Tip: Start with a realistic goal and increase it slowly over time.";
  }
}

let profiles = JSON.parse(localStorage.getItem("profiles")) || [];

function saveProfiles() {
  localStorage.setItem("profiles", JSON.stringify(profiles));
}

function saveProfile() {
  const nameInput = document.getElementById("profileName");
  const goalInput = document.getElementById("savingsGoal");
  const balanceInput = document.getElementById("profileBalance");

  if (!nameInput || !goalInput || !balanceInput) return;

  const name = nameInput.value.trim();
  const goal = Number(goalInput.value);
  const balance = Number(balanceInput.value);

  if (name === "" || goal <= 0 || isNaN(balance)) {
    alert("Please enter a name, savings goal, and balance.");
    return;
  }

  profiles.push({
    name: name,
    goal: goal,
    balance: balance
  });

  saveProfiles();

  nameInput.value = "";
  goalInput.value = "";
  balanceInput.value = "";

  displayProfiles();
}

function deleteProfile(index) {
  profiles.splice(index, 1);
  saveProfiles();
  displayProfiles();
}

function displayProfiles() {
  const profileList = document.getElementById("profileList");
  if (!profileList) return;

  profileList.innerHTML = "";

  profiles.sort((a, b) => {
    const percentA = a.balance / a.goal;
    const percentB = b.balance / b.goal;
    return percentB - percentA;
  });

  profiles.forEach((profile, index) => {
    const percent = Math.round((profile.balance / profile.goal) * 100);
    const status = profile.balance >= profile.goal ? "Goal Met ✅" : "Still Working ⏳";

    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>${profile.name}</strong><br>
        Balance: $${profile.balance} / Goal: $${profile.goal}<br>
        Progress: ${percent}% - ${status}
      </span>
      <button class="delete-btn" onclick="deleteProfile(${index})">X</button>
    `;

    profileList.appendChild(li);
  });
}


displayProfile();