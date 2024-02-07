import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";
import '@testing-library/jest-dom/extend-expect';

describe("Input component", () => {
  test("renders with default props", () => {
    render(<Input />);
    const inputElement = screen.getByTestId("text-input");
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onSubmit with sanitized value on Enter key press", () => {
    const mockOnSubmit = jest.fn();
    render(<Input onSubmit={mockOnSubmit} />);

    const inputElement = screen.getByTestId("text-input");
    userEvent.type(inputElement, "Test&<>");
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockOnSubmit).toHaveBeenCalledWith("Test&amp;&lt;&gt;");
  });

  test("clears input value on Enter key press", () => {
    const mockOnSubmit = jest.fn();
    render(<Input onSubmit={mockOnSubmit} />);

    const inputElement = screen.getByTestId("text-input");
    userEvent.type(inputElement, "Test");
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(inputElement.value).toBe("");
  });
});
