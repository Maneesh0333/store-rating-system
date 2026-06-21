import {
  getDashboardData,
  createUser,
  createStore,
  getUsers,
  getUserById,
  getStores,
  getStoreOwners,
} from "../services/admin.service.js";

export const dashboardController = async (req, res, next) => {
  try {
    const data = await getDashboardData();

    res.status(200).json({
      success: true,
      message: "Fecthed Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserController = async (req, res, next) => {
  try {
    await createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created",
    });
  } catch (error) {
    next(error);
  }
};

export const createStoreController = async (req, res, next) => {
  try {
    const store = await createStore(req.body);

    res.status(201).json({
      success: true,
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersController = async (req, res, next) => {
  try {
    const { search, role } = req.query;

    const users = await getUsers({
      search,
      role,
    });

    res.status(200).json({
      success: true,
      message: "Users fetched",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getStoresController = async (req, res, next) => {
  try {
    const { search } = req.query;

    const stores = await getStores({ search });

    res.status(200).json({
      success: true,
      message: "Stores fetched",
      data: stores,
    });
  } catch (error) {
    next(error);
  }
};

export const getStoreOwnersController = async (req, res, next) => {
  try {
    const owners = await getStoreOwners();

    res.status(200).json({
      success: true,
      message: "Store owners fetched",
      data: owners,
    });
  } catch (error) {
    next(error);
  }
};
