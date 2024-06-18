import { Request, Response } from "express";
import { Connection } from "mysql";
import { promisify } from "util";
const connection = require("../database");

const query = promisify(connection.query.bind(connection));

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const checkUserSql = "SELECT * FROM users WHERE email = ?";
  const insertUserSql = "INSERT INTO users (email, password) VALUES (?, ?)";
  const params = [email, password];

  try {
    // Check if user already exists
    const existingUser = await query(checkUserSql, [email]);
    if (existingUser.length > 0) {
      return res.status(200).json({ message: "User already exists" });
    }

    // If user does not exist, insert new user
    await query(insertUserSql, params);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

// Log in an existing user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const params = [email, password];

  try {
    const results = await query(sql, params);
    if (results.length === 0) {
      res.status(201).json({ message: "User not found or invalid password" });
    } else {
      res.status(200).json({ message: "Login successful", user: results[0] });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to log in user" });
  }
};
