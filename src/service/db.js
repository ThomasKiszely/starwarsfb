const mongoose = require('mongoose');
require('dotenv').config();

function connectToDatabase() {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', () => {
        console.error('MongoDB connection error');
    });
    db.once('open', () => {
        console.log('MongoDB connected');
    });
}

module.exports = { connectToDatabase };