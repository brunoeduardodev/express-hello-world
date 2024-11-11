import express from "express";
import pino from "pino";
import stream from "stream";

const VERSION = 1;

const streams = [
  { level: "debug", stream: process.stdout },
  { level: "error", stream: process.stderr },
  { level: "fatal", stream: process.stderr },
];

const run = async () => {
  const logger = pino(
    {
      level: "debug",
    },
    pino.multistream(streams)
  );
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    logger.info({
      msg: "Root request received",
      version: VERSION,
    });

    const allEnvs = Object.entries(process.env).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );

    res.json({
      message: "Hello World!",
      env: process.env.EXAMPLE_ENV || "not set",
      allEnvs,
      version: 4,
    });
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
      if (Math.random() > 0.5) {
        logger.info({ msg: "cron running", iteration });
      } else {
        console.error("Cron failed");
        logger.error({ msg: "cron failed", iteration });
      }
      iteration++;
    }, 5000);
  });
};

run();
