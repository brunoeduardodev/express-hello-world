import express from "express";
import pino from "pino";

const run = async () => {
  const logger = pino();
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    logger.info("Root request received");
    res.json({ message: "Hello World!" });
  });

  app.get("/ping", (req, res) => {
    logger.info("GET request received");
    res.json({ message: "pong" });
  });

  app.post("/ping", (req, res) => {
    logger.info("POST request received");
    res.json({ message: "pong", body: req.body });
  });

  app.put("/ping", (req, res) => {
    logger.info("PUT request received");
    res.json({ message: "pong", body: req.body });
  });

  app.delete("/ping", (req, res) => {
    logger.info("DELETE request received");
    res.json({ message: "pong", method: "DELETE" });
  });

  app.listen(3000, () => {
    logger.info("Server started on port 3000");

    let iteration = 10;
    setInterval(() => {
      logger.info({ msg: "cron running", iteration });
      iteration++;
    }, 5000);
  });
};

run();
