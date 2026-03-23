import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateTodo from "../middlewares/validateTodo.js";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";


const router = express.Router();

router.post(`/create-todo`, authMiddleware, validateTodo, createTodo);
router.get(`/get-todos`, authMiddleware, getTodos);
router.put(`/update-todo/:id`, authMiddleware, validateTodo, updateTodo);
router.delete(`/delete-todo/:id`, authMiddleware, deleteTodo);

export default router; 