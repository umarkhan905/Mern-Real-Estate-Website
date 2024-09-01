import { Listing } from "../models/listing.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const createListing = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      regularPrice,
      discountedPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
    } = req.body;

    if (imageUrls.length === 0) {
      return res
        .status(400)
        .json(new ApiError(400, "Please select at least one image", null));
    }

    const listing = await Listing.create({
      name,
      description,
      address,
      regularPrice,
      discountedPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      user: req.user._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Listing created successfully", listing));
  } catch (error) {
    console.log("Error in createListing", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.stack));
  }
};

export { createListing };
