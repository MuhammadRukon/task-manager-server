const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
