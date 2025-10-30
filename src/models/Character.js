const mongoose = require('mongoose');
const allowedTypes = require('../utils/constants');

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 3 },
    role: { type: String, required: true, enum: allowedTypes, trim: true }
});

module.exports = mongoose.model('Character', characterSchema);