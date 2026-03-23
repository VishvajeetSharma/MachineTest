import { sendResponse } from "../utils/response.js";
import { UserModel } from "../models/user.model.js"
import bcrypt from "bcrypt"

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Chech existing user
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return sendResponse(res, false, 409, "User already exist", [], true);
    }

    // Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = {
      name,
      email,
      password: hashedPassword
    }

    // Save user in db
    const savedUser = await UserModel.create(newUser);

    // Remove password
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    if (savedUser) {
      return sendResponse(res, true, 201, "User registered successfully", userResponse, false);
    }

  } catch (error) {
    return sendResponse(res, false, 500, "Internal Server Error", [], true);
  }
} 