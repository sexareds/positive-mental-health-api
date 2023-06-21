import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser, createPsychologist } from "../controllers/user.controller.js";

const router = Router();

router
  .get("/users", getUsers)
  .get("/users/:email", getUser)
  .post("/users", createUser)
  .put("/users/:id", updateUser)
  .delete("/users/:email", deleteUser)
  .post("/users/psychologist", createPsychologist);

export default router;