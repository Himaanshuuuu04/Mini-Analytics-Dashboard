import "dotenv/config";
import express from "express";
import cors from "cors";
import winston from "winston";
import { calculateMetrics } from "./utils/calculate.js";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "server.log" }),
  ],
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/analytics", async (req, res) => {
  logger.info("Analytics request received");
  try {
    const analytics = await calculateMetrics();
    logger.info("Analytics computed successfully", {
      totalTrades: analytics.totalTrades,
    });
    res.json(analytics);
  } catch (error) {
    logger.error("Analytics error", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
