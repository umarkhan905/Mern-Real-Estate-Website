import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createListing } from "../controllers/listing.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createListing);

export default router;
