import React, { useState } from "react";
import { Input, Button, List, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemValue, setEditingItemValue] = useState("");

  const handleAddItem = (newItem) => {
    if (newItem) {
      const newItemId = Date.now();
      setItems([...items, { content: newItem, id: newItemId }]);
      setInputValue("");
    } else {
      message.error("Please enter an item!");
    }
  };

  const handleEditItem = (itemId, newValue) => {
    if (newValue) {
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          item.content = newValue;
        }
        return item;
      });
      setItems(updatedItems);
      setEditingItemId(null);
    } else {
      message.error("Please enter a value!");
    }
  };

  const handleRemoveItem = (itemId) => {
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
        <Button
          type="primary"
          onClick={() => handleAddItem(inputValue)}
          icon={<PlusOutlined />}
          disabled={!inputValue}
        >
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
                <EditOutlined />
              </a>,
              <a key="delete" onClick={() => handleRemoveItem(item.id)}>
                <DeleteOutlined />
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
