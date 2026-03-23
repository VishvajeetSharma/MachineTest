import { sendResponse } from "../utils/response.js";
import {TodoModel} from "../models/todo.model.js";

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
    if(savedTodo){
      return sendResponse(res, true, 201, "Todo created successfully", savedTodo, false);
    }
  } catch (error) {
    return sendResponse(res, false, 500, error || "Internal Server Error", [], true);
  }
}