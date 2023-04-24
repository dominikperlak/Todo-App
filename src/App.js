import React, { useState } from "react";
import List from "./List";

const App = () => {
  const [list, setList] = useState([]);
  const [addItemText, setAddItemText] = useState("");

  const addItem = (item) => {
    if (item.trim() !== "") {
      setList([...list, item]);
    }
  };

  const editItem = (index, newValue) => {
    const newList = [...list];
    newList[index] = newValue;
    setList(newList);
  };

  const removeItem = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleAddItemChange = (e) => {
    setAddItemText(e.target.value);
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <List list={list} editItem={editItem} removeItem={removeItem} />
      <div>
        <input
          type="text"
          value={addItemText}
          onChange={handleAddItemChange}
        />
        <button onClick={() => addItem(addItemText)}>Add</button>
      </div>
    </div>
  );
};

export default App;
