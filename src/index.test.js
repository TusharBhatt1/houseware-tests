//Integration Testing-----> renders the main App component inside HashRouter 

import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { App } from './todo/app/app';

test('renders the main App component inside HashRouter', () => {
 
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

  const appElement = screen.getByText(/todos/i);

  expect(appElement).toBeInTheDocument();
});
