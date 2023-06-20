import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router = Router();

router
    .post('/auth/login', login)
    .post('/auth/signup', signup);

export default router;