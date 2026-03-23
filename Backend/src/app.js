import express from "express";
import userRouter from "./routes/user.router.js"
import todoRouter from "./routes/todo.router.js";

const app = express();

app.use(express.json());

app.use(`/api/user`, userRouter);
app.use(`/api/todo`, todoRouter);

export default app;