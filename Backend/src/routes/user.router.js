import express from "express";
import { createUser } from "../controllers/user.controller.js";
import validateUser from "../middlewares/validateUser.js";

const router = express.Router();

router.post(`/create-user`, validateUser, createUser)

export default router; 