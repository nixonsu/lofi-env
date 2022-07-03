/* eslint-disable no-console */
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let uri: string;
    // Use production DB_URI if running in production
    if (process.env.NODE_ENV === "production") {
      if (process.env.DB_URI) {
        uri = process.env.DB_URI;
        const conn = await mongoose.connect(uri);
        console.log(
          `Production Database connected at ${conn.connection.host}:${conn.connection.port}`
        );
      }
    } else if (process.env.NODE_ENV === "development") {
      if (process.env.DEV_DB_URI) {
        uri = process.env.DEV_DB_URI;
        const conn = await mongoose.connect(uri);
        console.log(
          `Development Database connected at ${conn.connection.host}:${conn.connection.port}`
        );
      }
    } else {
      throw new Error(
        "Node environment not recognised, please set node environment to either 'development' or 'production'"
      );
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
