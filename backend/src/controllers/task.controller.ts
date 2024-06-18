import { Request, Response } from "express";
import { Connection } from "mysql";
import { promisify } from "util";
const connection = require("../database");

const query = promisify(connection.query.bind(connection));

// Add a new task
export const addTask = async (req: Request, res: Response) => {
  const { userid } = req.params;

  const { title, description } = req.body;
  const sql =
    "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)";
  const params = [userid, title, description];

  try {
    await query(sql, params);
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Failed to add task" });
  }
};

// Update an existing task
export const updateTask = async (req: Request, res: Response) => {
  const { userid, id } = req.params;
  const { title, description } = req.body;
  const sql =
    "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?";
  const params = [title, description, id, userid];

  try {
    await query(sql, params);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { userid, id } = req.params;
  const sql = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
  const params = [id, userid];

  try {
    await query(sql, params);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

// Get all tasks for a user
export const getTasks = async (req: Request, res: Response) => {
  const { userid } = req.params;
  const sql = "SELECT * FROM tasks WHERE user_id = ?";
  const params = [userid];

  try {
    const tasks = await query(sql, params);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Get a single task with the given id for a user
export const getTask = async (req: Request, res: Response) => {
  const { userid, id } = req.params;
  const sql = "SELECT * FROM tasks WHERE id = ? AND user_id = ?";
  const params = [id, userid];

  try {
    const task = await query(sql, params);
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
};
