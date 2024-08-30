export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies["accessToken"];
    if (!token) {
      return res
        .status(400)
        .json(new ApiError(400, "Unauthorized: No token provided", null));
    }

    const decoded = await jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return res
        .status(400)
        .json(new ApiError(400, "Unauthorized: Invalid token", null));
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in verifyJWT", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.stack));
  }
};
