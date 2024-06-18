import { Router } from "express";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/task.controller";

const taskRouter = Router();

// Get all tasks for a user
taskRouter.get("/tasks/:userid", getTasks);

// Add a new task
taskRouter.post("/tasks/:userid", addTask);

// Get a single task
taskRouter.get("/tasks/:userid/:id", getTask);

// Update an existing task
taskRouter.put("/tasks/:userid/:id", updateTask);

// Delete a task
taskRouter.delete("/tasks/:userid/:id", deleteTask);

export default taskRouter;
