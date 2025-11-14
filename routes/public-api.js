const express = require('express');

// ===================== Import Controller ============================
const absensiController = require('../controller/absensi-controller');
const userController = require('../controller/user-controller');
const productController = require('../controller/product-controller');
const categoryController = require('../controller/category-controller')


// ===================== Public Absensi Router ============================
const publicAbsensiRouter = express.Router();
publicAbsensiRouter.post('/api/absensi', absensiController.absensi);
publicAbsensiRouter.patch('/api/absensi/:id', absensiController.updateAbsensi);
publicAbsensiRouter.delete('/api/absensi/:id', absensiController.deleteAbsensi);

// ===================== Public User Router ============================
const publicUserRouter = express.Router();
publicUserRouter.post('/api/users/register', userController.register);
publicUserRouter.post('/api/users/login', userController.login);

// ===================== Public Product Router ============================
const publicProductRouter = express.Router();
publicProductRouter.get('/api/products', productController.getAllProduct);
publicProductRouter.post('/api/products', productController.addProduct)
publicProductRouter.patch('/api/products/:id', productController.updateProduct)
publicProductRouter.delete('/api/products/:id', productController.deleteProduct)

// ===================== Public Category Router ============================
const publicCategoryRouter = express.Router();
publicCategoryRouter.get('/api/categories', categoryController.getAllCategory)
publicCategoryRouter.post('/api/categories', categoryController.addCategory);
publicCategoryRouter.patch('api/categories/:id', categoryController.updateCategory);
publicCategoryRouter.delete('/api/categories/:id', categoryController.deleteCategory);

module.exports = {
    publicAbsensiRouter,
    publicUserRouter,
    publicProductRouter,
    publicCategoryRouter
}