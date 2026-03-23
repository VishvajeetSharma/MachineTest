import { sendResponse } from "../utils/response.js";
import { isEmail, isStrongPassword } from "../utils/validators.js";

const validateLogin =(req, res, next)=>{
  const {email, password} = req.body;

  if(!email || !password){
    return sendResponse(res, false, 400, "All fields are required", [], true);
  }

  if(!isEmail(email)){
    return sendResponse(res, false, 400, "Invalid email", [], true);
  }

  if(!isStrongPassword(password)){
    return sendResponse(res, false, 400, "Invalid password", [], true);
  }

  next();
}

export default validateLogin;