import express from "express";
import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import cors from 'cors'

const dbPath = "./db.txt";

const app = express();
app.use(express.json()); // Middleware to parse req as JSON
app.use(cors()) //allowing cross-origin 

const port = 2006;
app.listen(port, () => {
  console.log(`Serverr starts listening at port : ${port}`);
});

app.get("/todos", (req, res) => {
  try {
    // get data from data base
    const data = JSON.parse(readFileSync(dbPath, "utf8"));

    res.json({ data: data, msg: "Data fetched Successfully" });
  } catch (err) {
    console.log(`Error while fetching data: ${err}`);
  }
});

app.post("/todo", (req, res) => {
  try {
    // get data from data base
    const data = JSON.parse(readFileSync(dbPath, "utf8"));

    const newTodo = req.body;
    newTodo.id = uuidv4();

    data.push(newTodo); //add todo
    // updating data base
    writeFileSync(dbPath, JSON.stringify(data), "utf8");

    res.json({ msg: "Todo Added Successfully" });
  } catch (err) {
    console.log(`Error while fetching data: ${err}`);
  }
});

app.put("/todo/:id", (req, res) => {
  try {
    // get data from data base
    const data = JSON.parse(readFileSync(dbPath, "utf8"));

    const todoId = req.params.id;
    const updateTodo = req.body;
    updateTodo.id = todoId;

    for (let i = 0; i < data.length; i++) {
      //updating Todo
      if (data[i].id == todoId) {
        data[i] = updateTodo;
        break;
      }
    }

    // updating data base
    writeFileSync(dbPath, JSON.stringify(data), "utf8");

    res.json({ msg: "Todo Updated Successfully" });
  } catch (err) {
    console.log(`Error while fetching data: ${err}`);
  }
});

app.delete("/todo/:id", (req, res) => {
  try {
    // get data from data base
    const data = JSON.parse(readFileSync(dbPath, "utf8"));

    const todoId = req.params.id;

    const updateTodos = data.filter((eachTodo) => eachTodo.id != todoId); //delete Todo

    // updating data base
    writeFileSync(dbPath, JSON.stringify(updateTodos), "utf8");

    res.json({ msg: "Todo Deleted Successfully" });
  } catch (err) {
    console.log(`Error while fetching data: ${err}`);
  }
});
