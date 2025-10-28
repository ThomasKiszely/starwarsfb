require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
    console.log(`Server started on port http://${host}:${port}`);
})

