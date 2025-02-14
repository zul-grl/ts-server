import { Router } from "express";
import {
  createUser,
  deleteHandler,
  getUser,
  handleUser,
  loginUser,
} from "../controller/user.controller";

const userRouter = Router();
userRouter
  .post("/register", createUser)
  .post("/login", loginUser)
  .get("/profile", getUser)
  .put("/profile", handleUser)
  .delete("/profile/:id", deleteHandler);
export { userRouter };
