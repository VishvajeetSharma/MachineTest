import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateTodo from "../middlewares/validateTodo.js";
import { createTodo, deleteTodo, getTodos, updateStatus, updateTodo } from "../controllers/todo.controller.js";
import validateStatus from "../middlewares/validateStatus.js";


const router = express.Router();

router.post(`/create-todo`, authMiddleware, validateTodo, createTodo);
router.get(`/get-todos`, authMiddleware, getTodos);
router.put(`/update-todo/:id`, authMiddleware, validateTodo, updateTodo);
router.delete(`/delete-todo/:id`, authMiddleware, deleteTodo);
router.patch(`/update-todo-status/:id`, authMiddleware, validateStatus, updateStatus);

export default router; 