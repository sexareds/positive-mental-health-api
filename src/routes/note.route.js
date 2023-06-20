import { Router } from "express";
import { getNotesByUser, createNote, deleteNote } from "../controllers/note.controller.js";

const router = Router();

router
  .get("/notes/:userId", getNotesByUser)
  .post("/notes", createNote)
  .delete("/notes/:userId/:noteId", deleteNote);

export default router;