import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [budget, setBudget] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState(() => {

    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses
      ? JSON.parse(savedExpenses)
      : [];

  });

  // SAVE TO LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );

  }, [expenses]);

  const handleEdit = (expense) => {

  setTitle(expense.title);
  setAmount(expense.amount);
  setCategory(expense.category);

  setEditId(expense.id);

  setIsEditing(true);

};// ADD EXPENSE
  const addExpense = () => {
    if (!title || !amount) return;

    if (isEditing) {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editId
          ? {
              ...expense,
              title,
              amount,
              category,
            }
          : expense
      );

      setExpenses(updatedExpenses);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        title,
        amount,
        category,
      };

      setExpenses([...expenses, newExpense]);
    }

    setTitle("");
    setAmount("");
    setCategory("");
  };

  // DELETE EXPENSE
  const deleteExpense = (id) => {

    setExpenses(
      expenses.filter(
        (expense) => expense.id !== id
      )
    );

  };

  // TOTAL
  const foodTotal = expenses
  .filter((e) => e.category === "Food")
  .reduce((sum, e) => sum + Number(e.amount), 0);

const travelTotal = expenses
  .filter((e) => e.category === "Travel")
  .reduce((sum, e) => sum + Number(e.amount), 0);

const shoppingTotal = expenses
  .filter((e) => e.category === "Shopping")
  .reduce((sum, e) => sum + Number(e.amount), 0);

const billsTotal = expenses
  .filter((e) => e.category === "Bills")
  .reduce((sum, e) => sum + Number(e.amount), 0);

const entertainmentTotal = expenses
  .filter((e) => e.category === "Entertainment")
  .reduce((sum, e) => sum + Number(e.amount), 0);
  const data = {
  labels: [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
  ],

  datasets: [
    {
      label: "Expenses",
      data: [
        foodTotal,
        travelTotal,
        shoppingTotal,
        billsTotal,
        entertainmentTotal,
      ],
      backgroundColor: [
        "#1abc9c",
        "#34495e",
        "#9b59b6",
        "#e67e22",
        "#e74c3c",
      ],
      borderColor: [
        "#121212",
      ],
      hoverOffset: 10,
      borderWidth: 2,
    },
  ],
};
  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );
const downloadPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text("Expense Report", 20, 20);

  let y = 40;

  expenses.forEach((expense) => {

    doc.text(
      `${expense.title} - ₹${expense.amount} (${expense.category})`,
      20,
      y
    );

    y += 10;

  });

  doc.text(
    `Total Expenses: ₹${total}`,
    20,
    y + 20
  );

  doc.save("expenses.pdf");

};
  return (

 <div className="container">

  <div
    style={{
      textAlign: "center",
      marginBottom: "20px",
    }}
  >

    <h3
      style={{
        color: "#dfe6e9",
        marginBottom: "5px",
      }}
    >
      Personal Finance Dashboard
    </h3>

    <p
      style={{
        color: "#dfe6e9",
        fontSize: "14px",
      }}
    >
      Track your daily spending smartly 💸
    </p>

  </div>

  <h1>Expense Tracker</h1>
  <button
  onClick={() => {

    localStorage.removeItem("isLoggedIn");

    navigate("/");

  }}

  style={{
    background: "red",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    marginBottom: "20px",
    cursor: "pointer",
  }}
>

  Logout 🚪

</button> 

  <button
    onClick={() => setDarkMode(!darkMode)}
  >

    {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}

  </button>
<input
  type="text"
  placeholder="Expense Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}

  style={{
    background: darkMode ? "#333" : "#fff",
    color: darkMode ? "white" : "black",
  }}
/>
      <input
        type="number"
        placeholder="Amount"
        value={amount}  
        onChange={(e) => setAmount(e.target.value)}
        style={{
  background: darkMode ? "#333" : "#fff",
  color: darkMode ? "white" : "black",
}}
      />
<input
  type="number"
  placeholder="Set Monthly Budget"

  value={budget}

  onChange={(e) =>
    setBudget(e.target.value)
  }

  style={{
    background: darkMode ? "#333" : "#fff",
    color: darkMode ? "white" : "black",
  }}
/>

<br /><br />
      <br />

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{
  background: darkMode ? "#333" : "#fff",
  color: darkMode ? "white" : "black",
}}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>

  <option value="">
    Select Category
  </option>

  <option value="Food">
    Food
  </option>

  <option value="Travel">
    Travel
  </option>

  <option value="Shopping">
    Shopping
  </option>

  <option value="Bills">
    Bills
  </option>

  <option value="Entertainment">
    Entertainment
  </option>

</select>

<br />

    <button
  onClick={addExpense}
  style={{
    background: darkMode ? "#00b894" : "#0984e3",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    width: "100%",
    fontWeight: "bold",
    marginTop: "15px",
    cursor: "pointer",
  }}
>

  {isEditing ? "Update Expense ✏️" : "Add Expense ✅"}

</button>
<div
  style={{
    width: "300px",
    margin: "20px auto",
  }}
>
  <Pie data={data} />
</div>
<button onClick={downloadPDF}>
  Download PDF
</button>

<br /><br />
{budget && total > budget && (

  <h3
    style={{
      color: "red",
      textAlign: "center",
    }}
  >

    ⚠ Budget Exceeded!

  </h3>

)}
      <h2 className="total">
        Total Expenses: ₹{total}
      </h2>
      <input
        type="text"
        placeholder="Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
  background: darkMode ? "#333" : "#fff",
  color: darkMode ? "white" : "black",
}}
      />
      <select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <h3
  style={{
    textAlign: "center",
  }}
>

  Remaining Budget:
  ₹{budget ? budget - total : 0}

</h3>

  <option value="All">
    All
  </option>

  <option value="Food">
    Food
  </option>

  <option value="Travel">
    Travel
  </option>

  <option value="Shopping">
    Shopping
  </option>

  <option value="Bills">
    Bills
  </option>

  <option value="Entertainment">
    Entertainment
  </option>

</select>

<br /><br />

      <h2>Expenses</h2>

      {expenses
 .filter((expense) => {

  const matchesCategory =
    filter === "All" ||
    expense.category === filter;

  const matchesSearch =
    expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

  return matchesCategory && matchesSearch;

})
  .map((expense) => (

        <div
          key={expense.id}
          className="expense-item"

style={{
  background: darkMode ? "#2c2c2c" : "#f1f1f1",
  color: darkMode ? "white" : "black",
}}
        >

  <div
  key={expense.id}
  className="expense-item"

  style={{
    background: darkMode ? "#2c2c2c" : "#f1f1f1",
    color: darkMode ? "white" : "black",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  }}
>

 <div
  style={{
    flex: 1,
    minWidth: 0,
  }}
>
    <h3
  style={{
    wordBreak: "break-word",    
    margin: 0,
  }}
>
  {expense.title} - ₹{expense.amount}
  ({expense.category})
</h3>    

  </div>

  <div
    style={{
      display: "flex",
      gap: "10px",
    }}
  >

    <button
      onClick={() => handleEdit(expense)}
    >
      Edit
    </button>

  </div>

</div>
          <button
            className="delete-btn"
            onClick={() => deleteExpense(expense.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default Dashboard; 