// src/app.js
import express from "express";
import { logger, notFound, errorHandler } from "./middlewares/basic.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json()); // Habilitar JSON

app.use(logger);

// __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al YAML (app.js está en src/, el YAML en openapi/)
const openapiPath = path.resolve(__dirname, "../../openapi/taskmanager.yaml");

// Cargar el documento OpenAPI
const openapiDocument = YAML.load(openapiPath);

// Montar Swagger UI en /explorer
app.use("/explorer", swaggerUi.serve, swaggerUi.setup(openapiDocument));

// Exponer también la especificación en JSON con nombre de la API
app.get("/taskmanager-api.json", (req, res) => {
  res.type("application/json").send(JSON.stringify(openapiDocument, null, 2));
});


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/welcome", (req, res) => {
  res.json({ "message": "Welcome to Task Manager API" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
