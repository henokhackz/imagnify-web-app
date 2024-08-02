import { metadata } from "./../../app/layout";
import mongoose, { Mongoose } from "mongoose";

// mongodb  connection type

interface MongooseConnectionType {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const MONGO_URL = process.env.MONGODB_URL;
// Connect to MongoDB
let cached: MongooseConnectionType = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGO_URL) {
    throw new Error("missing mongodb url ");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URL, {
      dbName: "imagnify",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
