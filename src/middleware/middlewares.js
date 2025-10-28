const { validateCharacter } = require('../middleware/characterValidator');
const { sanitizeCharacter } = require('../middleware/characterSanitizer');
const { errorHandler } = require('../middleware/errorHandler');
const { notFound } = require('../middleware/notFound');
const { log } = require('../middleware/logger');


module.exports = {
    notFound,
    sanitizeCharacter,
    errorHandler,
    validateCharacter,
    log,
};