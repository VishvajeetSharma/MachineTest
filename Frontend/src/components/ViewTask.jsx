import { useEffect, useState } from "react";
import {
  deleteTodoService,
  getTodosService,
  updateStatusService,
} from "../services/task.service.js";
import { showAlert, showConfirm } from "../utils/showAlert.js";
import { useNavigate } from "react-router-dom";
import { storeData } from "../utils/manageData.js";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ViewTask = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

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

  const handleEdit = (todo) => {
    storeData("editTodo", todo);
    navigate(`/update-task/${todo._id}`);
  };

  const handleUpdateStatus = async (id) => {
    try {
      const confirm = await showConfirm();
      if (confirm) {
        const res = await updateStatusService(id);
        if (res?.success) {
          showAlert("Updated!", "Todo status has been updated.", "success");
          fetchTodos();
        } else {
          showAlert("Error!", "Failed to update todo status.", "error");
        }
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
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
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <tr key={todo._id}>
                <td>{index + 1}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <span
                    className={`badge p-2 ${
                      todo.status === "pending"
                        ? "bg-warning text-dark"
                        : todo.status === "completed"
                          ? "bg-success"
                          : "bg-secondary"
                    }`}
                  >
                    {todo.status}
                  </span>
                </td>
                <td>{todo.dueDate}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleUpdateStatus(todo._id)}
                  >
                    Update Status
                  </button>
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
