import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.DB_URI;
    if (uri) {
      const conn = await mongoose.connect(uri);
      console.log(
        `Database connected at ${conn.connection.host}:${conn.connection.port}`
      );
    } else {
      console.error("Must specify DB_URI in environment variables");
      process.exit(1);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
