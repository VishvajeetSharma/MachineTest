import React, { useEffect, useState } from "react";
import { deleteTodoService, getTodosService } from "../services/task.service.js";
import { showAlert, showConfirm } from "../utils/showAlert.js";

const ViewTask = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodosService();
      if (data?.success) {
        setTodos(data.data); // assuming API returns { success, data }
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleDelete = async (id) => {    
    const confirm = await showConfirm();
    if (confirm) {
      const res = await deleteTodoService(id);
      if (res?.success) {
        showAlert("Deleted!", "Todo has been deleted.", "success");
        fetchTodos();
      } else {
        showAlert("Error!", "Failed to delete todo.", "error");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-light text-center fw-bold fs-1">Todos List</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Sr</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <tr key={todo._id}>
                <td>{index + 1}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.status}</td>
                <td>{todo.dueDate}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger"  onClick={() => handleDelete(todo._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No todos found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTask;
