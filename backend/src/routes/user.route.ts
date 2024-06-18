import { Router } from "express";
import { register, login } from "../controllers/user.controller";

const userRouter = Router();

// Register a new user
userRouter.post("/register", register);

// Log in an existing user
userRouter.post("/login", login);

export default userRouter;
