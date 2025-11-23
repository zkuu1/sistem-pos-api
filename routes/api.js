const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth-middleware');
const userController = require('../controller/user-controller');
const absensiController = require('../controller/absensi-controller');

// Buat router terpisah
const userRouter = express.Router();
const absensiRouter = express.Router();

/**
 * @openapi
 * /api/users:
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
// HAPUS adminMiddleware karena endpoint ini untuk semua user yang login
userRouter.get('/api/users', userController.getAllUser);

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
absensiRouter.get('/api/absensi',absensiController.getAllAbsensi);

module.exports = {
    userRouter,
    absensiRouter
}