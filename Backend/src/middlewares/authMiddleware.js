import "dotenv/config";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.js";

const authMiddleware = (req, res, next) => {

  const SECRET_KEY = process.env.SECRET_KEY || "my_secret_key";

  try {
    const authHeader = req.headers.authorization;    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(res, false, 401, "No token provided", [], true);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY);

    const { userId, email } = decoded;

    req.user = {
      userId,
      email
    };

    next();

  } catch (error) {
    return sendResponse(res, false, 401, "Invalid or expired token", [], true);
  }
};

export default authMiddleware;