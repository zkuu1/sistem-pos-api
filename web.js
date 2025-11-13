const express = require('express');
const {errorMiddleware} = require('./middleware/error-middleware');
const Logging = require('./logging');
const dotenv = require('dotenv');

// import router 
const apiRouter = require('./routes/api');
const publicApiRouter = require('./routes/public-api');
const logRequest = require('./middleware/logs');

dotenv.config();


const web = express()
// web.listen(process.env.PORT, () => {
//     Logging.info(`Server is running on port ${process.env.PORT}`);
// });
web.use(logRequest);
web.use(express.json())
// export api router
web.use(apiRouter.userRouter)
web.use(apiRouter.absensiRouter)
web.use(publicApiRouter.publicUserRouter)
web.use(publicApiRouter.publicAbsensiRouter)

web.use(errorMiddleware);

module.exports = {
    web
}