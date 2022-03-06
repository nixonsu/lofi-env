import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import errorHandler from "./middleware/errorHandler";
import connectDB from "./config/connect";

// Load environment variables
dotenv.config();
const port: string = process.env.PORT!;

// Instantiate express app and use built-in middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes middleware
app.use("/api/users", userRoutes);

// Custom error handler middleware ()
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});
