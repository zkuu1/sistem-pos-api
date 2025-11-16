const express = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const userController = require('../controller/user-controller');
const absensiController = require('../controller/absensi-controller');

const userRouter = express.Router();
const absensiRouter = express.Router();

/**
 * @openapi
 * /api/users/current:
 *   get:
 *     summary: Mendapatkan data user yang sedang login
 *     tags:
 *       - Private User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data user berhasil diambil.
 *       401:
 *         description: Token tidak valid atau tidak diberikan.
 */
userRouter.get('/api/users/current', authMiddleware, userController.get);

/**
 * @openapi
 * /api/absensi:
 *   get:
 *     summary: Mendapatkan data absensi (private)
 *     tags:
 *       - Private Absensi
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data absensi berhasil diambil.
 *       401:
 *         description: Unauthorized, token tidak valid.
 */
absensiRouter.get('/api/absensi', authMiddleware, absensiController.absensi);

module.exports = {
  userRouter,
  absensiRouter
};
