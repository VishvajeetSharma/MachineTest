import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert } from "../utils/showAlert.js";
import { updateTodoService } from "../services/task.service.js";
import { getData, removeData } from "../utils/manageData.js";
import { useEffect } from "react";

const today = new Date();
today.setHours(0, 0, 0, 0);

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
    .min(today, "Due Date cannot be in the past"),
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
    <div className="row align-items-center py-3 bg-white">
      <div className="col-sm-10 mx-auto">
        <div className="row">
          {/* Left side image */}
          <div className="col-lg-6 p-3">
            <img
              src="/img/pic2.jpeg"
              alt="illustration"
              className="img-fluid"
            />
          </div>

          {/* Right side form */}
          <div className="col-lg-6 col-10 mx-auto p-5 m-5 bg-white text-dark">
            <h1 className="access-title mb-4 fw-bold">
              <span className="text-purple">Update</span>{" "}
              <span className="text-orange">ToDo!</span>
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="text"
                  {...register("title")}
                  className="form-control custom-input"
                  placeholder="Enter your task name"
                />
                {errors.title && (
                  <small className="text-danger">{errors.title.message}</small>
                )}
              </div>

              <div className="mb-4">
                <textarea
                  {...register("description")}
                  className="form-control custom-input"
                  placeholder="Enter task description"
                  rows={2}
                />
                {errors.description && (
                  <small className="text-danger">
                    {errors.description.message}
                  </small>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="date"
                  {...register("dueDate")}
                  className="form-control custom-input text-muted"
                />
                {errors.dueDate && (
                  <small className="text-danger">
                    {errors.dueDate.message}
                  </small>
                )}
              </div>

              <button className="btn bg-purple w-100 py-2 mt-4 fw-bold">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
