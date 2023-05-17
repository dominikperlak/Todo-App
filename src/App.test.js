import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";


describe("App component", () => {
  test("renders Todo List header", () => {
    render(<App />);
    const header = screen.getByText("Todo List");
    expect(header).toBeInTheDocument();
  });

  test("adds a new item to the list", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Add item");
    fireEvent.change(input, { target: { value: "New item" } });
    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);
    const newItem = screen.getByText("New item");
    expect(newItem).toBeInTheDocument();
    
  });

  test("edits and save item in the list", async () => {
    render(<App />);
  
    const addItemInput = screen.getByTestId("add-input");
    const addButton = screen.getByTestId("add-button");
  
    fireEvent.change(addItemInput, { target: { value: "New item" } });
    fireEvent.click(addButton);
  
    const editButton = await screen.findByTestId(/edit-button/i);
    fireEvent.click(editButton);
  
    const editInput = await screen.findByTestId(/edit-input/i);
    fireEvent.change(editInput, { target: { value: "Edited item" } });
  
    const saveButton = await screen.findByTestId(/save-button/i);
    fireEvent.click(saveButton);
  
    const editedItem = await screen.findByText(/Edited item/i);
    expect(editedItem).toBeInTheDocument();
  });
  
  test("removes an item from the list", async () => {
    render(<App />);
    
    const addItemInput = screen.getByTestId("add-input");
    const addButton = screen.getByTestId("add-button");
    
    fireEvent.change(addItemInput, { target: { value: "Item to remove" } });
    fireEvent.click(addButton);
    
    const deleteButton = await screen.findByTestId(/delete-button/i);
    fireEvent.click(deleteButton);
    
    const deletedItem = screen.queryByText(/Item to remove/i);
    expect(deletedItem).not.toBeInTheDocument();
  });
  
  
});

  

  
  
  
  
  

