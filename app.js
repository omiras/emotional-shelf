// importar módulos de terceros
const express = require('express');

const app = express();

// Next() es el tercer parámetro que se puede definir en las funciones de callback de los métodos . get, post, etc.
// voy a implementar manualmente un mini-morgan

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} Me acaban de hacer una petición a ${req.url}`);
    next();
});

// Permitir peticiones des de cualquier máquina que no sea la misma des de donde se levanta esta REST API
app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', 'http://http://127.0.0.1:5500/' )
    // Permite que las peticiones des de un script des de cualquier origen
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Add this to parse JSON bodies
app.use(express.json()); 

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







