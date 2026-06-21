import {
  changeStorePassword,
  getOwnerDashboard,
  getStoreProfile,
  getStoreRating,
  updateStoreProfile,
} from "../services/storeOwner.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const data = await getOwnerDashboard(req.user.id);

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getStoreProfileController = async (req, res, next) => {
  try {
    const profile = await getStoreProfile(req.user.id);

    res.status(200).json({
      success: true,
      message: "Profile fetched",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStoreProfileController = async (req, res, next) => {
  try {
    const user = await updateStoreProfile(req.user.id, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    next(error);
  }
};

export const changeStorePasswordController = async (req, res, next) => {
  try {
    await changeStorePassword(
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

export const getStoreRatingController = async (req, res, next) => {
  try {
    const userRating = await getStoreRating(req.user.id);

    res.status(200).json({
      success: true,
      message: "Store rating fetched",
      data: userRating,
    });
  } catch (error) {
    next(error);
  }
};
