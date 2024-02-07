import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./footer";
import "@testing-library/jest-dom/extend-expect";

describe("Footer Component", () => {
  const mockTodos = [
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
    { id: 3, text: "Task 3", completed: false },
  ];

  test("renders Footer component with correct active items count and navigation links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer todos={mockTodos} dispatch={() => {}} />
      </MemoryRouter>
    );

    const footerElement = screen.getByTestId("footer");
    const countElement = screen.getByText("2 items left!");
    const navigationElement = screen.getByTestId("footer-navigation");

    expect(footerElement).toBeInTheDocument();
    expect(countElement).toBeInTheDocument();
    expect(navigationElement).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "All" })).toHaveClass("selected");
  });
  test('clicking on "All" link updates the route and selected link', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer todos={mockTodos} dispatch={() => {}} />
      </MemoryRouter>
    );

    const allLink = screen.getByRole("link", { name: "All" });

    fireEvent.click(allLink);

    await waitFor(() => expect(window.location.pathname).toEqual("/"));

    expect(allLink).toHaveClass("selected");
    expect(allLink).toHaveAttribute("href", "#/");
  });

  test('clicking on "Active" link updates the route and selected link', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer todos={mockTodos} dispatch={() => {}} />
      </MemoryRouter>
    );

    const activeLink = screen.getByRole("link", { name: "Active" });

    fireEvent.click(activeLink);

    await waitFor(() => expect(window.location.pathname).toEqual("/active"));

    expect(activeLink).toHaveClass("selected");
    expect(activeLink).toHaveAttribute("href", "#/active");
  });

  test('clicking on "Completed" link updates the route and selected link', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer todos={mockTodos} dispatch={() => {}} />
      </MemoryRouter>
    );

    const completedLink = screen.getByRole("link", { name: "Completed" });

    fireEvent.click(completedLink);

    await waitFor(() => expect(window.location.pathname).toEqual("/completed"));

    expect(completedLink).toHaveClass("selected");
    expect(completedLink).toHaveAttribute("href", "#/completed");
  });
  test('clicking on "Clear completed" button calls the removeCompleted dispatch', () => {
    const removeCompletedMock = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer todos={mockTodos} dispatch={removeCompletedMock} />
      </MemoryRouter>
    );

    const clearCompletedButton = screen.getByText("Clear completed");
    fireEvent.click(clearCompletedButton);

    expect(removeCompletedMock).toHaveBeenCalled();
  });
});
