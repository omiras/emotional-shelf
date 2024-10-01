const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 30,
    },
    isbn: {
        type: String,
        required: true,
        match: /^[0-9]{13}$/,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 4000 // Amazon Kindle Direct Publishing
    },
    emotions: {
        type: [String],
        required: true,
        // Iteración 4: Seria interesante que al crear un libro tan solo se puedieran isnertar en la base de datos libros que contengan la emoción Sadness, Happiness, etc...

    }

});

const Book = model('book', bookSchema);

module.exports = Book;