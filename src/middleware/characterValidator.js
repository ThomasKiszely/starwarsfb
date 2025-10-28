function validateCharacter(req, res, next) {
    const { name, role } = req.body;
    const errors = [];

    if (typeof name !== 'string' || name.trim().length < 3) {
        errors.push('Name should be at least 3 characters long.');
    }
    const allowedRoles = ['Jedi', 'Sith', 'Rebel', 'Smuggler'];
    if (typeof role !== 'string' || !allowedRoles.includes(role)) {
        errors.push('Role must be one of: Jedi, Sith, Rebel or Smuggler.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
}

module.exports = { validateCharacter };