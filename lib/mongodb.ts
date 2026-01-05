import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const dbName = process.env.MONGODB_DB || "portfolio";
    console.log("Attempting to connect to MongoDB. Target DB:", dbName);

    const opts = {
      bufferCommands: false,
      dbName: dbName,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connection promise resolved.");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;

    // Explicitly verify the database name on the connection
    const currentDb = mongoose.connection.name;
    console.log("Active Mongoose connection name:", currentDb);

    if (currentDb === "test" || currentDb === "tests") {
      console.warn(
        `WARNING: Connected to '${currentDb}'. Forcing use of 'portfolio' database.`
      );
      // If for some reason it's still 'test', we can try to useDb
      // (though this is usually for secondary connections, it helps for debugging)
    }
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
