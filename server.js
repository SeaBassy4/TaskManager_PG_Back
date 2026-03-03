const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Permite que el navegador no bloquee las peticiones
app.use(express.json()); // Permite que la API entienda datos en formato JSON

// Nuestra "Base de datos" temporal en memoria
let tasks = [{ id: 1, title: "Estudiar Web APIs", completed: false }];

// GET /tasks - Obtener todas las tareas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks - Crear una tarea
app.post("/tasks", (req, res) => {
  const newTask = {
    id: Date.now(), // Usamos la fecha actual como ID único
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE /tasks/:id - Eliminar una tarea por ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}/tasks`);
});
