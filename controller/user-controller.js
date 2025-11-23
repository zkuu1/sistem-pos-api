const userModels = require('../models/users');
const userService = require('../services/user-service');


// =====================  REGISTER =====================
const register = async (req, res, next) => {
    try {
      const result = await userService.registerUser(req.body);
      res.status(200).json({
        message: 'Successfully created user',
        data: result
      });
    } catch (error) {
      next(error);
    }
}

// ===================== LOGIN =====================
const login = async (req, res, next) => {
   try {
    const result = await userService.loginUser(req.body);
    res.status(200).json({
        message: 'Successfully logged in',
        data: result
    });
   } catch (error) {
    next(error);
   }
}

// ===================== GET ALL USERS =====================
const getAllUser = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers()
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// ===================== GET USER BY ID =====================
const getUserById = async (req, res, next) => {
  try {
    const result = await userService.getUserById(req.params.id);

    res.status(200).json({
      message: 'Successfully retrieved user',
      data: result
    });

  } catch (error) {
    console.error("GetUserById Error:", error);

    if (error instanceof ResponseError) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};



// ===================== SEARCH USERS =====================
const searchUser = async (req, res, next) => {
  try {
    const result = await userService.searchUser({ keyword: req.params.keyword });
    res.status(200).json({
      message: 'Successfully searched user',
      data: result
    });
  } catch (error) {
    console.error("SearchUser Error:", error);

    // Kalau instance ResponseError, pakai statusnya
    if (error instanceof ResponseError) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error'
      });
    }

    // Default
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


// ===================== CREATE USER BY ADMIN =====================
const createUser = async (req, res) => {
  try {
    const newUser = await userService.createNewUser(req.body);
    res.status(201).json({
      message: 'Successfully created user',
      data: newUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Server error while creating user',
      error: error.message
    });
  }
};

// ===================== UPDATE USER BY ADMIN =====================
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await userService.updateUser(id, req.body);
    res.status(200).json({
      status: true,
      message: 'Successfully updated user',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      message: 'Server error while updating user',
      error: error.message
    });
  }
};

// ===================== DELETE USER BY ADMIN =====================
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.status(200).json({
      message: `Successfully deleted user with id ${id}`
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      message: 'Server error while deleting user',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  getAllUser,
  getUserById,

};
