import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const { MONGO_URI } = process.env;

    if (!MONGO_URI) throw new Error("mongo uri is required");
    const conn = await mongoose.connect(MONGO_URI, {});

    if (!conn)
      throw new Error(" error encountered while connecting to mongodb");
    console.log(`connected to database at ${conn.connection.host}`);
  } catch (err) {
    throw err;
  }
}
