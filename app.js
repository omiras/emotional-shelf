// importar módulos de terceros
const express = require('express');

const app = express();


app.listen(PORT, (req, res) => {
    console.log("Servidor escuchando correctamente en el puerto " + PORT);
});