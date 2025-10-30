const path = require("path");

function errorHandler(error, req, res, next) {
    console.log(error);
    if (req.originalUrl.startsWith('/api')) {
        return res.status(error.status || 500).json({error: error.message || 'Server error'});
    }
    return res.status(error.status || 500).sendFile(path.join(__dirname, '..','..', 'public', 'errors', '500.html'));
}

module.exports = { errorHandler };