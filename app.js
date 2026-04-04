let income = 0;
let expenses = 0;

function addEntry() {
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!amount) return;

  if (type === "income") {
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