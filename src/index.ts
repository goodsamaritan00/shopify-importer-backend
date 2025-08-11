import mongoose from "mongoose";
import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("Mongo URI error!");
}

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(mongoUri)
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`✅ Connected to MongoDB and running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
