import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRouter from "./src/routes/user.route";
import taskRouter from "./src/routes/task.route";
import { Request, Response, NextFunction } from "express";

const app = express();
const PORT = 2800;
const connection = require("./src/database");

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all requests

app.use(userRouter);
app.use(taskRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  /* use connection.query to query sql */
  connection.query("SELECT * FROM users", (err: any, users: any[]) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});
// For invalid routes
app.get("*", (req: Request, res: Response) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
