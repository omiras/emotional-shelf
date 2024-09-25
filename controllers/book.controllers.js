const Book = require('../models/book.model');

// otra forma de exportar varios recursos, ¿cuál os gusta más?
exports.getBooks = async (req, res) => {
    const books = await Book.find().limit(20);

    return res.status(200).json({
        message: "Query executed successfully",
        results: books
    })
}

exports.getRecommendationsByEmotion = async (req, res) => {
    // 1. Recuperar el valor de la ruta dinámica
    // ¿Cómo obtener el valor dinámico :emotion de /api/books/recommendations/:emotion`
    const { emotion } = req.params;

    // Cuando esto es funcione, implementad las validaciones que pide el ejercicio (:emotion sea un emoción válida de las que maneja la REST API)
    const allowedEmotions = ['Inspiration', 'Curiostity', 'Espacism', 'Nostalgia', 'Happiness', 'Sadness'];

    // Si esta emoción NO está en mi array de emociones permitidas-> error
    if (!allowedEmotions.includes(emotion)) {
        return res.stat(400).json({
            message: `The emotion ${emotion} is not a valid value`
        })
    }

    // Seria interesante capitalizar las palabras siempre por si el cliente nos envia una petición tipo /api/books/recommendations/sadness , con s en minúsuclas . Incluso sería mejor utilizar una expresión regular en $in para que no tenga en cuenta ni mayúsculas ni minúsculas

    // const capitalizedEmotion = emotion.charAt(0).toUpperCase() + emotion.slice(1);

    // 2. Usar el :emotion para hacer una búsqueda en el modelo de los 20 primeros libros que incluyen la emoción ':emotion'
    const books = await Book.find({ emotions: { $in: [emotion] } });

    // 3. Responder al cliente con un JSON con una respuesta similar a la del controlador getBooks (en cuanto a estructura de la respuesta: un objeto con las propiedad 'message' y 'results')
    res.status(200).json({
        message: "Query executed successfully for emotion " + emotion,
        results: books
    })



}
