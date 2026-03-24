import { sendResponse } from "../utils/response.js";

const allowedStatuses = ["pending", "completed"];

const validateStatus = (req, res, next) => {
  const { status } = req.body;
  const statusValue = status.trim().toLowerCase();

  if (!statusValue) {
    return sendResponse(res, false, 400, "Status is required", [], true);
  }

  if (!allowedStatuses.includes(statusValue)) {
    return sendResponse(res, false, 400, `Invalid status. Allowed values are: ${allowedStatuses.join(", ")}`, [], true);
  }

  req.body = { status: statusValue };
  next(); 
};

export default validateStatus;