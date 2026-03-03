const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Base de datos temporal y manejo de ID
let tasks = [{ id: 1, title: "Estudiar Web APIs", completed: false }];
let currentId = 2;

// GET - Obtener todas las tareas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST - Crear nueva tarea
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;

  // Validación: No permitir tareas vacías
  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  const newTask = {
    id: currentId++, // Asigna el ID actual y luego le suma 1 para el siguiente
    title,
    completed: completed || false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE - Eliminar tarea
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = tasks.length;

  tasks = tasks.filter((task) => task.id !== id);

  // Validación: Si el arreglo mide lo mismo, el ID no existía
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}/tasks`);
});
