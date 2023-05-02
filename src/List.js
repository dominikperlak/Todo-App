import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    const addButton = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(addButton);
    const newItem = screen.getByText('New item');
    expect(newItem).toBeInTheDocument();
  });

  test('edits an item in the list', () => {
    render(<App />);
    const item = screen.getByText('Item 1');
    const editButton = item.nextSibling.nextSibling.firstChild;
    fireEvent.click(editButton);
    const editInput = screen.getByDisplayValue('Item 1');
    fireEvent.change(editInput, { target: { value: 'Updated item' } });
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);
    const updatedItem = screen.getByText('Updated item');
    expect(updatedItem).toBeInTheDocument();
  });

  test('removes an item from the list', () => {
    render(<App />);
    const item = screen.getByText('Item 1');
    const removeButton = item.nextSibling.nextSibling.nextSibling.firstChild;
    fireEvent.click(removeButton);
    const remainingItem = screen.queryByText('Item 1');
    expect(remainingItem).not.toBeInTheDocument();
  });
});
