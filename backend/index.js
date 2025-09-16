import express from "express";
import fs from "node:fs/promises";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/expenses", async (req, res) => {
  const fileContent = await fs.readFile("./data/expenses.json");
  const expensesData = JSON.parse(fileContent);
  res.status(200).json({ expenses: expensesData });
});

app.post("/add-expense", async (req, res) => {
  const expenseData = req.body;
  const NewExpense = {
    ...expenseData  };
  try {
    const fileContent = await fs.readFile("./data/expenses.json", "utf8");
    const expensesData = JSON.parse(fileContent);
    expensesData.push(NewExpense);
    await fs.writeFile("./data/expenses.json", JSON.stringify(expensesData));
    res.status(201).json({ message: "Expense is added" });
  } catch (error) {
    console.error(error);
  }
});

app.listen(3005, () => {
  console.log("backend server connected");
});
