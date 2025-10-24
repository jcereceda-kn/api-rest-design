import { getAllTasks, createTask } from "../services/taskService.js";

export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, page, limit, search, from, to } = req.query;
    const result = await getAllTasks({ status, priority, page, limit, search, from, to });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const addTask = async (req, res, next) => {
  try {
    const { title, status, priority, description, dueDate } = req.body;

    // Validación mínima a nivel controlador (lo fuerte lo hace Mongoose)
    if (!title || !status) {
      return res.status(400).json({ error: "title and status are required" });
    }

    const newTask = await createTask({ title, status, priority, description, dueDate });
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};