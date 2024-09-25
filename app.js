const express = require('express');

const app = express();

const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

const bookRoutes = require('./routes/book.routes');

// Next() es el tercer parámetro que se puede definir en las funciones de callback de los métodos . get, post, etc.
// voy a implementar manualmente un mini-morgan
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} Me acaban de hacer una petición a ${req.url}`);
    next();
});

app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
    // Nos conectamos a la base de datos de MongoDB
    connectDB();
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})