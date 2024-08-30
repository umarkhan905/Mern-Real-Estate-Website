import { Router } from "express";
import { updateUserProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:id").patch(verifyJWT, updateUserProfile);

export default router;
