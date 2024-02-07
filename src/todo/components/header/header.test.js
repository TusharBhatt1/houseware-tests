import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './header';
import '@testing-library/jest-dom/extend-expect';


describe('Header Component', () => {
  test('renders Header component', () => {
    render(<Header dispatch={() => {}} />);
    const headerElement = screen.getByTestId('header');
    const h1Element = screen.getByText('todos');
    const inputElement = screen.getByLabelText('New Todo Input');

    expect(headerElement).toBeInTheDocument();
    expect(h1Element).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  test('calls addItem function when a new todo is submitted', () => {
    const mockDispatch = jest.fn();
    render(<Header dispatch={mockDispatch} />);

    const inputElement = screen.getByLabelText('New Todo Input');
    const newTodoTitle = 'Test Todo';

   
    fireEvent.change(inputElement, { target: { value: newTodoTitle } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

  
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      payload: { title: newTodoTitle },
    });
    
  });
  test('does not call addItem function when submitting an empty todo', () => {
    const mockDispatch = jest.fn();
    render(<Header dispatch={mockDispatch} />);

    const inputElement = screen.getByLabelText('New Todo Input');

   
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
