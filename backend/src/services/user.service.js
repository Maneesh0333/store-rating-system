import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";

export const getStores = async (search = "", userId) => {
  const stores = await prisma.store.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },

    include: {
      ratings: true,

      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return stores.map((store) => {
    const userRating = store.ratings.find((r) => r.userId === userId);

    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,

      owner: store.owner,

      averageRating:
        store.ratings.length > 0
          ? Number(
              (
                store.ratings.reduce((sum, r) => sum + r.rating, 0) /
                store.ratings.length
              ).toFixed(1),
            )
          : 0,

      userRating: userRating ? userRating.rating : null,
    };
  });
};

export const submitRating = async ({ userId, storeId, rating }) => {
  const existingRating = await prisma.rating.findUnique({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
  });

  if (existingRating) {
    throw new Error("Rating already submitted");
  }

  return prisma.rating.create({
    data: {
      userId,
      storeId,
      rating,
    },
  });
};

export const updateRating = async ({ userId, storeId, rating }) => {
  return prisma.rating.update({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
    data: {
      rating,
    },
  });
};

export const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const updateProfile = async (userId, data) => {
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

export const changePassword = async (userId, oldPassword, newPassword) => {
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
