const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/characterRoutes');
const { log, notFound, errorHandler } = require('./middleware/middlewares');
const { connectToDatabase } = require('./services/db');
connectToDatabase();


app.use(express.json());
app.use(log);
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use('/api/', router);


app.use(notFound);
app.use(errorHandler);

module.exports = app;