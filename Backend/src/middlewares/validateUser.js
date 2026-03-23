import { sendResponse } from "../utils/response.js";
import { isEmail, isStrongPassword } from "../utils/validators.js";

const validateUser =(req, res, next)=>{
  const {name, email, password} = req.body;

  if(!name || !email, !password){
    return sendResponse(res, false, 400, "All fields are required", [], true);
  }

  if(name.length < 3){
    return sendResponse(res, false, 400, "Name must be at least 3 characters", [], true);
  }

  if(!isEmail(email)){
    return sendResponse(res, false, 400, "Invalid email", [], true);
  }

  if(!isStrongPassword(password)){
    return sendResponse(res, false, 400, "Invalid password", [], true);
  }

  next();
}

export default validateUser;