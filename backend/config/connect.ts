import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let uri: string;
    // Use production DB_URI if running in production
    if (process.env.NODE_ENV === "production") {
      uri = process.env.DB_URI!;
    } else {
      uri = process.env.DEV_DB_URI!;
    }
    const conn = await mongoose.connect(uri);

    console.log(
      `Database connected at ${conn.connection.host}:${conn.connection.port}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
