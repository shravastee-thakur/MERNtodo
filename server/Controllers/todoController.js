import { Todo } from "../Models/todoSchema.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const todo = await Todo.create({ title, description });
    return res.status(201).json({
      success: true,
      data: todo,
      message: "Todo created successfully",
    });
  } catch (error) {}
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      success: true,
      todos: todos,
      message: "Todos fetched successfully",
    });
  } catch (error) {}
};

export const updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todoId = req.params.id;
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title },
      {
        new: true,
      }
    );
    await todo.save();

    return res.status(200).json({
      success: true,
      data: todo,
      message: "Todo updated successfully",
    });
  } catch (error) {}
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      data: todo,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
