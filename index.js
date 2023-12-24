const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Task = require("./models/task");
require("dotenv").config();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://taskmanager-scic-8.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS}@cluster0.wgk6h9w.mongodb.net/?retryWrites=true&w=majority`;

async function run() {
  app.get("/", (req, res) => {
    res.send("server root route");
  });
  await mongoose.connect(uri, { dbName: process.env.DB_NAME });
  console.log(`connected to db : ${process.env.DB_NAME}`);

  //get users tasks
  app.get("/all-tasks", async (req, res) => {
    const result = await Task.find();
    res.send(result);
  });
  app.get("/tasks", async (req, res) => {
    const email = req.query.user;
    const status = req.query.status;
    const result = await Task.find({ status: status, email: email });
    res.send(result);
  });
  // create a task
  app.post("/tasks/create-task", async (req, res) => {
    const task = req.body;
    console.log(task);
    const result = await Task.create(task);
    console.log(result);
    res.send(result);
  });
  //   update a task status
  app.patch("/tasks/update/:id", async (req, res) => {
    const id = req.params.id;
    const status = req.body;
    const data = {
      $set: status,
    };
    const filter = { _id: id };
    const result = await Task.updateOne(filter, data);
    res.send(result);
  });
  // delete a task
  app.delete("/tasks/delete/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const result = await Task.deleteOne(filter);

    res.send(result);
  });
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server running on port${port}`);
});
