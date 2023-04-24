import React, { useState } from "react";

function List({ list, editItem, removeItem }) {
  const [editedIndex, setEditedIndex] = useState(-1);
  const [editedItemText, setEditedItemText] = useState("");

  const handleEdit = (index) => {
    setEditedIndex(index);
    setEditedItemText(list[index]);
  };

  const handleSave = (index) => {
    editItem(index, editedItemText);
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
      {list.map((item, index) => (
        <li key={index}>
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
              {item}
              <button onClick={() => handleEdit(index)}>Edit</button>
            </div>
          )}
          <button onClick={() => removeItem(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
