const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const logger = new EventEmitter();

logger.on('log', (message) => {
    const timestamp = new Date().toLocaleString('da-DK');
    const logMessage = `${timestamp}: Anmodning: ${message}\n`;

    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    const date = new Date();
    const dateString = date.toISOString().split('T')[0]; // "2025-10-22"
    const logFile = path.join(logDir, `log_${dateString}.txt`);
    fs.appendFileSync(logFile, logMessage);
});

const log = (req, res, next) => {
    const body = req.body && Object.keys(req.body).length > 0
        ? JSON.stringify(req.body)
        : '-';

    logger.emit('log', `${req.method} ${req.url} ${body}`);
    next();
};


module.exports = { logger, log };