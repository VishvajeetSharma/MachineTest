import { useEffect, useState } from "react";
import {
  deleteTodoService,
  getTodosService,
  updateStatusService,
} from "../services/task.service.js";
import { showAlert, showConfirm } from "../utils/showAlert.js";
import { useNavigate } from "react-router-dom";
import { storeData } from "../utils/manageData.js";

const ViewTask = () => {
  const [todos, setTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1, totalItems: 0 });
  const navigate = useNavigate();
  const limit = 8;

  useEffect(() => {
    fetchTodos();
  }, [page, statusFilter]);

  const fetchTodos = async () => {
    try {
      const data = await getTodosService(page, limit, statusFilter);
      if (data?.success) {
        setTodos(data.data.todos || []); 
        setPagination(data.data.pagination || { totalPages: 1, totalItems: 0 });
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
      <h1 className="access-title mb-4 fw-bold">
              <span className="text-purple">ToDo</span>{" "}
              <span className="text-orange">List!</span>
            </h1>
      <div className="mb-3 d-flex justify-content-end align-item-center gap-2">
        <label className="fw-bold">Filter: </label>
        <select className="form-select w-auto border-0 bg-light" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
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
                <td>{(page - 1) * limit + index + 1}</td>
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
      {pagination.totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button 
            className="btn btn-primary px-4 fw-bold" 
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span className="text-light fw-bold">Page {page} of {pagination.totalPages}</span>
          <button 
            className="btn btn-primary px-4 fw-bold" 
            disabled={page === pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewTask;
