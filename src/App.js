import React, { useState, useEffect } from "react";
import { fetchItems } from "./api/list";
import { addItem } from "./api/add";
import { editItem } from "./api/edit";
import { removeItem } from "./api/remove";
import { Input, Button, List, Space } from "antd";
import "antd/dist/antd";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemValue, setEditingItemValue] = useState("");

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
    setInputValue("");
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
      <Space>
        <Input
          placeholder="Add item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="primary" onClick={() => handleAddItem(inputValue)}>
          Add
        </Button>
      </Space>
      <List
        className="list"
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a
                key="edit"
                onClick={() => {
                  setEditingItemId(item.id);
                  setEditingItemValue(item.content);
                }}
              >
                Edit
              </a>,
              <a key="delete" onClick={() => handleRemoveItem(item.id)}>
                Remove
              </a>,
            ]}
          >
            {editingItemId === item.id ? (
              <Space>
                <Input
                  value={editingItemValue}
                  onChange={handleEditingItemChange}
                />
                <Button onClick={handleEditingItemSave}>Save</Button>
              </Space>
            ) : (
              <div>{item.content}</div>
            )}
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
