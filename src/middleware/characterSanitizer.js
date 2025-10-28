function sanitizeCharacter (req, res, next) {
    const character = req.body;
    req.body = {
        ...character,
        name: typeof character.name === 'string' ? character.name.trim() : character.name,
        role: typeof character.role === 'string' ? character.role.trim() : character.role,
    }
    next();
}

module.exports = { sanitizeCharacter };