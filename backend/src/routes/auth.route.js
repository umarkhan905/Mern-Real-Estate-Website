import { Router } from "express";

import {
  signUpUser,
  signInUser,
  signInUserWithGoogle,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/google").post(signInUserWithGoogle);

export default router;
