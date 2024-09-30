const express = require('express');

const app = express();

const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

const bookRoutes = require('./routes/book.routes');

app.use(express.json());

// Next() es el tercer parámetro que se puede definir en las funciones de callback de los métodos . get, post, etc.
// voy a implementar manualmente un mini-morgan
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} Me acaban de hacer una petición a ${req.url}`);
    next();
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api', bookRoutes);

// Manejador de errores general de Express
app.use((req, res, next, err) => {
    console.error(err.message);
    return res.status(500).json({
        message: "Something went worng. Please try again later..."
    })
});

const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
    // Nos conectamos a la base de datos de MongoDB
    connectDB();
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})