import express from "express";
import userRouter from "./routes/user.router.js"
import todoRouter from "./routes/todo.router.js";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

app.use(`/user`, userRouter);
app.use(`/todo`, todoRouter);

export default app;