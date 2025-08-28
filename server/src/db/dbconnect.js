import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MongoDB_URL;

if (!MONGODB_URL) {
  throw new Error("MongodbUrl missing in .env");
}
let isConnected = false;
export const dbConnect = async (req, res) => {
  if (isConnected) {
    console.log("Database is already connected");
  }

  try {
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected Successfully");
    });

    connection.on("error", (error) => {
      console.error(
        "MongoDb connection error please make sure your mongodb is running",
        error
      );
      process.exit(1);
    });

    process.on("SIGINT", async () => {
      await connection.close();
      console.log("Mongodb connection is close due to app termination");
      process.exit(0);
    });

    const connectionOptions = {
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 50, // Maintain up to 50 socket connections
      wtimeoutMS: 2500, // Timeout for write operations
      retryWrites: true, // Retry write operations on network errors
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    };

    await mongoose.connect(MONGODB_URL, connectionOptions);
    isConnected = true;

    return connection;
  } catch (error) {
    console.error(error);
  }
};
