import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import addressRoutes from "./routes/address.route";
import postRoutes from "./routes/post.route";
import db from "./database/knex"; // Knex instance

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", addressRoutes);
app.use("/api", postRoutes);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     
  const shutdown = async () => {
    console.log("\n🔄 Shutting down gracefully...");
    try {
      await db.destroy();
      console.log("Database connection closed");
  
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    } catch (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
  };
  
  // Handle termination signals
  process.on("SIGINT", shutdown);  // Ctrl+C 
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    shutdown();
  });
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Promise Rejection at:", promise, "reason:", reason);
    shutdown();
  });

 
export { app, server };