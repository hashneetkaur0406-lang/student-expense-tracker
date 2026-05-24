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

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [budget, setBudget] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [expenses, setExpenses] = useState(() => {

    const savedExpenses =
      localStorage.getItem("expenses");

    return savedExpenses
      ? JSON.parse(savedExpenses)
      : [];

  });

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

  };

  const addExpense = () => {

    if (!title || !amount || !category) return;

    if (isEditing) {

      const updatedExpenses = expenses.map(
        (expense) =>

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

      setExpenses([
        ...expenses,
        newExpense,
      ]);

    }

    setTitle("");
    setAmount("");
    setCategory("");

  };

  const deleteExpense = (id) => {

    setExpenses(
      expenses.filter(
        (expense) =>
          expense.id !== id
      )
    );

  };

  const total = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const foodTotal = expenses
    .filter(
      (e) => e.category === "Food"
    )
    .reduce(
      (sum, e) =>
        sum + Number(e.amount),
      0
    );

  const travelTotal = expenses
    .filter(
      (e) => e.category === "Travel"
    )
    .reduce(
      (sum, e) =>
        sum + Number(e.amount),
      0
    );

  const shoppingTotal = expenses
    .filter(
      (e) => e.category === "Shopping"
    )
    .reduce(
      (sum, e) =>
        sum + Number(e.amount),
      0
    );

  const billsTotal = expenses
    .filter(
      (e) => e.category === "Bills"
    )
    .reduce(
      (sum, e) =>
        sum + Number(e.amount),
      0
    );

  const entertainmentTotal = expenses
    .filter(
      (e) =>
        e.category ===
        "Entertainment"
    )
    .reduce(
      (sum, e) =>
        sum + Number(e.amount),
      0
    );

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

        borderWidth: 2,
      },
    ],
  };

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "Expense Report",
      20,
      20
    );

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
          }}
        >
          Personal Finance Dashboard
        </h3>

        <p
          style={{
            color: "#dfe6e9",
          }}
        >
          Track your spending smartly 💸
        </p>

      </div>

      <h1>Expense Tracker</h1>

      <button
        onClick={() => {

          localStorage.removeItem(
            "isLoggedIn"
          );

          navigate("/");

        }}
      >
        Logout 🚪
      </button>

      <br /><br />

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode
          ? "Light Mode ☀️"
          : "Dark Mode 🌙"}
      </button>

      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Set Monthly Budget"
        value={budget}
        onChange={(e) =>
          setBudget(e.target.value)
        }
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
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

      <button
        onClick={addExpense}
      >
        {isEditing
          ? "Update Expense ✏️"
          : "Add Expense ✅"}
      </button>

      <div
        style={{
          width: "300px",
          margin: "20px auto",
        }}
      >
        <Pie data={data} />
      </div>

      <button
        onClick={downloadPDF}
      >
        Download PDF
      </button>

      {budget &&
        total > budget && (

        <h3
          style={{
            color: "red",
          }}
        >
          ⚠ Budget Exceeded!
        </h3>

      )}

      <h2>
        Total Expenses: ₹{total}
      </h2>

      <h3>
        Remaining Budget:
        ₹
        {budget
          ? budget - total
          : 0}
      </h3>

      <input
        type="text"
        placeholder="Search Expenses"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
      >
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

      <h2>Expenses</h2>

      {expenses
        .filter((expense) => {

          const matchesCategory =
            filter === "All" ||
            expense.category === filter;

          const matchesSearch =
            expense.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          return (
            matchesCategory &&
            matchesSearch
          );

        })

        .map((expense) => (

          <div
            key={expense.id}
            className="expense-item"
          >

            <div
              style={{
                flex: 1,
              }}
            >

              <h3>
                {expense.title}
                {" - ₹"}
                {expense.amount}
                {" ("}
                {expense.category}
                {")"}
              </h3>

            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              <button
                onClick={() =>
                  handleEdit(expense)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteExpense(
                    expense.id
                  )
                }
              >
                Delete
              </button>

            </div>

          </div>

      ))}

    </div>

  );

}

export default Dashboard; 