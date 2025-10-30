const mongoose = require('mongoose');
require('dotenv').config();

function connectToDatabase() {
    mongoose.connect(process.env.DB_URL);
    const db = mongoose.connection;
    db.on('error', () => {
        console.error('MongoDB connection error');
    });
    db.once('open', () => {
        console.log('MongoDB connected');
    });
    process.on('SIGINT', async () => {
        try {
            await mongoose.connection.close();
            console.log('MongoDB shut down');
            process.exit(0);
        } catch (error) {
            console.error('Fejl ved lukning af MongoDB:', error.message);
            process.exit(1);
        }
    });

}

module.exports = { connectToDatabase };