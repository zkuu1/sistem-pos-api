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

// Middleware
web.use(cors);
web.use(logRequest);
web.use(express.json());
web.use(express.urlencoded({ extended: true }));

// Swagger
web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Private routes
web.use('', apiRouter.userRouter);
web.use('', apiRouter.absensiRouter);

// Public routes
web.use('/', publicApiRouter.publicUserRouter);
web.use('', publicApiRouter.publicAbsensiRouter);
web.use('', publicApiRouter.publicProductRouter);
web.use('', publicApiRouter.publicCategoryRouter);

web.use(errorMiddleware);

module.exports = web;  
