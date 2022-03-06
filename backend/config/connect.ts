import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI!);
    console.log(
      `Database connected at ${conn.connection.host}:${conn.connection.port}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
