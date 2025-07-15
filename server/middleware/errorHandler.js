const errorHandler = (err, req, res, next) => {
    console.err(err.stack);
    res.status(err.statuscode || 500).json({
        success: false,
        message: err.message || 'Server Error'
    });
};

module.exports = errorHandler;