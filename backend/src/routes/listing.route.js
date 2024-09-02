import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createListing,
  getUserListings,
  deleteListing,
  editListing,
  getListingById,
  getSearchListings,
} from "../controllers/listing.controller.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, createListing)
  .get(verifyJWT, getUserListings);
router.route("/search").get(getSearchListings);

router
  .route("/:id")
  .delete(verifyJWT, deleteListing)
  .patch(verifyJWT, editListing)
  .get(verifyJWT, getListingById);

export default router;
