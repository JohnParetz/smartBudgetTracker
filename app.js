let income = 0;
let expenses = 0;
let selectedType = "income";

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
  const amount = Number(document.getElementById("amount").value);

  if (!amount) return;

  if (selectedType === "income") {
    income += amount;
  } else {
    expenses += amount;
  }

  updateUI();
}

function updateUI() {
  document.getElementById("income").textContent = "$" + income;
  document.getElementById("expenses").textContent = "$" + expenses;
  document.getElementById("balance").textContent = "$" + (income - expenses);
}