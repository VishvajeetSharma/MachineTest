import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: 3,
    maxlenght: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlenght: 500,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  dueDate: {
    type: String,
    required: [true, "Due date is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
},
  {
    timestamps: true
  }
)

export const TodoModel = mongoose.model("Todos", todoSchema);