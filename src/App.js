import React, { useState, useEffect } from "react";
import { fetchItems } from "./api/list";
import { addItem } from "./api/add";
import { editItem } from "./api/edit";
import { removeItem } from "./api/remove";
import { Input, Button, List, Space, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemValue, setEditingItemValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchItems();
      setItems(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddItem = async (newItem) => {
    if (newItem) {
      setLoading(true);
      const newItemId = await addItem(newItem);
      setItems([...items, { content: newItem, id: newItemId }]);
      setInputValue("");
      setLoading(false);
    }
  };

  const handleEditItem = async (itemId, newValue) => {
    setLoading(true);
    await editItem(itemId, newValue);
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        item.content = newValue;
      }
      return item;
    });
    setItems(updatedItems);
    setEditingItemId(null);
    setLoading(false);
  };

  const handleRemoveItem = async (itemId) => {
    setLoading(true);
    await removeItem(itemId);
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    setLoading(false);
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
        {loading && <Spin />}
      </Space>
      <List
        className="list"
        dataSource={items}
        loading={loading}
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
                <Button onClick={handleEditingItemSave} loading={loading}>
                  Save
                </Button>
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