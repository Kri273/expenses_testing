import { render, screen, fireEvent } from "@testing-library/react";
import ExpensesFilter from "./ExpensesFilter";

test("renders filter component with default selected year", () => {
  render(<ExpensesFilter selected="2023" onChangeFilter={() => {}} />);

  const selectElement = screen.getByRole("combobox");
  expect(selectElement.value).toBe("2023");
});

test("calls onChangeFilter when a new year is selected", () => {
    const mockHandler = jest.fn();
  render(<ExpensesFilter selected="2023" onChangeFilter={mockHandler} />);

  const selectElement = screen.getByRole("combobox");

  fireEvent.change(selectElement, { target: { value: "2024" } });

  expect(mockHandler).toHaveBeenCalledTimes(1);
  expect(mockHandler).toHaveBeenCalledWith("2024");
});
