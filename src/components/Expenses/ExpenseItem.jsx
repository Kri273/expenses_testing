import ExpenseDate from "../Expenses/ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import { useState } from "react";

const ExpenseItem = (props) => {
  const { date, price, title: initialTitle } = props;
  const [title] = useState(initialTitle);

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
          <div className="expense-item__price">{price}</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
