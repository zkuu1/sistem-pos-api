const express = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const userController = require('../controller/user-controller');
const absensiController = require('../controller/absensi-controller');

const userRouter = express.Router();
const absensiRouter = express.Router();

// hanya route ini yang perlu login
userRouter.get('/api/users/current', authMiddleware, userController.get);


absensiRouter.get('/api/absensi', authMiddleware, absensiController.absensi);

module.exports = {
  userRouter,
  absensiRouter
};
