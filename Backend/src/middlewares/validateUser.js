import { sendResponse } from "../utils/response.js";
import { isEmail, isStrongPassword } from "../utils/validators.js";

const validateUser = (req, res, next) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendResponse(res, false, 400, "All fields are required", [], true);
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return sendResponse(res, false, 400, "Invalid input type", [], true);
  }

  name = name.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

  if (name.length < 3) {
    return sendResponse(res, false, 400, "Name must be at least 3 characters", [], true);
  }

  if (!isEmail(email)) {
    return sendResponse(res, false, 400, "Invalid email format", [], true);
  }

  if (!isStrongPassword(password)) {
    return sendResponse(res, false, 400, "Password must be at least 6 characters (or strong as per rules)", [], true);
  }

  req.body = {
    name,
    email,
    password
  };

  next();
};

export default validateUser;