import { sendResponse } from "../utils/response.js";

const validateTodo = (req, res, next) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return sendResponse(res, false, 400, "All fields are required", [], true);
  }

  if (typeof title !== "string" || title.trim().length < 3) {
    return sendResponse(res, false, 400, "Title must be at least 3 characters", [], true);
  }

  if (typeof description !== "string" || description.trim().length < 5) {
    return sendResponse(res, false, 400, "Description must be at least 5 characters", [], true);
  }

  const parsedDate = new Date(dueDate);

  if (isNaN(parsedDate.getTime())) {
    return sendResponse(res, false, 400, "Invalid due date format", [], true);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate < today) {
    return sendResponse(res, false, 400, "Due date cannot be in the past", [], true);
  }

  const normalizedDate = parsedDate.toISOString().split('T')[0];

  req.body = {
    title: title.trim(),
    description: description.trim(),
    dueDate: normalizedDate
  };

  next();
};

export default validateTodo;