import {
  changePassword,
  getProfile,
  getStores,
  submitRating,
  updateProfile,
  updateRating,
} from "../services/user.service.js";

export const getStoresController = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const stores = await getStores(search, req.user.id);

    res.status(200).json({
      success: true,
      message: "Stores fetched",
      data: stores,
    });
  } catch (error) {
    next(error);
  }
};

export const submitRatingController = async (req, res, next) => {
  try {
    await submitRating({
      userId: req.user.id,
      storeId: req.body.storeId,
      rating: req.body.rating,
    });

    res.status(201).json({
      success: true,
      message: "Rating submitted",
    });
  } catch (error) {
    next(error);
  }
};

export const updateRatingController = async (req, res, next) => {
  try {
    await updateRating({
      userId: req.user.id,
      storeId: req.body.storeId,
      rating: req.body.rating,
    });

    res.status(200).json({
      success: true,
      message: "Rating updated",
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileController = async (req, res, next) => {
  try {
    const user = await getProfile(req.user.id);

    res.status(200).json({
      success: true,
      message: "Profile fetched",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    const user = await updateProfile(req.user.id, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    next(error);
  }
};

export const changePasswordController = async (req, res, next) => {
  try {
    await changePassword(
      req.user.id,
      req.body.oldPassword,
      req.body.newPassword,
    );

    res.json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    next(error);
  }
};
