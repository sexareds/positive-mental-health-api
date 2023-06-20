import express from "express";
import cors from "cors";
import connect from "./database/database.js";
import dotenv from "dotenv";

// importing routes
import userRoutes from "./routes/user.route.js";
import noteRoutes from "./routes/note.route.js";
import testRoutes from "./routes/test.route.js";
import authRoutes from "./routes/auth.route.js"

// env variables
dotenv.config();

// app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// DB connection
connect();

// routes
app.use("/api", userRoutes);
app.use("/api", noteRoutes);
app.use("/api", testRoutes);
app.use("/api", authRoutes);

// si
const server = app.listen(3000, () => {
  console.log("Server on port", 3000);
});