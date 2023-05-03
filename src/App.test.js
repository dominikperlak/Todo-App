import React from 'react';
import '@testing-library/jest-dom/extend-expect';
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
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    const newItem = screen.getByText('New item');
    expect(newItem).toBeInTheDocument();
  });
  test('edits an existing item in the list', () => {
    render(<App />);
    const newItem = 'New item';
    const editItem = 'Edited item';
    const input = screen.getByPlaceholderText('Add item');
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.change(input, { target: { value: newItem } });
    fireEvent.click(addButton);
    const listItem = screen.getByTestId('list-item-1683131926253');

    const editButton = within(listItem).getByTestId('edit-button-1');
    fireEvent.click(editButton);
    const editInput = within(listItem).getByTestId('edit-input');
    fireEvent.change(editInput, { target: { value: editItem } });
    const saveButton = within(listItem).getByTestId('save-button');
    fireEvent.click(saveButton);
    const editedItem = screen.getByText(editItem);
    expect(editedItem).toBeInTheDocument();
  });
  






});