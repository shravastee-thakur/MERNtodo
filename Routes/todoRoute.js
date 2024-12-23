import express from "express";
const router = express.Router();
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../Controllers/todoController.js";

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
