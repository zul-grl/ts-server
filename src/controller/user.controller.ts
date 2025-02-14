import { Request, RequestHandler, Response } from "express";

type TypeUser = {
  _id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  address?: {
    street?: string;
    city?: string;
    zip?: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
let users: TypeUser[] = [];
// Get all users
export const getUser: RequestHandler = (req: Request, res: Response) => {
  res.send(users);
};
// Handle user addition
const addUsers = (newUserData) => {
  const lastUser = users[users.length - 1];
  const newUser = {
    _id: lastUser ? lastUser._id + 1 : 1,
    ...newUserData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(newUser);
};
// Create new user
export const createUser: RequestHandler = (req: Request, res: Response) => {
  try {
    addUsers(req.body);
    res.send("User added");
  } catch {
    res.send("Request failed");
  }
};
// User login
export const loginUser: RequestHandler = (req: Request, res: Response) => {
  const { name, password } = req.body;
  const user = users.find((user) => user.name === name);
  try {
    if (!user) {
      res.send("User name not found");
      return;
    }
    if (user.password !== password) {
      res.send("Password wrong");
      return;
    }
    res.send("Login successful");
  } catch {
    res.send("Login failed");
  }
};
// Update user
export const handleUser: RequestHandler = (req: Request, res: Response) => {
  const { _id, name, password, email } = req.body;
  let putUser = users.find((user) => user._id == _id);
  if (putUser) {
    putUser.name = name;
    putUser.password = password;
    putUser.email = email;
    putUser.updatedAt = new Date();
    res.send("User updated");
    return;
  } else {
    res.send("User not found");
  }
};

// Delete user
export const deleteHandler: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const filteredUsers = users.filter((user) => user._id.toString() != id);
    users = filteredUsers;
    res.send("User deleted");
  } catch (error) {
    console.log(error);
  }
};
