import React, { useState } from "react";

function List({ items, onEditItem, onRemoveItem }) {
  const [editedIndex, setEditedIndex] = useState(-1);
  const [editedItemText, setEditedItemText] = useState("");

  const handleEdit = (index) => {
    setEditedIndex(index);
    setEditedItemText(items[index].content);
  };

  const handleSave = (index) => {
    onEditItem(items[index].id, editedItemText);
    setEditedIndex(-1);
    setEditedItemText("");
  };

  const handleCancel = () => {
    setEditedIndex(-1);
    setEditedItemText("");
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      handleSave(index);
    }
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          {editedIndex === index ? (
            <div>
              <input
                type="text"
                value={editedItemText}
                onChange={(e) => setEditedItemText(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
              <button onClick={() => handleSave(index)}>Save</button>
              <button onClick={() => handleCancel()}>Cancel</button>
            </div>
          ) : (
            <div>
              {item.content}
              <button onClick={() => handleEdit(index)}>Edit</button>
            </div>
          )}
          <button onClick={() => onRemoveItem(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
