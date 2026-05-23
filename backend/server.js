const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./expenses.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("SQLite Connected");
  }
});

db.run(`
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  amount INTEGER
)
`);

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});


// ADD EXPENSE
app.post("/add-expense", (req, res) => {
  const { title, amount } = req.body;

  db.run(
    "INSERT INTO expenses (title, amount) VALUES (?, ?)",
    [title, amount],
    function (err) {
      if (err) {
        res.status(500).json(err.message);
      } else {
        res.json({
          message: "Expense Added",
          id: this.lastID
        });
      }
    }
  );
});


// GET ALL EXPENSES
app.get("/expenses", (req, res) => {
  db.all("SELECT * FROM expenses", [], (err, rows) => {
    if (err) {
      res.status(500).json(err.message);
    } else {
      res.json(rows);
    }
  });
});
// DELETE EXPENSE
app.delete("/delete-expense/:id", (req, res) => {

  const id = req.params.id;

  db.run(
    "DELETE FROM expenses WHERE id=?",
    [id],
    function (err) {

      if (err) {
        res.status(500).json(err.message);
      } else {
        res.json("Expense Deleted");
      }

    }
  );

});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});