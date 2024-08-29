import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

const cookieOptions = {
  httpOnly: true,
  secure: ENV_VARS.NODE_ENV === "production",
  maxAge: Date.now() + 3 * 24 * 60 * 60 * 1000,
  sameSite: "strict",
};
const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res
        .status(400)
        .json(new ApiError(400, "All inputs are required", null));
    }

    const isUsernameTaken = await User.findOne({ username });
    if (isUsernameTaken) {
      return res
        .status(400)
        .json(new ApiError(400, "Username is already taken", null));
    }

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res
        .status(409)
        .json(new ApiError(409, "User already exists with this email", null));
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Password must be at least 6 characters", null)
        );
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    return res
      .cookie("token", user.createJWT(), cookieOptions)
      .status(201)
      .json(
        new ApiResponse(201, "User signup successfully", {
          ...user._doc,
          password: undefined,
        })
      );
  } catch (error) {
    console.log("Error in signUpUser", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.stack));
  }
};

export { signUpUser };
