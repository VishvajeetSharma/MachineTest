import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert } from "../utils/showAlert.js";
import { updateTodoService } from "../services/task.service.js";
import { getData, removeData } from "../utils/manageData.js";
import { useEffect } from "react";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description cannot exceed 500 characters"),

  dueDate: yup
    .date()
    .required("Due Date is required")
    .min(new Date(), "Due Date cannot be in the past"),
});

const UpdateTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { title, description, dueDate } = getData("editTodo") || {};

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (title) setValue("title", title);
    if (description) setValue("description", description);
    if (dueDate) setValue("dueDate", dueDate.split("T")[0]);
  });

  const onSubmit = async (data) => {
    try {
      const res = await updateTodoService(id, data);
      if (res.success) {
        showAlert("Task Updated", res?.message, "success");
        reset();
        navigate("/view-task");
        removeData("editTodo");
      } else {
        showAlert("Task Update", res?.message, "error");
      }
    } catch (error) {
      showAlert("Task Update", "Internal Server Error", "error");
    }
  };

  return (
    <div className="row align-items-center py-3">
      <div className="col-sm-10 mx-auto">
        <div className="row">
          {/* Left side form */}
          <div className="col-lg-6 col-10 mx-auto p-5 m-3 text-white my-second-bg rounded rounded-4">
            <h1 className="access-title">Update Task</h1>
            <p className="mt-3 access-subtext">
              Enter task details to update an existing task
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  {...register("title")}
                  className="form-control border-0"
                  placeholder="Enter task title"
                />
                {errors.title && (
                  <small className="text-danger">{errors.title.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Description *</label>
                <textarea
                  {...register("description")}
                  className="form-control border-0"
                  placeholder="Enter task description"
                  rows={4}
                />
                {errors.description && (
                  <small className="text-danger">
                    {errors.description.message}
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date *</label>
                <input
                  type="date"
                  {...register("dueDate")}
                  className="form-control border-0"
                />
                {errors.dueDate && (
                  <small className="text-danger">
                    {errors.dueDate.message}
                  </small>
                )}
              </div>

              <button className="btn btn-primary w-100 py-2 mt-4 fw-bold">
                Update Task
              </button>
            </form>
          </div>

          {/* Right side image */}
          <div className="col-lg-6 text-center mt-5 pt-5 mt-lg-0">
            <img
              src="https://themes.stackbros.in/eduport_ng/assets/images/element/16.svg"
              alt="illustration"
              className="img-fluid access-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
