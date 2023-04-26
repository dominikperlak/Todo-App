import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

function List({ items, handleEditItem, handleRemoveItem }) {
  const [editValues, setEditValues] = useState({});

  const handleEditChange = (e, id) => {
    setEditValues({ ...editValues, [id]: e.target.value });
  };

  const handleEditSubmit = (id) => {
    handleEditItem(id, editValues[id]);
    setEditValues({ ...editValues, [id]: "" });
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {editValues[item.id] !== undefined ? (
            <>
              <Input
                value={editValues[item.id]}
                onChange={(e) => handleEditChange(e, item.id)}
              />
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => handleEditSubmit(item.id)}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              {item.content}
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() =>
                  setEditValues({ ...editValues, [item.id]: item.content })
                }
              >
                Edit
              </Button>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </Button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default List;
