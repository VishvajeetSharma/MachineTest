import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../utils/showAlert.js";
import { userRegisterService } from "../services/user.service.js";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&), and be 6-15 characters long",
    ),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await userRegisterService(data);
      if (res.success) {
        showAlert("User Registration", res?.message, "success");
        reset();
        navigate("/");
      } else {
        showAlert("User Registration", res?.message, "error");
      }
    } catch (error) {
      showAlert("User Registration", "Internal Server Error", "error");
    }
  };

  return (
    <div className="row align-items-center py-5">
      <div className="col-sm-10 mx-auto">
        <div className="row">
          {/* Left side form*/}
          <div className="col-lg-6 col-10 mx-auto p-5 m-3 text-white my-second-bg rounded rounded-4">
            <h1 className="access-title">Register Here</h1>
            <p className="mt-3 access-subtext">
              Enter your name, email, and password to create an account
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  {...register("name")}
                  className="form-control border-0"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  {...register("email")}
                  className="form-control border-0"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  {...register("password")}
                  className="form-control border-0"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <button className="btn btn-primary w-100 py-2 mt-4 fw-bold">
                Register
              </button>
            </form>
          </div>

          {/* Right side image */}
          <div className="col-lg-6 text-center mt-5 mt-lg-0">
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

export default Register;
