// server\src\common\middleware\error.middleware.js
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.status ? err.message : "Internal Server Error";

    res.status(status).json({
        success: false,
        message,
    });
};

export default errorHandler;
