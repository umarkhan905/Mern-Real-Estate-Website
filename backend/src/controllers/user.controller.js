import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { cookieOptions } from "./auth.controller.js";

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id !== id) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Unauthorized: You are not authorized to update this profile",
            null
          )
        );
    }

    const { username, email, password, avatar } = req.body;
    if (!(username || email || password || avatar)) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Please provide at least one field to update", null)
        );
    }
    if (password && password.length < 6) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Password must be at least 6 characters", null)
        );
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { username, email, password, avatar },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found", null));
    }

    return res.status(200).json(
      new ApiResponse(200, "User updated successfully", {
        ...user._doc,
        password: undefined,
      })
    );
  } catch (error) {
    console.log("Error in updateUserProfile", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.stack));
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user._id !== id) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Unauthorized: You are not authorized to delete this profile",
            null
          )
        );
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "User deleted successfully", null));
  } catch (error) {
    console.log("Error in deleteUserProfile", error);
    return res
      .clearCookie("accessToken", cookieOptions)
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.stack));
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found", null));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, "User fetched successfully", {
          ...user._doc,
          password: undefined,
        })
      );
  } catch (error) {
    console.log("Error in getUserById", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.stack));
  }
};

export { updateUserProfile, deleteUserProfile, getUserById };
