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
const port: string | number = (process.env.PORT! || 80);

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
if (process.env.NODE_ENV === "production") {
  // Path for static assets (build)
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Serve index.html
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) =>
    res.send("Please set to environment variables to production")
  );
}

// Custom error handler middleware ()
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});
