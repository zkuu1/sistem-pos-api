// ========== IMPORT MAIN COMPONENT =============
const express = require('express');
const {errorMiddleware} = require('./middleware/error-middleware');
const Logging = require('./logging');
const dotenv = require('dotenv');

// ========== IMPORT ROUTE & CONFIG =============
const apiRouter = require('./routes/api');
const publicApiRouter = require('./routes/public-api');
const logRequest = require('./middleware/logs');
dotenv.config();

// // ========== SERVER =============
const web = express()
web.listen(process.env.PORT, () => {
    Logging.info(`Server is running on port ${process.env.PORT}`);
});
web.use(logRequest);
web.use(express.json())

// ========== EXPORT API TO SERVER =============
web.use(apiRouter.userRouter)
web.use(apiRouter.absensiRouter)
web.use(publicApiRouter.publicUserRouter)
web.use(publicApiRouter.publicAbsensiRouter)
web.use(publicApiRouter.publicProductRouter);
web.use(publicApiRouter.publicCategoryRouter);

// ========== MIDDLEWARE =============
web.use(errorMiddleware);

// ========== EXPORT =============
module.exports = {
    web
}