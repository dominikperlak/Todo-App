import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App component', () => {
  test('renders Todo List header', () => {
    render(<App />);
    const header = screen.getByText('Todo List');
    expect(header).toBeInTheDocument();
  });

  test('adds a new item to the list', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add item');
    fireEvent.change(input, { target: { value: 'New item' } });
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    const newItem = screen.getByText('New item');
    expect(newItem).toBeInTheDocument();
  });



  

  
  
  
  
  
  
  
});
  
  
  
  
  
  

