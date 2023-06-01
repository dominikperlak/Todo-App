const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());


let todoList = [];


app.post("/api/lists", (req, res) => {
  const newItem = req.body;
  newItem._id = Date.now();
  todoList.push(newItem);
  res.json(newItem);
});


app.put("/api/lists/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const newValue = req.body.content;

  const itemToUpdate = todoList.find(item => item._id === itemId);
  if (itemToUpdate) {
    itemToUpdate.content = newValue;
    res.json(itemToUpdate);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.delete("/api/lists/:id", (req, res) => {
  const itemId = parseInt(req.params.id);

  const initialLength = todoList.length;
  todoList = todoList.filter(item => item._id !== itemId);

  if (todoList.length < initialLength) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.get("/api/lists", (req, res) => {
  res.json(todoList);
});

 //Turn the Server on
const port = 3000;
app.listen(port, () => {
  console.log(`Serwer turned on port ${port}`);
});
