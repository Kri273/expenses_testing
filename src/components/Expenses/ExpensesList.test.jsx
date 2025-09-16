import { render, screen } from "@testing-library/react";
import ExpenseList from "./ExpensesList";

jest.mock("./ExpenseItem", () => ({ date, title, price }) => (
  <div data-testid="expense-item">{title} - {price}</div>
));

describe("ExpenseList Component", () => {
  test("renders loading state", () => {
    render(<ExpenseList isLoading={true} data={[]} />);
    expect(screen.getByText(/Fetching expenses data/i)).toBeInTheDocument();
  });

  test("renders fallback when no expenses", () => {
    render(<ExpenseList isLoading={false} data={[]} />);
    expect(screen.getByText(/No expenses found/i)).toBeInTheDocument();
  });

  test("renders correct number of expense items", () => {
    const sampleData = [
      { id: "1", title: "Book", price: 12.99, date: "2023-05-01" },
      { id: "2", title: "Coffee", price: 3.5, date: "2023-05-02" },
    ];

    render(<ExpenseList isLoading={false} data={sampleData} />);
    
    const items = screen.getAllByTestId("expense-item");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Book - 12.99");
    expect(items[1]).toHaveTextContent("Coffee - 3.5");
  });
});
