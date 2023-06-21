import { Router } from "express";
import { createTest, getTestById, getTestsPerUser, updateQuestionScore } from "../controllers/test.controller.js";

const router = Router();

router
	.post("/test", createTest)
	.put("/test/:id", updateQuestionScore)
	.get("/test/:id", getTestById)
	.get("/testPerUser/:email", getTestsPerUser);

export default router;