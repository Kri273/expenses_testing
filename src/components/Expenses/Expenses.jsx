import React, { useState } from "react";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseList from "./ExpensesList";
import Card from "../UI/Card";

const Expenses = (props) => {
  const { data } = props;


  const [filteredYear, setFilteredYear] = useState("2023");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    console.log("Valitud aasta on:", selectedYear);
  };

  const filteredExpenses = data.filter((expense) => {
    return new Date(expense.date).getFullYear().toString() === filteredYear;
  });

  return (
    <Card className="expenses">
      <ExpensesFilter 
        selected={filteredYear} 
        onChangeFilter={filterChangeHandler} 
      />
      <ExpenseList data={filteredExpenses}
      isLoading={props.isLoading} />
    </Card>
  );
};

export default Expenses;
