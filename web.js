const express = require('express');
const {errorMiddleware} = require('./middleware/error-middleware');
const Logging = require('./logging');
const dotenv = require('dotenv');

// import router 
const userRoutes = require('./routes/api');
const absensiRoutes = require('./routes/absensi')
const logRequest = require('./middleware/logs');

dotenv.config();

const web = express()
web.use(express.json())
web.use(userRoutes.userRouter)
web.use(absensiRoutes.absensiRouter)



web.listen(3000, () => {
  Logging.info('localhost:3000');
});
