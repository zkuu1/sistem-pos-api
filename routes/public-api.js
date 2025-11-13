const express = require('express');
const absensiController = require('../controller/absensi-controller');
const userController = require('../controller/user-controller');

const publicAbsensiRouter = express.Router();
publicAbsensiRouter.post('/api/absensi', absensiController.absensi);

const publicUserRouter = express.Router();
publicUserRouter.post('/api/users/register', userController.register);
publicUserRouter.post('/api/users/login', userController.login);

module.exports = {
    publicAbsensiRouter,
    publicUserRouter
}