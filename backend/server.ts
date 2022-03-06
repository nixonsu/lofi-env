import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";

// Load environment variables
dotenv.config();
const port = process.env.PORT;

// Instantiate express app
const app = express();

// Routes middleware
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
