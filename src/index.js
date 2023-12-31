import express from "express";
import cors from "cors";
import connect from "./database/database.js";
import dotenv from "dotenv";

// importing routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import noteRoutes from "./routes/note.route.js";
import testRoutes from "./routes/test.route.js";
import helpRoutes from "./routes/help.route.js";

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
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", noteRoutes);
app.use("/api", testRoutes);
app.use("/api", helpRoutes);

// si
const server = app.listen(3000, () => {
  console.log("Server on port", 3000);
});