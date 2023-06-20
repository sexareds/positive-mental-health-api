import { Router } from "express";

import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

// routes
router
  .get("/users", getUsers)
  .get("/users/:id", getUser)
  .post("/users", createUser)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);

export default router;
