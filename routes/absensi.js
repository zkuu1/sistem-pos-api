const express = require('express');
const absensiController = require('../controller/absensi-controller')


const absensiRouter = express.Router();

// Get Absensi
absensiRouter.get('/api/absensi', absensiController.getAllAbsensi)

// Post Absensi
absensiRouter.post('/', absensiController.absensi);


module.exports = absensiRouter;
