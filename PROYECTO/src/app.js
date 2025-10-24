// src/app.js
import express from "express";
import { logger, notFound, errorHandler } from "./middlewares/basic.js";

const app = express();
app.use(express.json()); // Habilitar JSON

app.use(logger);


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/welcome", (req, res) => {
  res.json({ "message": "Welcome to Task Manager API" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
