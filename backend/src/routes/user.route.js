import { Router } from "express";
import {
  updateUserProfile,
  deleteUserProfile,
  getUserById,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:id").patch(verifyJWT, updateUserProfile);
router
  .route("/:id")
  .delete(verifyJWT, deleteUserProfile)
  .get(verifyJWT, getUserById);

export default router;
