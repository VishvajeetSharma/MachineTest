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
    <div className="row align-items-center bg-white">
      <div className="col-sm-10 mx-auto">
        <div className="row">
          {/* Left side image */}
          <div className="col-lg-6 text-center mt-5 p-3 mt-lg-0">
            <img
              src="img/pic4.jpeg"
              alt="illustration"
              className="img-fluid access-img rounded rounded-4"
            />
          </div>

          {/* Right side form*/}
          <div className="col-lg-6 col-10 mx-auto p-5 m-5 bg-white text-dark">
            <h1 className="access-title mb-4 fw-bold">
              <span className="text-purple">Register</span> <span className="text-orange">Here!</span>
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="text"
                  {...register("name")}
                  className="form-control custom-input"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  {...register("email")}
                  className="form-control custom-input"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  {...register("password")}
                  className="form-control custom-input"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <button className="btn bg-purple w-100 py-2 mt-4 fw-bold">
                Register
              </button>
              
              <div className="mt-3 text-start">
                <small className="text-muted fw-bold">
                  Already have an account? <a href="/" className="text-orange text-decoration-none">Login Here</a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
