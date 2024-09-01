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

const getUserListings = async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.user._id });
    if (!listings) {
      return res.status(404).json(new ApiError(404, "No listings found", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Listings fetched successfully", listings));
  } catch (error) {
    console.log("Error in getUserListings", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.stack));
  }
};

const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json(new ApiError(404, "No listing found", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Listing deleted successfully", null));
  } catch (error) {
    console.log("Error in deleteListing", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.stack));
  }
};

const editListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json(new ApiError(404, "No listing found", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Listing updated successfully", listing));
  } catch (error) {
    console.log("Error in editListing", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.stack));
  }
};

export { createListing, getUserListings, deleteListing, editListing };
