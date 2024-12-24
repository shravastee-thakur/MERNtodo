import express from "express";
import Auth from "../Middleware/Auth.js";
const router = express.Router();
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../Controllers/todoController.js";

router.post("/", Auth, createTodo);
router.get("/", Auth, getTodos);
router.put("/:id", Auth, updateTodo);
router.delete("/:id", Auth, deleteTodo);

export default router;
