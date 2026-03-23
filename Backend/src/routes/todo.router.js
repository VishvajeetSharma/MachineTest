import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateTodo from "../middlewares/validateTodo.js";
import { createTodo } from "../controllers/todo.controller.js";


const router = express.Router();

router.post(`/create-todo`, authMiddleware, validateTodo, createTodo);

export default router; 