/* eslint-disable no-console */
import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/user.routes";
import linkRoutes from "./routes/link.routes";
import taskRoutes from "./routes/task.routes";
import colorRoutes from "./routes/color.routes";
import errorHandler from "./middleware/errorHandler";
import connectDB from "./config/connect";

// Load environment variables
dotenv.config();

// Read in port to spin up server
let port: string;
if (process.env.PORT) {
  port = process.env.PORT;
} else {
  port = "4000"; // Default to port 4000
}

// Instantiate express app and use built-in middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes middleware
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/colors", colorRoutes);

// Serve frontend
// Path for static assets (build)
if (process.env.ENV === "prod") {
  app.use(express.static(path.join("./", "frontend", "build")));

  // Serve index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve("./", "frontend", "build", "index.html"))
  );
}

// Custom error handler middleware ()
app.use(errorHandler);

if (process.env.ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    connectDB();
  });
}

export default app;
