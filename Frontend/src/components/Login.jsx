import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { userLoginService } from "../services/user.service.js";
import { showAlert } from "../utils/showAlert.js";
import { storeData } from "../utils/manageData.js";

const schema = yup.object().shape({
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

const Login = () => {
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
      const res = await userLoginService(data);
      if (res.success) {
        showAlert("User Login", res?.message, "success");
        storeData("token", res?.data?.token);
        reset();
        navigate("/view-task");
      } else {
        showAlert("User Login", res?.message, "error");
      }
    } catch (err) {
      showAlert("User Login", "Internal Server Error", "error");
    }
  };
  return (
    <>
      <div className="row align-items-center py-5 my-3 my-bg-dark">
        <div className="col-sm-10 mx-auto">
          <div className="row">
            {/* Left side image */}
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <img
                src="https://themes.stackbros.in/eduport_ng/assets/images/element/16.svg"
                alt="illustration"
                className="img-fluid access-img"
              />
            </div>

            {/* Right side input  */}
            <div className="col-lg-6 col-10 mx-auto m-3 p-5 text-white  my-second-bg rounded rounded-4">
              <h1 className="access-title">Login Here</h1>

              <p className="mt-3 access-subtext">
                Enter your email address and password to get access
              </p>

              {/* INPUT */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="form-control border-0"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
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
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
