import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Item } from './item';
import '@testing-library/jest-dom/extend-expect';


describe('Item Component', () => {
  const mockTodo = { id: 1, title: 'Test Todo', completed: false };
  const mockDispatch = jest.fn();

  test('renders Item component with a completed todo', () => {
    render(<Item todo={{ ...mockTodo, completed: true }} dispatch={mockDispatch} index={0} />);

    const todoItem = screen.getByTestId('todo-item');

    expect(todoItem).toHaveClass('completed');
  });

  test('toggles the completion status of the todo', () => {
    render(<Item todo={mockTodo} dispatch={mockDispatch} index={0} />);

    const toggleCheckbox = screen.getByTestId('todo-item-toggle');

   
    fireEvent.click(toggleCheckbox);

  
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_ITEM', payload: { id: mockTodo.id } });
  });

  test('removes the todo', () => {
    render(<Item todo={mockTodo} dispatch={mockDispatch} index={0} />);

    const removeButton = screen.getByTestId('todo-item-button');

    fireEvent.click(removeButton);

   
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'REMOVE_ITEM', payload: { id: mockTodo.id } });
  });
});
