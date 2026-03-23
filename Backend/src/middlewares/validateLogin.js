import { sendResponse } from "../utils/response.js";
import { isEmail } from "../utils/validators.js";

const validateLogin = (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, false, 400, "Email and password are required", [], true);
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return sendResponse(res, false, 400, "Invalid input type", [], true);
  }

  email = email.trim().toLowerCase();
  password = password.trim();

  if (!isEmail(email)) {
    return sendResponse(res, false, 400, "Invalid email format", [], true);
  }

  req.body = { email, password };

  next();
};

export default validateLogin;