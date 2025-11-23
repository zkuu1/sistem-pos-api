const express = require('express');

// ===================== Import Cloudninary ============================
const upload = require('../middleware/upload-middleware');



// ===================== Import Controller ============================
const absensiController = require('../controller/absensi-controller');
const userController = require('../controller/user-controller');
const productController = require('../controller/product-controller');
const categoryController = require('../controller/category-controller');

// ===================== Public Absensi Router ============================
const publicAbsensiRouter = express.Router();

/**
 * @openapi
 * /api/absensi:
 *   post:
 *     summary: Membuat absensi baru
 *     tags:
 *       - Absensi
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Absensi berhasil dibuat.
 */
publicAbsensiRouter.get('/api/absensi/search/:keyword', absensiController.searchAbsensi);


/**
 * @openapi
 * /api/absensi:
 *   post:
 *     summary: Membuat absensi baru
 *     tags:
 *       - Absensi
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Absensi berhasil dibuat.
 */
publicAbsensiRouter.post('/api/absensi', absensiController.absensi);

/**
 * @openapi
 * /api/absensi/{id}:
 *   patch:
 *     summary: Update data absensi
 *     tags:
 *       - Absensi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Absensi berhasil diperbarui.
 */
publicAbsensiRouter.patch('/api/absensi/update/:id', absensiController.updateAbsensi);

/**
 * @openapi
 * /api/absensi/{id}:
 *   delete:
 *     summary: Hapus data absensi
 *     tags:
 *       - Absensi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Absensi berhasil dihapus.
 */
publicAbsensiRouter.delete('/api/absensi/:id', absensiController.deleteAbsensi);


// ===================== Public User Router ============================
const publicUserRouter = express.Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: User berhasil dibuat.
 */
publicUserRouter.post('/api/users/register', userController.register);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Login berhasil.
 */
publicUserRouter.post('/api/users/login', userController.login);

/**
 * @openapi
 * /api/users/update/:id:
 *   post:
 *     summary: update user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Update berhasil.
 */
publicUserRouter.patch('/api/users/update/:id', userController.updateUser);

/**
 * @openapi
 * /api/users/search/:id:
 *   post:
 *     summary: searh user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Search berhasil.
 */
publicUserRouter.get('/api/users/search/:keyword', userController.searchUser);


/**
 * @openapi
 * /api/users/update/:id:
 *   post:
 *     summary: update user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Update berhasil.
 */
publicUserRouter.delete('/api/users/delete/:id', userController.deleteUser);




// ===================== Public Product Router ============================
const publicProductRouter = express.Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Mendapatkan semua produk
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: OK.
 */
publicProductRouter.get('/api/products', productController.getAllProduct);

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Mendapatkan produk dicari
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: OK.
 */
publicProductRouter.get('/api/products/search/:keyword', productController.searchProduct);

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Menambah produk
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Produk berhasil ditambahkan.
 */
publicProductRouter.post(
  '/api/products',
  (req, res, next) => {
    console.log("➡️  Route /api/products dipanggil");
    next();
  },
  upload.single("image"),   
  (req, res, next) => {
    console.log("📌 Setelah Multer, req.file =", req.file);
    next();
  },
  productController.addProduct
);



/**
 * @openapi
 * /api/products/{id}:
 *   patch:
 *     summary: Update produk
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Produk berhasil diperbarui.
 */
publicProductRouter.patch('/api/products/update/:id', upload.single("image"), productController.updateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Hapus produk
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus.
 */
publicProductRouter.delete('/api/products/:id', productController.deleteProduct);


// ===================== Public Category Router ============================
const publicCategoryRouter = express.Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Mendapatkan semua kategori
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: OK.
 */
publicCategoryRouter.get('/api/categories', categoryController.getAllCategory);

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Mendapatkan semua kategori
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: OK.
 */
publicCategoryRouter.get('/api/categories/search/:keyword', categoryController.searchCategory);

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Menambah kategori
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Kategori berhasil ditambahkan.
 */
publicCategoryRouter.post('/api/categories', categoryController.addCategory);

/**
 * @openapi
 * /api/categories/{id}:
 *   patch:
 *     summary: Update kategori
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Kategori berhasil diperbarui.
 */
publicCategoryRouter.patch('/api/categories/update/:id', categoryController.updateCategory);

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Hapus kategori
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus.
 */
publicCategoryRouter.delete('/api/categories/:id', categoryController.deleteCategory);


module.exports = {
    publicAbsensiRouter,
    publicUserRouter,
    publicProductRouter,
    publicCategoryRouter
};
