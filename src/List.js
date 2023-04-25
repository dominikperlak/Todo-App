import React, { useState } from "react";

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
              <input
                type="text"
                value={editValues[item.id]}
                onChange={(e) => handleEditChange(e, item.id)}
              />
              <button onClick={() => handleEditSubmit(item.id)}>Save</button>
            </>
          ) : (
            <>
              {item.content}
              <button onClick={() => setEditValues({ ...editValues, [item.id]: item.content })}>
                Edit
              </button>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default List;
