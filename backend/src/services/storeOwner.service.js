import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";

export const getOwnerDashboard = async (ownerId) => {
  const store = await prisma.store.findFirst({
    where: {
      ownerId,
    },
    include: {
      ratings: {
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!store) {
    throw new AppError(404, "Store not found");
  }

  const totalRatings = store.ratings.length;

  const averageRating =
    totalRatings > 0
      ? (
          store.ratings.reduce((sum, item) => sum + item.rating, 0) /
          totalRatings
        ).toFixed(1)
      : 0;

  return {
    storeId: store.id,
    storeName: store.name,
    averageRating,
    totalRatings,
  };
};

export const getStoreRating = async (userId) => {
  const stores = await prisma.store.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      ratings: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return stores.flatMap((store) =>
    store.ratings.map((rating) => ({
      id: rating.id,
      user: rating.user.name,
      email: rating.user.email,
      rating: rating.rating,
    })),
  );
};

export const getStoreProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
    },
  });

  return user;
};

export const updateStoreProfile = async (userId, data) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.name,
      address: data.address,
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
    },
  });

  return user;
};

export const changeStorePassword = async (userId, oldPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    throw new AppError(400, "Current password is incorrect");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return true;
};
