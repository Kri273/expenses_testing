import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";

beforeEach(() => {
  const backdropRoot = document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-root");
  document.body.appendChild(backdropRoot);

  const overlayRoot = document.createElement("div");
  overlayRoot.setAttribute("id", "overlay-root");
  document.body.appendChild(overlayRoot);
});

afterEach(() => {
  document.getElementById("backdrop-root").remove();
  document.getElementById("overlay-root")?.remove();
});

test("renders all form inputs and buttons", () => {
  render(<ExpenseForm onSaveExpenseData={() => {}} onCancel={() => {}} />);

  expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Expense/i)).toBeInTheDocument();
  expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
});

test("shows error when submitting empty fields", () => {
  render(<ExpenseForm onSaveExpenseData={() => {}} onCancel={() => {}} />);
  fireEvent.click(screen.getByText(/Add Expense/i));
  expect(
    screen.getByText(/Please enter a valid title or price or date/i)
  ).toBeInTheDocument();
});

test("calls onSaveExpenseData with correct data when form is submitted", () => {
  const mockSaveHandler = jest.fn();
  const mockCancelHandler = jest.fn();

  render(
    <ExpenseForm
      onSaveExpenseData={mockSaveHandler}
      onCancel={mockCancelHandler}
    />
  );

  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: "Book" },
  });
  fireEvent.change(screen.getByLabelText(/Price/i), {
    target: { value: "12.5" },
  });
  fireEvent.change(screen.getByLabelText(/Date/i), {
    target: { value: "2025-01-01" },
  });

  fireEvent.click(screen.getByText(/Add Expense/i));


  expect(mockSaveHandler).toHaveBeenCalledTimes(1);
  expect(mockSaveHandler).toHaveBeenCalledWith({
    title: "Book",
    price: 12.5,
    date: new Date("2025-01-01"),
  });

  expect(mockCancelHandler).toHaveBeenCalledTimes(1);
});

test("calls onCancel when cancel button is clicked", () => {
  const mockCancelHandler = jest.fn();
  render(
    <ExpenseForm onSaveExpenseData={() => {}} onCancel={mockCancelHandler} />
  );

  fireEvent.click(screen.getByText(/Cancel/i));
  expect(mockCancelHandler).toHaveBeenCalledTimes(1);
});
