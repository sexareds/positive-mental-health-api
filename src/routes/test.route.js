import { Router } from "express";
import { createTest, getTestById, getTestsPerUser, updateQuestionScore } from "../controllers/test.controller.js";

const router = Router();

router.post("/test", createTest);
router.put("/test/:id", updateQuestionScore)
router.get("/test/:id", getTestById)
router.get("/testPerUser/:email", getTestsPerUser)

export default router;