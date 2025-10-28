const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: String,
    role: String,
});

module.exports = mongoose.model('Character', characterSchema);