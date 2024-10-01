const Book = require('../models/book.model');
const { validationResult } = require('express-validator');

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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: `Error when trying to find books with emotion ${emotion}`,
            errors: errors.array()
        })
    }


    // 2. Usar el :emotion para hacer una búsqueda en el modelo de los 20 primeros libros que incluyen la emoción ':emotion'
    const books = await Book.find({ emotions: { $in: [emotion] } }).limit(20);

    // 3. Responder al cliente con un JSON con una respuesta similar a la del controlador getBooks (en cuanto a estructura de la respuesta: un objeto con las propiedad 'message' y 'results')
    res.status(200).json({
        message: "Query executed successfully for emotion " + emotion,
        results: books
    })



}

exports.getRandomRecommendationByEmotion = async (req, res) => {
    // 1. Vamos a extraer la :Emotion de la parte dinámica de la ruta
    const { emotion } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: `Error when trying to find books with emotion ${emotion}`,
            errors: errors.array()
        })
    }



    // 2. Vamos a recuperar todos los libros que cumplan con :emotion
    const books = await Book.find({ emotions: { $in: emotion } });

    // 2.5. Calcular un elemento aleatório entre todos los libros que incluyen la emoción :emotion
    const randomBook = books[Math.floor(Math.random() * books.length)];

    // Iteración 5: Necesitamos hacer una petición a la API una vez 
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${randomBook.isbn}`);

    const googleBook = await response.json();


    const imageURL = googleBook.items[0].volumeInfo.imageLinks.thumbnail;


    // 3. DEvolver la respuesta que esta vez va a ser un único libro
    res.status(200).json({
        message: "Query executed successfully",
        results: [{
            ...randomBook.toObject(),
            imageURL
        }]
    })
}

exports.postBook = async (req, res) => {

    // Si ha fallado alguna validación de express-validator, no hacer nada contra la base de datos
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "ERROR: Fields contain some invalid data",
            errors: errors.array()
        })
    }


    const { title, isbn, price, description, emotions } = req.body;
    try {
        const insertedBook = await Book.create({
            title,
            isbn,
            price,
            description,
            emotions
        });

        res.status(201).json({
            message: "Book created successfully",
            bookId: insertedBook._id
        })
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}