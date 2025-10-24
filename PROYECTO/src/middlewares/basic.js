export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export const notFound = (req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  // Si viene de Mongoose con validación, 400; si no, 500 genérico
  const isValidation = err?.name === "ValidationError" || err?.name === "CastError";
  const status = isValidation ? 400 : 500;
  res.status(status).json({ error: isValidation ? "Invalid data" : "Internal server error", details: err.message });
};