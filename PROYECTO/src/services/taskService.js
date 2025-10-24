let tasks = []; // Simulación de datos en memoria

export const getAllTasks = () => {
  return tasks;
};

export const createTask = (taskData) => {
  const newTask = {
    id: String(tasks.length + 1), // ID simple
    ...taskData,
  };
  tasks.push(newTask);
  return newTask;
};