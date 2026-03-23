import { sendResponse } from "../utils/response.js";
import { TodoModel } from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.userId;

    const newTodo = {
      title,
      description,
      dueDate,
      userId
    };

    const savedTodo = await TodoModel.create(newTodo);
    if (savedTodo) {
      return sendResponse(res, true, 201, "Todo created successfully", savedTodo, false);
    }
  } catch (error) {
    return sendResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}

export const getTodos = async (req, res) => {
  try {
    const userId = req.user.userId;

    const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 });
    if (!todos || todos.length === 0) {
      return sendResponse(res, true, 200, "No todos found", [], false);
    }
    return sendResponse(res, true, 200, "Todos fetched successfully", todos, false);
  } catch (error) {
    return sendResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}