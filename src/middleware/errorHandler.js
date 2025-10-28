const path = require("path");

function errorHandler(error, req, res, next) {
    console.log(error);
    res.status(error.status || 500).sendFile(path.join(__dirname, '..', '..', 'public', 'errors', '500.html'));
}

module.exports = { errorHandler };