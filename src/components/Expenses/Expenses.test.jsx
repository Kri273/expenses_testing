import { render, screen, fireEvent } from "@testing-library/react";
import Expenses from "./Expenses";

jest.mock("./ExpensesFilter", () => ({ selected, onChangeFilter }) => (
  <div>
    <span>Filter: {selected}</span>
    <button onClick={() => onChangeFilter("2024")}>Change Year</button>
  </div>
));

jest.mock("./ExpensesList", () => ({ data, isLoading }) => (
  <div>
    {isLoading ? "Loading..." : `Expenses count: ${data.length}`}
  </div>
));

describe("Expenses component", () => {
  const sampleData = [
    { id: "e1", title: "Book", amount: 12.99, date: "2023-05-01" },
    { id: "e2", title: "Coffee", amount: 3.5, date: "2024-02-12" },
  ];

  test("shows loading state", () => {
    render(<Expenses data={sampleData} isLoading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
