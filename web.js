// ========== IMPORT MAIN COMPONENT =============
const express = require('express');
const { errorMiddleware } = require('./middleware/error-middleware');
const Logging = require('./logging');
const dotenv = require('dotenv');
const cors = require('./utils/cors');

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./utils/swaggerOption");
const swaggerSpec = swaggerJsdoc(swaggerOptions);

const apiRouter = require('./routes/api');
const publicApiRouter = require('./routes/public-api');
const logRequest = require('./middleware/logs');

dotenv.config();

// ========== SERVER =============
const web = express();

// Middleware HARUS sebelum listen!!!
web.use(cors);
web.use(logRequest);
web.use(express.json());
web.use(express.urlencoded({ extended: true }));

// Swagger
web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ========== PERBAIKAN ROUTES =============
// Gunakan prefix yang jelas untuk membedakan public vs private routes
web.use('/api', apiRouter.userRouter);        // Private user routes
web.use('/api', apiRouter.absensiRouter);     // Private absensi routes

// Public routes - biasanya tanpa auth
web.use('/api/public', publicApiRouter.publicUserRouter);
web.use('/api/public', publicApiRouter.publicAbsensiRouter);
web.use('/api/public', publicApiRouter.publicProductRouter);
web.use('/api/public', publicApiRouter.publicCategoryRouter);

web.use(errorMiddleware);

// ========== LISTEN HARUS TERAKHIR =============
web.listen(process.env.PORT, () => {
    Logging.info(`Server is running on port ${process.env.PORT}`);
});

module.exports = { web };