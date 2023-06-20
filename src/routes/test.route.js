import { Router } from "express";
import { createTest } from "../controllers/test.controller.js";

const router = Router();

router.post("/test", createTest);

export default router;