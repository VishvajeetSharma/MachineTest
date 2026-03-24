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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const filter = { userId };
    if (req.query.status && req.query.status !== "all") {
      filter.status = req.query.status;
    }

    const totalItems = await TodoModel.countDocuments(filter);

    const todos = await TodoModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const pagination = {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      pageSize: limit
    };

    if (!todos || todos.length === 0) {
      return sendResponse(res, true, 200, "No todos found", { todos: [], pagination }, false);
    }
    
    return sendResponse(res, true, 200, "Todos fetched successfully", { todos, pagination }, false);
  } catch (error) {
    return sendResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    const userId = req.user.userId;

    if (!id) {
      return sendResponse(res, false, 400, "Todo ID is required", [], true);
    }

    const newTodo = {
      title,
      description,
      dueDate,
    };

    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: id, userId },
      newTodo,
      { new: true }
    );
    if (!updatedTodo) {
      return sendResponse(res, false, 404, "Todo not found", [], true);
    }
    return sendResponse(res, true, 200, "Todo updated successfully", updatedTodo, false);
  }
  catch (error) {
    return sendResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!id) {
      return sendResponse(res, false, 400, "Todo ID is required", [], true);
    }

    const deletedTodo = await TodoModel.findOneAndDelete({ _id: id, userId });
    if (!deletedTodo) {
      return sendResponse(res, false, 404, "Todo not found", [], true);
    }
    return sendResponse(res, true, 200, "Todo deleted successfully", deletedTodo, false);
  } catch (error) {
    return sendResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}


export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    if (!id) {
      return sendResponse(res, false, 400, "Todo ID is required", [], true);
    }

    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: { status } },
      { new: true }
    );

    if (!updatedTodo) {
      return sendResponse(res, false, 404, "Todo not found", [], true);
    }

    return sendResponse(res, true, 200, "Todo status updated successfully", updatedTodo, false);
  } catch (error) {
    return sendResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

