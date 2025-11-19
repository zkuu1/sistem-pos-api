const ResponseError = require('../error/response-error');

const errorMiddleware = async(err, req, res, next) => {
    if(!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.statusCode).json({
            errors: err.message
        });    
    }else {
       res.end();
   
    }
}

module.exports = {
    errorMiddleware
}