import React, { useState, useEffect } from "react";
import { Input, Button, List, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd";
import "./App.css";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemValue, setEditingItemValue] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/lists");
      setItems(response.data);
    } catch (error) {
      console.error("Error while fetching items:", error);
    }
  };

  const handleAddItem = async (newItem) => {
    if (newItem.trim()) {
      try {
        const response = await axios.post("http://localhost:3000/api/lists", { content: newItem,
        });
        setItems([...items, response.data]);
        setInputValue("");
      } catch (error) {
        console.error("Error while adding item:", error);
      }
    } else {
      message.error("Please enter an item!");
    }
  };

  const handleEditItem = async (itemId, newValue) => {
    if (newValue.trim()) {
      try {
        await axios.put(`http://localhost:3000/api/lists/${itemId}`, {content: newValue,
        });
        const updatedItems = items.map((item) => {
          if (item._id === itemId) {
            item.content = newValue;
          }
          return item;
        });
        setItems(updatedItems);
        setEditingItemId(null);
      } catch (error) {
        console.error("Error while editing item:", error);
      }
    } else {
      message.error("Please enter a value!");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/api/lists/${itemId}`);

      const updatedItems = items.filter((item) => item._id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error while removing item:", error);
    }
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
          data-testid="add-input"
        />
        <Button
          type="primary"
          onClick={() => handleAddItem(inputValue)}
          icon={<PlusOutlined />}
          data-testid="add-button"
          disabled={!inputValue.trim()}
        >
          Add
        </Button>
      </Space>
      <List
        className="list"
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            actions={[
              <Button
                key="edit"
                className="edit-button"
                onClick={() => {
                  setEditingItemId(item._id);
                  setEditingItemValue(item.content);
                }}
                data-testid={`edit-button-${item._id}`}
                type="text"
              >
                <EditOutlined />
              </Button>,
              <Button
                key="delete"
                onClick={() => handleRemoveItem(item._id)}
                data-testid={`delete-button-${item._id}`}
                className="delete-button"
              >
                <DeleteOutlined />
              </Button>,
            ]}
            data-testid={`list-item-${item._id}`}
          >
            {editingItemId === item._id ? (
              <Space>
                <Input
                  value={editingItemValue}
                  onChange={handleEditingItemChange}
                  data-testid={`edit-input-${item._id}`}
                />
                <Button onClick={handleEditingItemSave} data-testid={`save-button-${item._id}`}>
                  Save
                </Button>
              </Space>
            ) : (
              <div data-testid={`list-item-content-${item._id}`}>{item.content}</div>
            )}
          </List.Item>
        )}
        data-testid="item-list"
      />
    </div>
  );
}

export default App;
