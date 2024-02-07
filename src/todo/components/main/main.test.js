import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from './main';
import '@testing-library/jest-dom/extend-expect';

describe('Main Component', () => {
  const mockTodos = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
    { id: 3, text: 'Task 3', completed: false },
  ];

  test('renders the main component with visible todos based on the active route', () => {
    render(
      <MemoryRouter initialEntries={['/completed']}>
        <Main todos={mockTodos} dispatch={() => {}} />
      </MemoryRouter>
    );

    const visibleTodos = screen.getAllByTestId('todo-item');

    expect(visibleTodos).toHaveLength(1); // Assuming only one completed todo in mockTodos for '/completed' route
  });

  test('renders the main component with all todos when the route is not /active or /completed', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Main todos={mockTodos} dispatch={() => {}} />
      </MemoryRouter>
    );

    const visibleTodos = screen.getAllByTestId('todo-item');

    expect(visibleTodos).toHaveLength(mockTodos.length);
  });

  test('renders the "Toggle All" checkbox when there are visible todos', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Main todos={mockTodos} dispatch={() => {}} />
      </MemoryRouter>
    );

    const toggleAllElement = screen.getByTestId('toggle-all');

    expect(toggleAllElement).toBeInTheDocument();
  });

  test('does not render the "Toggle All" checkbox when there are no visible todos', () => {
    render(
      <MemoryRouter initialEntries={['/active']}>
        <Main todos={mockTodos} dispatch={() => {}} />
      </MemoryRouter>
    );
  
    const toggleAllElement = screen.queryByTestId('toggle-all');
  
    // Check if the element is not checked
    expect(toggleAllElement).toBeInTheDocument();
    expect(toggleAllElement).not.toBeChecked();
  });
  
  test('toggles all todos when clicking the "Toggle All" checkbox', () => {
    const toggleAllMock = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Main todos={mockTodos} dispatch={toggleAllMock} />
      </MemoryRouter>
    );

    const toggleAllElement = screen.getByTestId('toggle-all');
    fireEvent.click(toggleAllElement);

    expect(toggleAllMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'TOGGLE_ALL' }));
  });
});
