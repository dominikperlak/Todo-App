import React, { useState, useEffect } from "react";
import { fetchItems } from './api/list';
import { addItem } from './api/add';
import { editItem } from './api/edit';
import { removeItem } from './api/remove';
import './App.css'; 

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemValue, setEditingItemValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchItems();
      setItems(result);
    };
    fetchData();
  }, []);

  const handleAddItem = async (newItem) => {
    const newItemId = await addItem(newItem);
    setItems([...items, { content: newItem, id: newItemId }]);
    setInputValue('');
  };

  const handleEditItem = async (itemId, newValue) => {
    await editItem(itemId, newValue);
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        item.content = newValue;
      }
      return item;
    });
    setItems(updatedItems);
    setEditingItemId(null);
  };

  const handleRemoveItem = async (itemId) => {
    await removeItem(itemId);
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const handleEditingItemChange = (e) => {
    setEditingItemValue(e.target.value);
  };

  const handleEditingItemSave = () => {
    handleEditItem(editingItemId, editingItemValue);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Add item" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit" onClick={() => handleAddItem(inputValue)}>Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editingItemId === item.id ? (
              <>
                <input type="text" value={editingItemValue} onChange={handleEditingItemChange} />
                <button onClick={handleEditingItemSave}>Save</button>
              </>
            ) : (
              <>
                {item.content}
                <button onClick={() => {
                  setEditingItemId(item.id);
                  setEditingItemValue(item.content);
                }}>Edit</button>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
