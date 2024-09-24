// importar módulos de terceros
const express = require('express');

const app = express();

const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

const bookRoutes = require('./routes/book.routes');
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    connectDB();
    console.log("Servidor escuchando correctamente en el puerto " + PORT);
});







