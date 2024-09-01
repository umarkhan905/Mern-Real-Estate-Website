import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createListing,
  getUserListings,
  deleteListing,
  editListing,
} from "../controllers/listing.controller.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, createListing)
  .get(verifyJWT, getUserListings);

router
  .route("/:id")
  .delete(verifyJWT, deleteListing)
  .patch(verifyJWT, editListing);

export default router;
