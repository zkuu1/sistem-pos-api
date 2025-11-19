const userModels = require('../models/users');
const userService = require('../services/user-service');


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

const get = async (req, res, next) => {
  try {
    // Ambil data user dari middleware auth
    const user = req.user;

    // Panggil service dengan nama user
    const result = await userService.getUser(user.name);

    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    const result = await userService.searchUser({ keyword: req.params.keyword });
    res.status(200).json({
      message: 'Successfully searched user',
      data: result
    });
  } catch (error) {
    next(error);
  }
};



//  Create new user
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



//  Update existing user
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await userService.updateUser(id, req.body);
    res.status(200).json({
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

//  Delete user
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
  get
};
