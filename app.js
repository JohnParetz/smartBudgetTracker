let selectedType = "income";
let transactions = [];

function setType(type) {
  selectedType = type;

  const incomeTab = document.getElementById("incomeTab");
  const expenseTab = document.getElementById("expenseTab");

  incomeTab.classList.remove("active");
  expenseTab.classList.remove("active");

  if (type === "income") {
    incomeTab.classList.add("active");
  } else {
    expenseTab.classList.add("active");
  }
}

function addEntry() {
  const descInput = document.getElementById("desc");
  const amountInput = document.getElementById("amount");

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

  descInput.value = "";
  amountInput.value = "";

  updateUI();
}

function updateUI() {
  let income = 0;
  let expenses = 0;

  const list = document.getElementById("list");
  list.innerHTML = "";

  transactions.forEach((t, index) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expenses += t.amount;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${t.desc} - $${t.amount} (${t.type})</span>
      <button class="delete-btn" onclick="deleteEntry(${index})">X</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("income").textContent = "$" + income;
  document.getElementById("expenses").textContent = "$" + expenses;
  document.getElementById("balance").textContent = "$" + (income - expenses);
}

function deleteEntry(index) {
  transactions.splice(index, 1);
  updateUI();
}