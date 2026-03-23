import express from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";
import validateUser from "../middlewares/validateUser.js";
import validateLogin from "../middlewares/validateLogin.js";

const router = express.Router();

router.post(`/create-user`, validateUser, createUser);
router.post(`/login-user`, validateLogin, loginUser);

export default router; 