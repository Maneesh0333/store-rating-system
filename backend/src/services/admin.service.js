import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

export const getDashboardData = async () => {
  const totalUsers = await prisma.user.count();
  const totalStores = await prisma.store.count();
  const totalRatings = await prisma.rating.count();

  return {
    totalUsers,
    totalStores,
    totalRatings,
  };
};

export const createUser = async ({ name, email, password, address, role }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      address,
      role,
    },
  });
};

export const createStore = async ({ name, email, address, ownerId }) => {
  return prisma.store.create({
    data: {
      name,
      email,
      address,
      ownerId,
    },
  });
};

export const getUsers = async ({ search, role }) => {
  return prisma.user.findMany({
    where: {
      ...(search && {
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
      }),

      ...(role !== "All" && {
        role,
      }),
    },

    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      stores: {
        include: {
          ratings: true,
        },
      },
    },
  });
};

export const getStores = async ({ search }) => {
  const stores = await prisma.store.findMany({
    where: {
      ...(search && {
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
            owner: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      }),
    },

    include: {
      owner: {
        select: {
          id: true,
          name: true,
        },
      },

      ratings: {
        select: {
          rating: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return stores.map(({ ratings, ...store }) => ({
    ...store,
    averageRating:
      ratings.length > 0
        ? Number(
            (
              ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            ).toFixed(1),
          )
        : 0,
  }));
};

export const getStoreOwners = async () => {
  return prisma.user.findMany({
    where: {
      role: "STORE_OWNER",
    },

    select: {
      id: true,
      name: true,
    },

    orderBy: {
      name: "asc",
    },
  });
};
